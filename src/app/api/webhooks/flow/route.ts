import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getPaymentStatus } from '@/lib/flow'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy')

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const token = formData.get('token') as string

    if (!token) {
      console.error('Webhook sin token de Flow')
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // 1. Obtener status real desde la API de Flow
    const flowStatus = await getPaymentStatus(token)

    // Flow API devuelve status 2 cuando está pagado
    if (flowStatus.status === 2) {
      const orderId = flowStatus.commerceOrder
      
      // 2. Obtener la Orden
      const order = await payload.findByID({
        collection: 'orders',
        id: orderId,
      })

      // Si ya está pagada, no generamos tickets de nuevo
      if (order.payment_status === 'paid') {
        return NextResponse.json({ success: true, message: 'Already processed' }, { status: 200 })
      }

      const raffleId = typeof order.raffle_id === 'object' ? order.raffle_id?.id : order.raffle_id
      const ticketQuantity = order.ticket_quantity || 1

      if (!raffleId) {
        throw new Error('Orden no tiene rifa asociada')
      }

      // === BLOQUE CRÍTICO: GENERACIÓN DE TICKETS ===
      // Para efectos de atomicidad simple, actualizamos la Rifa y usamos su estado previo
      const raffle = await payload.findByID({
        collection: 'raffles',
        id: raffleId as string,
      })

      const lastTicket = raffle.last_ticket_issued || 0
      const startTicketNumber = lastTicket + 1
      const endTicketNumber = lastTicket + ticketQuantity

      // Pre-generar los tickets en lote
      const ticketPromises = []
      for (let i = startTicketNumber; i <= endTicketNumber; i++) {
        ticketPromises.push(
          payload.create({
            collection: 'tickets',
            data: {
              ticket_number: i,
              raffle_id: raffleId,
              order_id: order.id,
            }
          })
        )
      }
      
      // Esperar a que todos los tickets se creen
      await Promise.all(ticketPromises)

      // Actualizar la Rifa con el nuevo last_ticket_issued
      await payload.update({
        collection: 'raffles',
        id: raffleId as string,
        data: {
          last_ticket_issued: endTicketNumber,
        }
      })

      // Actualizar la Orden a pagada
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          payment_status: 'paid',
        }
      })
      // === FIN BLOQUE CRÍTICO ===

      // 3. Enviar correo de confirmación
      if (process.env.RESEND_API_KEY) {
        try {
          await resend.emails.send({
            from: 'Rifas del Capibara <no-reply@rifasdelcapibara.cl>',
            to: order.email,
            subject: '¡Tus Tickets para la Rifa del Capibara!',
            html: `
              <h1>¡Pago Confirmado, ${order.name}!</h1>
              <p>Has adquirido ${ticketQuantity} tickets exitosamente.</p>
              <p>Tus números son: <strong>${startTicketNumber} al ${endTicketNumber}</strong></p>
              <p>¡Mucha suerte en el sorteo!</p>
            `
          })
        } catch (emailError) {
          console.error('Error enviando email:', emailError)
          // No lanzamos error para que Flow reciba el 200 OK y no reintente
        }
      }

      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Si Flow dice que falló o está pendiente
    if (flowStatus.status === 3 || flowStatus.status === 4) {
      await payload.update({
        collection: 'orders',
        id: flowStatus.commerceOrder,
        data: { payment_status: 'failed' }
      })
    }

    return NextResponse.json({ success: true, status: flowStatus.status }, { status: 200 })

  } catch (error: unknown) {
    console.error('Error Webhook Flow:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
