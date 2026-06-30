"use client"

import React from 'react'
import Image from 'next/image'

import FinalPurchaseCTAs from '@/components/ui/FinalPurchaseCTAs'

interface StickersGalleryProps {
  ticketPrice: number
  comboAmount: number
  comboPrice: number
}

const stickers = [
  'Capybara_entrepreneur_reviewing_…_202606300208.webp',
  'Capybara_holding_Chilean_pesos_202606300220.webp',
  'Capybara_influencer_taking_photo…_202606300210.webp',
  'Capybara_mascot_celebrating_Worl…_202606300222.webp',
  'Capybara_mascot_on_sofa_202606300217.webp',
  'Capybara_opening_refrigerator_202606300216.webp',
  'Capybara_playing_PlayStation_5_202606300213.webp',
  'Capybara_sleeping_in_luxury_bed_202606300219.webp',
  'EL_TERREMOTO_SE_TOMA_EN_202606300225.webp'
]

// Duplicamos para efecto de loop infinito
const duplicatedStickers = [...stickers, ...stickers]

export default function StickersGallery({
  ticketPrice,
  comboAmount,
  comboPrice
}: StickersGalleryProps) {
  // Función para abrir el carrito directamente (Custom Event)
  const handleOpenCart = (amount: number, combo: boolean, totalPrice: number) => {
    window.dispatchEvent(new CustomEvent('open-global-cart', { 
      detail: { mode: 'checkout', amount, combo, totalPrice } 
    }))
  }

  return (
    <section id="stickers" className="w-full bg-black py-24 relative z-20 overflow-hidden font-sans border-t-2 border-white/5">
      {/* Luces de Fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Título de la Sección */}
        <div className="flex flex-col items-center justify-center mb-12 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center w-full mb-4">
              <div className="absolute top-0 left-0 w-full flex justify-center z-0 translate-y-1" style={{ textShadow: '0 0 15px rgba(251,191,36,0.5)' }}>
                <h2 className="section-stroke-back text-4xl md:text-6xl lg:text-[70px] font-black italic text-brand-gold uppercase tracking-tighter leading-none">
                  Stickers Exclusivos
                </h2>
              </div>
              <div className="relative z-10 flex justify-center" style={{ textShadow: '0px 2px 0px #000, 0px 4px 6px rgba(0,0,0,0.5)' }}>
                <h2 className="section-stroke-front text-4xl md:text-6xl lg:text-[70px] font-black italic text-white uppercase tracking-tighter leading-none">
                  Stickers Exclusivos
                </h2>
              </div>
            </div>
            <p className="text-zinc-400 font-bold text-lg mt-2 uppercase tracking-widest max-w-xl text-center">
              Diseños únicos edición limitada. ¡Colecciónalos todos comprando tus tickets!
            </p>
          </div>
        </div>
      </div>

      {/* Carrusel Infinito (Marquee) */}
      <div className="relative w-full flex overflow-hidden py-4 group">
        <div className="flex gap-4 md:gap-6 px-4 md:px-6 w-max animate-marquee">
          {duplicatedStickers.map((filename, idx) => (
            <div
              key={idx}
              className="relative shrink-0 w-[280px] sm:w-[350px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group-hover:opacity-80 hover:!opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              {/* Imagen del Sticker */}
              <Image 
                src={`/Stickers/${filename}`}
                alt={`Sticker Capibara ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                sizes="(max-width: 768px) 280px, 350px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mt-12 pt-12 border-t border-white/10 relative z-10 w-full">
          
          {/* Intro Ganadora Premium */}
          <div className="text-center max-w-3xl mb-8 md:mb-12">
            <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-6 drop-shadow-md">
              ÚLTIMA OPORTUNIDAD <span className="text-brand-gold">DE PARTICIPAR</span>
            </h3>
            <p className="text-zinc-300 font-bold text-lg md:text-xl leading-relaxed mt-4">
              No dejes que el premio se te arranque. Asegura tus stickers ahora mismo y entra a competir con todo. <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">La suerte premia a los que se la juegan.</span>
            </p>
          </div>

          <FinalPurchaseCTAs 
            ticketPrice={ticketPrice}
            comboAmount={comboAmount}
            comboPrice={comboPrice}
            onBuySingle={(qty) => handleOpenCart(qty, false, ticketPrice * qty)}
            onBuyCombo={(qty) => handleOpenCart(comboAmount * qty, true, comboPrice * qty)}
          />
        </div>
        
        {/* Legal Text */}
        <div className="w-full text-center mt-16 px-4">
          <p className="text-white/50 text-xs max-w-2xl mx-auto">
            *Todos los stickers comprados entran al sorteo por los premios publicados. Ver condiciones de los sorteos en <a href="/terminos-y-condiciones" className="underline hover:text-white transition-colors">Términos y Condiciones</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
