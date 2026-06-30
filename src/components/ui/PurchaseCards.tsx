"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus } from 'lucide-react'

interface PurchaseCardsProps {
  ticketPrice: number
  comboAmount: number
  comboPrice: number
  onBuySingle: (quantity: number) => void
  onBuyCombo: (quantity: number) => void
}

export default function PurchaseCards({
  ticketPrice,
  comboAmount,
  comboPrice,
  onBuySingle,
  onBuyCombo
}: PurchaseCardsProps) {
  const [singleQty, setSingleQty] = useState(1)
  const [comboQty, setComboQty] = useState(1)

  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2 } }
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto"
    >
      {/* Tarjeta Ticket Individual (Flúor Neón) */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 50 },
          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
        }}
        className="relative bg-zinc-950 border-4 border-zinc-800 rounded-2xl p-8 md:p-10 transition-all duration-500 group hover:border-zinc-500 flex flex-col justify-between shadow-2xl overflow-hidden hover:-translate-y-2"
      >
        {/* Flúor Background Animations */}
        <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none">
          <motion.div 
            animate={{ x: [-20, 30, -20], y: [-20, 30, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-500/30 rounded-full blur-[60px]"
          />
          <motion.div 
            animate={{ x: [30, -30, 30], y: [30, -30, 30] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-600/30 rounded-full blur-[70px]"
          />
        </div>
        
        <div className="relative z-10">
          <h4 className="font-black text-4xl italic tracking-tighter text-white uppercase drop-shadow-md">1 Sticker</h4>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-4 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          <p className="text-zinc-500 text-sm font-medium mb-6 min-h-[40px] leading-relaxed relative z-10 px-2">
            Para los que le tienen fe a la suerte. Con un solo sticker ya estás participando por todo el premio. Si andas con la suerte de tu lado, no necesitas más.
          </p>
          <div className="mt-8 relative">
            <span className="text-white font-black text-5xl md:text-6xl drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
              ${(ticketPrice * singleQty).toLocaleString('es-CL')}
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 relative z-10">
          {/* Sumador de Cantidad */}
          <div className="w-full bg-white/5 border border-white/20 rounded-xl p-2 flex items-center justify-between">
            <button 
              onClick={() => setSingleQty(Math.max(1, singleQty - 1))}
              className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Minus size={20} />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-white font-black text-2xl">{singleQty}</span>
              <span className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold">Cantidad</span>
            </div>
            <button 
              onClick={() => setSingleQty(singleQty + 1)}
              className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          <button 
            onClick={() => onBuySingle(singleQty)}
            className="w-full relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 text-white font-black text-xl p-5 rounded-xl transition-all duration-300 uppercase tracking-widest hover:bg-white/10 hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
          >
            <ShoppingCart size={24} className="relative z-10" />
            <span className="relative z-10 drop-shadow-md">Prueba Suerte</span>
          </button>
        </div>
      </motion.div>

      {/* Tarjeta Combo VIP (Flúor Fuego/Oro) */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 50 },
          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
        }}
        className="relative bg-black border-4 border-brand-gold rounded-2xl p-8 md:p-10 shadow-[0_0_40px_rgba(251,191,36,0.15)] hover:shadow-[0_0_80px_rgba(251,191,36,0.4)] transition-all duration-500 group flex flex-col justify-between overflow-hidden hover:-translate-y-2"
      >
        {/* Flúor Background Animations */}
        <div className="absolute inset-0 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-500/30 rounded-full blur-[70px]"
          />
          <motion.div 
            animate={{ scale: [1.3, 1, 1.3], x: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-red-600/30 rounded-full blur-[90px]"
          />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay" />
        </div>
        
        <div className="absolute top-0 right-0 bg-brand-gold text-black font-black text-xs px-4 py-2 uppercase tracking-widest rounded-bl-xl z-20 shadow-[0_5px_15px_rgba(251,191,36,0.4)] border-b border-l border-yellow-300">
          Lo más comprado 🔥
        </div>
        
        <div className="relative z-10">
          <h4 className="font-black text-5xl italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-yellow-100 via-brand-gold to-orange-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] uppercase">
            PACK x{comboAmount}
          </h4>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-red-500 mt-4 mb-6 shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
          <p className="text-yellow-100/70 text-sm font-medium mb-8 min-h-[40px] leading-relaxed relative z-10 px-2">
            Para los que van a la segura. Multiplica tus opciones reales de ganar. Juégatela con todo y asegura una ventaja matemática gigante.
          </p>
          
          <div className="mt-8 flex items-end gap-4 relative">
            <span className="text-white font-black text-5xl md:text-7xl drop-shadow-[0_5px_20px_rgba(0,0,0,0.9)]">
              ${(comboPrice * comboQty).toLocaleString('es-CL')}
            </span>
            <span className="text-zinc-400 font-black line-through mb-1 md:mb-2 text-xl md:text-2xl drop-shadow-md">
              ${(ticketPrice * comboAmount * comboQty).toLocaleString('es-CL')}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 relative z-10">
          {/* Sumador de Cantidad */}
          <div className="w-full bg-white/5 border border-yellow-500/30 rounded-xl p-2 flex items-center justify-between shadow-[0_0_20px_rgba(251,191,36,0.1)]">
            <button 
              onClick={() => setComboQty(Math.max(1, comboQty - 1))}
              className="w-12 h-12 flex items-center justify-center text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-colors"
            >
              <Minus size={20} />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-brand-gold font-black text-2xl">{comboQty}</span>
              <span className="text-yellow-500/70 text-[10px] uppercase tracking-widest font-bold">Packs</span>
            </div>
            <button 
              onClick={() => setComboQty(comboQty + 1)}
              className="w-12 h-12 flex items-center justify-center text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          <button 
            onClick={() => onBuyCombo(comboQty)}
            className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-400 via-brand-gold to-orange-500 text-black font-black text-2xl p-6 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(251,191,36,0.6)] uppercase tracking-widest border border-yellow-200/50 flex items-center justify-center gap-3"
          >
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-0"
            />
            <ShoppingCart size={28} className="relative z-10" />
            <span className="relative z-10">Prueba Suerte x{comboAmount * comboQty}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
