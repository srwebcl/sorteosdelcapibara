"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { ShoppingCart } from 'lucide-react' // eslint-disable-line @typescript-eslint/no-unused-vars
import ProgressBar from '@/components/ui/ProgressBar'
import CartDrawer from '@/components/ui/CartDrawer'
import FloatingCoins from '@/components/ui/FloatingCoins'
import PurchaseCards from '@/components/ui/PurchaseCards'

interface Prize {
  name: string
  image: string
}

interface PrizesAndCheckoutProps {
  raffleId: string
  ticketPrice: number
  comboAmount: number
  comboPrice: number
  totalTickets: number
  soldTickets: number
  prizes: Prize[]
  drawDate?: string
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

export default function PrizesAndCheckout({ 
  raffleId, ticketPrice, comboAmount, comboPrice, totalTickets, soldTickets, prizes, drawDate 
}: PrizesAndCheckoutProps) {
  
  // Estado para el Carrito Lateral
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartMode, setCartMode] = useState<'selection' | 'checkout'>('checkout')
  const [selectedAmount, setSelectedAmount] = useState(comboAmount)
  const [isCombo, setIsCombo] = useState(true)

  const [totalPrice, setTotalPrice] = useState(ticketPrice)

  const openCart = (amount: number, combo: boolean, calculatedTotal: number) => {
    setSelectedAmount(amount)
    setIsCombo(combo)
    setTotalPrice(calculatedTotal)
    setCartMode('checkout')
    setIsCartOpen(true)
  }

  React.useEffect(() => {
    const handleGlobalOpenCart = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: 'selection' | 'checkout', amount?: number; combo?: boolean; totalPrice?: number }>;
      if (customEvent.detail) {
        if (customEvent.detail.mode === 'selection') {
          setCartMode('selection');
          setIsCartOpen(true);
        } else {
          const { amount = comboAmount, combo = true, totalPrice: calculatedTotal = comboPrice } = customEvent.detail;
          openCart(amount, combo, calculatedTotal);
        }
      }
    };

    window.addEventListener('open-global-cart', handleGlobalOpenCart);
    return () => window.removeEventListener('open-global-cart', handleGlobalOpenCart);
  }, [comboAmount, comboPrice]);

  return (
    <>
      <style jsx global>{`
        .section-stroke-back {
          -webkit-text-stroke: 4px black;
          color: transparent;
        }
        .section-stroke-front {
          -webkit-text-stroke: 1px transparent;
        }
        @media (min-width: 768px) {
          .section-stroke-back {
            -webkit-text-stroke: 6px black;
          }
        }
      `}</style>

      <section id="compra-tickets" className="w-full bg-brand-dark min-h-screen pb-32 relative z-20 font-sans">
        
        {/* Monedas Flotantes Parallax */}
        <FloatingCoins />

        {/* =========================================
            FONDO DINÁMICO & MOVIMIENTO
           ========================================= */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-r from-brand-gold/30 via-yellow-600/20 to-transparent rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 270, 180, 90, 0],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-red-600/20 via-orange-600/10 to-transparent rounded-full blur-[120px]"
          />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-25 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Separador Logo Animado */}
        <div className="w-full flex justify-center -translate-y-16 relative z-30 pointer-events-none">
          <div className="relative flex items-center justify-center w-36 h-36">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-[6px] border-brand-gold/40 border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border-2 border-white/20 border-dotted"
            />
            <div className="w-28 h-28 bg-black rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.5)] z-10 p-2 overflow-hidden border border-brand-gold/30">
              <Image src="/logo.webp" alt="Capibara Logo" width={80} height={80} className="object-contain" />
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 h-full flex flex-col gap-24 relative z-10 -mt-10">
          
          {/* =========================================
              SECCIÓN SUPERIOR: TARJETAS DE TICKETS
             ========================================= */}
          <div className="w-full flex flex-col items-center gap-12">
            
            {/* Título Estilo Logo (Metalizado, Arqueado y Animado) */}
            <div className="relative text-center flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 py-4">
                {[
                  { text: 'ENTRA', rot: -4, y: 8, gold: false },
                  { text: 'AL', rot: 0, y: 0, gold: false },
                  { text: 'JUEGO', rot: 4, y: 8, gold: true }
                ].map((word, i) => (
                  <div key={i} className="relative" style={{ transform: `rotate(${word.rot}deg) translateY(${word.y}px)` }}>
                    <motion.div 
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Capa Trasera (Stroke negro grueso) con padding extra para itálicas */}
                      <span 
                        className="absolute section-stroke-back text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none translate-y-1.5 drop-shadow-2xl pr-4"
                        aria-hidden="true"
                      >
                        {word.text}
                      </span>
                      {/* Capa Frontal (Degradado Metalizado) con padding extra para itálicas */}
                      <span 
                        className={`relative z-10 text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none text-transparent bg-clip-text drop-shadow-sm pr-4 ${
                          word.gold 
                            ? 'bg-gradient-to-b from-yellow-100 via-brand-gold to-yellow-800' 
                            : 'bg-gradient-to-b from-white via-gray-300 to-gray-600'
                        }`}
                      >
                        {word.text}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
              <p className="text-zinc-300 font-bold text-lg md:text-xl max-w-3xl mt-6 px-4 text-center">
                Compra tus <span className="text-brand-gold">Stickers de Capibara</span> y gana increíbles premios. Cada Sticker es una oportunidad única de ganar.
              </p>
            </div>

            <PurchaseCards 
              ticketPrice={ticketPrice}
              comboAmount={comboAmount}
              comboPrice={comboPrice}
              onBuySingle={(qty) => openCart(qty, false, ticketPrice * qty)}
              onBuyCombo={(qty) => openCart(comboAmount * qty, true, comboPrice * qty)}
            />
          </div>

          {/* =========================================
              SECCIÓN INFERIOR: CARRUSEL DE PREMIOS
             ========================================= */}
          <div className="flex flex-col gap-12 mt-16">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto w-full mb-8"
            >
              <ProgressBar total={totalTickets} sold={soldTickets} />
            </motion.div>

            {/* Separador */}
            <div id="premios" className="pt-16 border-t-2 border-white/5 w-full">
              {/* Título Estilo Hero (Sólido, Sin Curva) */}
              <div className="relative text-center flex flex-col items-center">
                <span className="text-brand-gold font-black tracking-[0.3em] uppercase text-sm md:text-base mb-4 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">PREMIOS</span>
                
                <div className="relative flex justify-center w-full max-w-4xl">
                  <div className="absolute top-0 left-0 w-full flex flex-wrap justify-center gap-x-3 z-0 translate-y-1" style={{ textShadow: '0 0 15px rgba(251,191,36,0.5)' }}>
                    <span className="section-stroke-back text-4xl md:text-5xl lg:text-6xl font-black italic text-brand-gold uppercase tracking-tighter leading-none">
                      MIRA LO QUE TE LLEVAS
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-wrap justify-center gap-x-3" style={{ textShadow: '0px 2px 0px #000, 0px 4px 6px rgba(0,0,0,0.5)' }}>
                    <span className="section-stroke-front text-4xl md:text-5xl lg:text-6xl font-black italic text-yellow-300 uppercase tracking-tighter leading-none">
                      MIRA LO QUE TE LLEVAS
                    </span>
                  </div>
                </div>
                
                <div className="text-center w-full px-4 mt-6 relative z-10">
                  <p className="text-white font-bold uppercase tracking-widest text-sm md:text-base max-w-2xl mx-auto">
                    POR LA COMPRA DE TUS STICKERS PARTICIPA POR ESTOS PREMIOS. <br className="hidden md:block" />
                    <span className="text-brand-gold mt-2 block">
                      EL SORTEO SE REALIZA EL {
                        drawDate 
                          ? new Date(drawDate).toLocaleString('es-CL', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric', 
                              hour: '2-digit', 
                              minute: '2-digit',
                              timeZone: 'America/Santiago'
                            }).replace(',', ' A LAS').toUpperCase()
                          : 'PRÓXIMAMENTE'
                      }
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Carrusel de Premios */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 pt-8 w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {prizes.map((prize, index) => (
                <motion.div 
                  variants={cardVariant}
                  whileHover={{ scale: 1.05, y: -10 }}
                  key={index} 
                  className="group relative bg-zinc-900 border-4 border-zinc-800 hover:border-brand-gold rounded-[32px] overflow-hidden transition-all duration-300 flex flex-col shrink-0 snap-center w-[300px] sm:w-[360px] md:w-[400px] shadow-2xl"
                >
                  <div className="absolute top-6 left-6 bg-black text-white font-black text-xl uppercase tracking-tighter px-4 py-2 border-2 border-zinc-700 z-10 shadow-lg group-hover:bg-brand-gold group-hover:text-black group-hover:border-brand-gold transition-colors">
                    #{index + 1}
                  </div>

                  <div className="relative w-full aspect-square bg-zinc-950 flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 group-hover:from-yellow-900/40 group-hover:to-zinc-950 transition-colors duration-500" />
                    
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full relative"
                    >
                      <Image 
                        src={prize.image}
                        alt={prize.name}
                        fill
                        className="object-contain p-8 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] group-hover:scale-125 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10"
                      />
                    </motion.div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col justify-center bg-zinc-900 text-center border-t-4 border-zinc-800 group-hover:border-brand-gold transition-colors">
                    <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter group-hover:text-brand-gold transition-colors duration-300">
                      {prize.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>
      
      {/* Carrito Lateral (Drawer) */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        raffleId={raffleId}
        selectedAmount={selectedAmount}
        totalPrice={totalPrice}
        isCombo={isCombo}
        mode={cartMode}
        ticketPrice={ticketPrice}
        comboAmount={comboAmount}
        comboPrice={comboPrice}
        onSelectOption={(amount, combo, total) => {
          setSelectedAmount(amount);
          setIsCombo(combo);
          setTotalPrice(total);
          setCartMode('checkout');
        }}
      />
    </>
  )
}
