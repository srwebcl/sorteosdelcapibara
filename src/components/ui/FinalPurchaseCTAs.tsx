"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Zap } from 'lucide-react'
import Image from 'next/image'

interface FinalPurchaseCTAsProps {
  ticketPrice: number
  comboAmount: number
  comboPrice: number
  onBuySingle: (quantity: number) => void
  onBuyCombo: (quantity: number) => void
}

export default function FinalPurchaseCTAs({
  ticketPrice,
  comboAmount,
  comboPrice,
  onBuySingle,
  onBuyCombo
}: FinalPurchaseCTAsProps) {
  const [singleQty, setSingleQty] = useState(1)
  const [comboQty, setComboQty] = useState(1)

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 z-10 mb-16 px-4">
      
      {/* Lado Izquierdo - Ticket Individual (Arriba en móvil, Izquierda en Desktop) */}
      <div className="flex flex-col items-center justify-center w-full max-w-[320px] transition-all bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl hover:bg-black/60 order-2 lg:order-1">
        <h4 className="text-white/80 font-black uppercase tracking-widest text-sm mb-1">1 Sticker Suelto</h4>
        
        <div className="flex items-end gap-2 mb-4">
          <span className="text-white font-black text-2xl">${(ticketPrice * singleQty).toLocaleString('es-CL')}</span>
        </div>

        {/* SIEMPRE EN UNA SOLA LÍNEA (flex-row) */}
        <div className="flex flex-row items-center gap-2 w-full justify-between">
          {/* Sumador Pequeño */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex items-center shrink-0">
            <button onClick={() => setSingleQty(Math.max(1, singleQty - 1))} className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors">
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-white font-bold text-base">{singleQty}</span>
            <button onClick={() => setSingleQty(singleQty + 1)} className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors">
              <Plus size={14} />
            </button>
          </div>

          {/* Botón Comprar */}
          <button 
            onClick={() => onBuySingle(singleQty)}
            className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1 uppercase tracking-wide text-[11px] whitespace-nowrap"
          >
            <ShoppingCart size={14} />
            Comprar
          </button>
        </div>
      </div>

      {/* Capibara Flotando (Al medio en Desktop, Arriba en Móvil) */}
      <div className="relative pointer-events-none z-0 order-1 lg:order-2 flex-shrink-0">
        
        {/* Monedas flotantes */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -left-8 top-10 w-12 h-12 drop-shadow-[0_10px_15px_rgba(251,191,36,0.3)] z-10 blur-[2px]"
        >
          <CoinSvg />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -20, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-4 top-16 w-10 h-10 drop-shadow-[0_10px_15px_rgba(251,191,36,0.3)] z-20 blur-[1px]"
        >
          <CoinSvg />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [0, -10, 15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute right-4 -top-2 w-8 h-8 drop-shadow-[0_5px_10px_rgba(251,191,36,0.3)] z-0 blur-[3px]"
        >
          <CoinSvg />
        </motion.div>

        {/* Capibara Principal */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] relative z-10"
        >
          <Image 
            src="/maestro_capibara.png" 
            alt="Maestro Capibara" 
            width={240} 
            height={240} 
            className="w-40 md:w-48 h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Lado Derecho - Pack VIP Estelar (Abajo en Móvil, Derecha en Desktop) */}
      <div className="flex flex-col items-center justify-center w-full max-w-[320px] relative transition-all bg-gradient-to-b from-yellow-900/20 to-black/60 backdrop-blur-md border border-brand-gold/40 rounded-3xl p-6 shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:shadow-[0_0_40px_rgba(251,191,36,0.25)] order-3">
        
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 bg-brand-gold text-black font-black text-[10px] px-3 py-1 uppercase tracking-widest rounded-full shadow-[0_0_10px_rgba(251,191,36,0.3)] whitespace-nowrap">
          MÁS VENDIDO 🔥
        </div>

        <div className="flex items-center gap-1.5 mb-1">
          <Zap className="text-brand-gold" size={16} fill="currentColor" />
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-brand-gold font-black uppercase tracking-widest text-sm">
            Pack X{comboAmount}
          </h4>
        </div>
        
        <div className="flex items-end gap-2 mb-4">
          <span className="text-white font-black text-3xl drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
            ${(comboPrice * comboQty).toLocaleString('es-CL')}
          </span>
          <span className="text-zinc-500 font-black line-through mb-1 text-sm">
            ${(ticketPrice * comboAmount * comboQty).toLocaleString('es-CL')}
          </span>
        </div>

        {/* SIEMPRE EN UNA SOLA LÍNEA (flex-row) */}
        <div className="flex flex-row items-center gap-2 w-full justify-between">
          {/* Sumador VIP */}
          <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-1 flex items-center shrink-0">
            <button onClick={() => setComboQty(Math.max(1, comboQty - 1))} className="w-8 h-8 flex items-center justify-center text-brand-gold hover:bg-brand-gold/20 rounded-lg transition-colors">
              <Minus size={14} />
            </button>
            <div className="w-8 flex flex-col items-center justify-center">
              <span className="text-brand-gold font-black text-base leading-none">{comboQty}</span>
            </div>
            <button onClick={() => setComboQty(comboQty + 1)} className="w-8 h-8 flex items-center justify-center text-brand-gold hover:bg-brand-gold/20 rounded-lg transition-colors">
              <Plus size={14} />
            </button>
          </div>

          {/* Botón Comprar VIP */}
          <button 
            onClick={() => onBuyCombo(comboQty)}
            className="flex-1 bg-gradient-to-r from-yellow-400 via-brand-gold to-orange-500 hover:scale-[1.02] active:scale-95 text-black font-black py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1 uppercase tracking-widest text-[11px] whitespace-nowrap shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          >
            <ShoppingCart size={14} />
            COMPRAR X{comboAmount * comboQty}
          </button>
        </div>
      </div>

    </div>
  )
}

function CoinSvg() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="gold-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="30%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <linearGradient id="gold-inner" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#713f12" />
        </linearGradient>
        <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="inner-shadow">
          <feOffset dx="0" dy="2"/>
          <feGaussianBlur stdDeviation="2" result="offset-blur"/>
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
          <feFlood floodColor="black" floodOpacity="0.7" result="color"/>
          <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
          <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
        </filter>
      </defs>
      
      <circle cx="50" cy="50" r="48" fill="url(#gold-base)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#fef08a" strokeWidth="1" opacity="0.6" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#713f12" strokeWidth="4" strokeDasharray="3 4" opacity="0.5" />
      <circle cx="50" cy="50" r="38" fill="url(#gold-inner)" filter="url(#inner-shadow)" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#fef08a" strokeWidth="0.5" opacity="0.4" />
      
      <text 
        x="50" 
        y="68" 
        fontFamily="Georgia, serif" 
        fontSize="48" 
        fontWeight="900" 
        fill="#fef08a" 
        textAnchor="middle" 
        style={{ textShadow: "0px 3px 5px rgba(0,0,0,0.6)" }}
      >
        $
      </text>

      <circle cx="50" cy="50" r="48" fill="url(#shine)" />
      <ellipse cx="30" cy="25" rx="15" ry="6" fill="#ffffff" opacity="0.4" transform="rotate(-45 30 25)" filter="blur(1px)" />
    </svg>
  )
}
