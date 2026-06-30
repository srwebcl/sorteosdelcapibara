import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import EditRaffleForm from './EditRaffleForm'
import { notFound } from 'next/navigation'

export default async function EditarRifaPage({ params }: { params: Promise<{ id: string }> }) {
  const payload = await getPayload({ config })
  let raffle = null

  try {
    const resolvedParams = await params
    const raffleId = parseInt(resolvedParams.id, 10)
    if (isNaN(raffleId)) {
      return notFound()
    }

    raffle = await payload.findByID({
      collection: 'raffles',
      id: raffleId,
    })
  } catch (error) {
    console.error("Error fetching raffle:", error)
    return notFound()
  }

  if (!raffle) {
    return notFound()
  }

  return <EditRaffleForm raffle={raffle} />
}
