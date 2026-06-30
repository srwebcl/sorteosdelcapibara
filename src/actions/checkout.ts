"use server"

import { getPayload } from 'payload'
import config from '@payload-config'
import { createPayment } from '@/lib/flow'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function processCheckout(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const lastname = formData.get('lastname') as string
    const rut = formData.get('rut') as string
    const email = formData.get('email') as string
    
    const raffleId = formData.get('raffleId') as string
    const ticketAmount = parseInt(formData.get('ticketAmount') as string, 10)

    if (!name || !lastname || !rut || !email || !raffleId || isNaN(ticketAmount)) {
      throw new Error('Faltan campos requeridos')
    }

    const payload = await getPayload({ config })

    // 1. Validar la rifa
    const raffle = await payload.findByID({
      collection: 'raffles',
      id: raffleId,
    })

    if (!raffle || raffle.status !== 'Activa') {
      throw new Error('La rifa no está activa o no existe')
    }

    // Calcular el monto total basado en si eligió 1 ticket o el combo
    let totalAmount = 0
    if (ticketAmount === 1) {
      totalAmount = raffle.ticket_price
    } else if (ticketAmount === raffle.combo_amount) {
      totalAmount = raffle.combo_price
    } else {
      throw new Error('La cantidad de tickets seleccionada no es válida')
    }
    // 2. Crear la Orden en Payload (Pending)
    const order = await payload.create({
      collection: 'orders',
      data: {
        rut: rut,
        name: `${name} ${lastname}`,
        email: email,
        total_amount: totalAmount,
        payment_status: 'pending',
        raffle_id: raffleId,
        ticket_quantity: ticketAmount,
      }
    })

    // 3. Crear pago en Flow
    const flowPayment = await createPayment({
      commerceOrder: order.id.toString(), // Flow usará este ID para el webhook
      subject: `Compra de ${ticketAmount} Tickets - ${raffle.title}`,
      currency: 'CLP',
      amount: totalAmount,
      email: email,
      urlConfirmation: `${SITE_URL}/api/webhooks/flow`,
      urlReturn: `${SITE_URL}/?payment=success`, // Redirigir al home temporalmente con param
    })

    // Actualizar la orden con el ID de Flow por si acaso (opcional, pero útil)
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        flow_order_id: flowPayment.flowOrder.toString(),
      }
    })

    // 4. Retornar la URL de Flow para redirigir al usuario
    return {
      success: true,
      redirectUrl: `${flowPayment.url}?token=${flowPayment.token}`
    }

  } catch (error: unknown) {
    console.error('Error en checkout:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
