import React from 'react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/sections/Footer'
import HowItWorks from '@/components/sections/HowItWorks'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeroPromocional from '@/components/sections/HeroPromocional'
import PrizesAndCheckout from '@/components/sections/PrizesAndCheckout'

import StickersGallery from '@/components/sections/StickersGallery'
import FloatingWidgets from '@/components/ui/FloatingWidgets'

export default async function Home() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'raffles',
    where: { status: { equals: 'Activa' } },
    limit: 1,
  })

  const raffle = docs[0]

  if (!raffle) {
    return (
      <main className="flex flex-col min-h-screen bg-brand-dark text-white items-center justify-center">
        <h1 className="text-3xl font-black text-brand-gold">Pronto nuevos sorteos</h1>
      </main>
    )
  }

  const heroImageObj = typeof raffle.hero_image === 'object' && raffle.hero_image !== null ? raffle.hero_image : null
  const heroImageUrl = heroImageObj && 'url' in heroImageObj ? String(heroImageObj.url) : '/placeholder.jpg'

  // Formatear premios para extraer sus URLs de imagen
  const formattedPrizes = (raffle.prizes || []).map((prize: { name: string, image?: { url?: string } }) => {
    const imgObj = typeof prize.image === 'object' && prize.image !== null ? prize.image : null
    return {
      name: prize.name,
      image: imgObj && 'url' in imgObj ? String(imgObj.url) : '/placeholder.jpg'
    }
  })

  return (
    <main id="top" className="flex flex-col min-h-screen bg-brand-dark text-white selection:bg-brand-gold selection:text-black">
      <Navbar />
      
      <HeroPromocional 
        title={raffle.hero_title}
        subtitle={raffle.hero_subtitle}
        imageUrl={heroImageUrl}
      />
      
      <PrizesAndCheckout 
        raffleId={String(raffle.id)}
        ticketPrice={raffle.ticket_price}
        comboAmount={raffle.combo_amount}
        comboPrice={raffle.combo_price}
        totalTickets={raffle.total_tickets}
        soldTickets={raffle.last_ticket_issued || 0}
        prizes={formattedPrizes}
        drawDate={raffle.draw_date}
      />
      
      <HowItWorks />
      
      {/* <PastWinners /> */}
      <StickersGallery 
        ticketPrice={raffle.ticket_price}
        comboAmount={raffle.combo_amount}
        comboPrice={raffle.combo_price}
      />

      <Footer />
      <FloatingWidgets />
    </main>
  )
}
