"use server"

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createRaffleAction(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const totalTickets = parseInt(formData.get('totalTickets') as string, 10)
    const drawDate = formData.get('drawDate') as string
    const prizesCount = parseInt(formData.get('prizesCount') as string, 10)
    
    // Datos del Hero
    const heroTitle = formData.get('hero_title') as string
    const heroSubtitle = formData.get('hero_subtitle') as string
    const heroImageFile = formData.get('hero_image') as File

    // Datos de Precios (Single vs Combo)
    const ticketPrice = parseInt(formData.get('ticket_price') as string, 10)
    const comboAmount = parseInt(formData.get('combo_amount') as string, 10)
    const comboPrice = parseInt(formData.get('combo_price') as string, 10)

    if (!title || !drawDate || isNaN(totalTickets) || isNaN(prizesCount) || !heroTitle || !heroSubtitle || !heroImageFile || isNaN(ticketPrice) || isNaN(comboAmount) || isNaN(comboPrice)) {
      throw new Error('Faltan campos obligatorios en el formulario')
    }

    const payload = await getPayload({ config })

    // 0. Procesar Hero Image
    const heroArrayBuffer = await heroImageFile.arrayBuffer()
    const heroBuffer = Buffer.from(heroArrayBuffer)
    const heroMedia = await payload.create({
      collection: 'media',
      data: { alt: `Fondo Hero - ${title}` },
      file: {
        data: heroBuffer,
        name: heroImageFile.name,
        mimetype: heroImageFile.type,
        size: heroImageFile.size,
      },
    })

    // 1. Procesar Premios e Imágenes
    const prizesArray = []
    for (let i = 0; i < prizesCount; i++) {
      const pName = formData.get(`prize_${i}_name`) as string
      const pFile = formData.get(`prize_${i}_image`) as File

      if (!pName || !pFile) throw new Error(`El premio #${i + 1} está incompleto`)

      const arrayBuffer = await pFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const media = await payload.create({
        collection: 'media',
        data: { alt: pName },
        file: {
          data: buffer,
          name: pFile.name,
          mimetype: pFile.type,
          size: pFile.size,
        },
      })

      prizesArray.push({
        name: pName,
        image: media.id,
      })
    }

    // 2. Crear el Sorteo con la nueva estructura
    await payload.create({
      collection: 'raffles',
      data: {
        title,
        total_tickets: totalTickets,
        draw_date: drawDate,
        status: 'Activa',
        
        // Hero
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        hero_image: heroMedia.id,

        // Prices
        ticket_price: ticketPrice,
        combo_amount: comboAmount,
        combo_price: comboPrice,

        // Prizes
        prizes: prizesArray,
      }
    })

    revalidatePath('/admin/rifas')
    revalidatePath('/')
    
  } catch (error: unknown) {
    console.error('Error creando campaña:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }

  redirect('/admin/rifas')
}

export async function updateRaffleAction(raffleId: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const totalTickets = parseInt(formData.get('totalTickets') as string, 10)
    const drawDate = formData.get('drawDate') as string
    const prizesCount = parseInt(formData.get('prizesCount') as string, 10)
    
    // Datos del Hero
    const heroTitle = formData.get('hero_title') as string
    const heroSubtitle = formData.get('hero_subtitle') as string
    const heroImageFile = formData.get('hero_image') as File | null
    const existingHeroImageId = formData.get('existing_hero_image_id') as string

    // Datos de Precios
    const ticketPrice = parseInt(formData.get('ticket_price') as string, 10)
    const comboAmount = parseInt(formData.get('combo_amount') as string, 10)
    const comboPrice = parseInt(formData.get('combo_price') as string, 10)

    if (!title || !drawDate || isNaN(totalTickets) || isNaN(prizesCount) || !heroTitle || !heroSubtitle || isNaN(ticketPrice) || isNaN(comboAmount) || isNaN(comboPrice)) {
      throw new Error('Faltan campos obligatorios en el formulario')
    }

    const payload = await getPayload({ config })

    let finalHeroImageId: string | number = existingHeroImageId
    if (finalHeroImageId && !isNaN(Number(finalHeroImageId))) {
      finalHeroImageId = Number(finalHeroImageId)
    }

    // 0. Procesar Hero Image (solo si subió una nueva)
    if (heroImageFile && heroImageFile.size > 0) {
      const heroArrayBuffer = await heroImageFile.arrayBuffer()
      const heroBuffer = Buffer.from(heroArrayBuffer)
      const heroMedia = await payload.create({
        collection: 'media',
        data: { alt: `Fondo Hero - ${title}` },
        file: {
          data: heroBuffer,
          name: heroImageFile.name,
          mimetype: heroImageFile.type,
          size: heroImageFile.size,
        },
      })
      finalHeroImageId = heroMedia.id
    }

    // 1. Procesar Premios e Imágenes
    const prizesArray = []
    for (let i = 0; i < prizesCount; i++) {
      const pName = formData.get(`prize_${i}_name`) as string
      const pFile = formData.get(`prize_${i}_image`) as File | null
      const existingPrizeImageId = formData.get(`prize_${i}_existing_image`) as string

      if (!pName) throw new Error(`El nombre del premio #${i + 1} está vacío`)

      let finalPrizeImageId: string | number = existingPrizeImageId
      if (finalPrizeImageId && !isNaN(Number(finalPrizeImageId))) {
        finalPrizeImageId = Number(finalPrizeImageId)
      }

      if (pFile && pFile.size > 0) {
        const arrayBuffer = await pFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const media = await payload.create({
          collection: 'media',
          data: { alt: pName },
          file: {
            data: buffer,
            name: pFile.name,
            mimetype: pFile.type,
            size: pFile.size,
          },
        })
        finalPrizeImageId = media.id
      }

      if (!finalPrizeImageId) {
        throw new Error(`El premio #${i + 1} necesita una imagen`)
      }

      prizesArray.push({
        name: pName,
        image: finalPrizeImageId,
      })
    }

    // 2. Actualizar el Sorteo
    const numericRaffleId = parseInt(raffleId, 10)
    await payload.update({
      collection: 'raffles',
      id: numericRaffleId,
      data: {
        title,
        total_tickets: totalTickets,
        draw_date: drawDate,
        
        // Hero
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        hero_image: finalHeroImageId,

        // Prices
        ticket_price: ticketPrice,
        combo_amount: comboAmount,
        combo_price: comboPrice,

        // Prizes
        prizes: prizesArray,
      }
    })

    revalidatePath('/admin/rifas')
    revalidatePath('/')
    
  } catch (error: unknown) {
    console.error('Error actualizando campaña:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }

  redirect('/admin/rifas')
}
