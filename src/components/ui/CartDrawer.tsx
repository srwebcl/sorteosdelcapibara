"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Ticket } from 'lucide-react'
import CheckoutForm from '@/components/forms/CheckoutForm'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  raffleId: string
  selectedAmount: number
  totalPrice: number
  isCombo: boolean
  mode?: 'selection' | 'checkout'
  ticketPrice?: number
  comboAmount?: number
  comboPrice?: number
  onSelectOption?: (amount: number, combo: boolean, total: number) => void
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  raffleId, 
  selectedAmount, 
  totalPrice,
  isCombo,
  mode = 'checkout',
  ticketPrice = 1000,
  comboAmount = 4,
  comboPrice = 3000,
  onSelectOption
}: CartDrawerProps) {
  
  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />

          {/* Drawer Lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[500px] h-full bg-brand-dark border-l border-white/10 z-[120] flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Header del Carrito */}
            <div className="sticky top-0 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                {mode === 'selection' ? 'Selecciona tu Opción' : 'Completar Compra'}
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-8">
              
              {mode === 'selection' ? (
                // PANTALLA DE SELECCIÓN
                <div className="flex flex-col gap-6 h-full justify-start pt-4 pb-48 relative overflow-hidden">
                  
                  {/* Opción Pack VIP */}
                  <button 
                    onClick={() => onSelectOption?.(comboAmount, true, comboPrice)}
                    className="relative w-full text-left bg-gradient-to-br from-yellow-900/40 to-black/80 backdrop-blur-md border border-brand-gold/50 rounded-3xl p-5 md:p-6 shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-all group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-[40px] group-hover:bg-brand-gold/20 transition-colors" />
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-gold text-black font-black text-[9px] px-3 py-1 uppercase tracking-widest rounded-b-lg shadow-md">
                      RECOMENDADO 🔥
                    </div>

                    <div className="flex items-center gap-2 mb-2 mt-2">
                      <Zap className="text-brand-gold" size={20} fill="currentColor" />
                      <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-brand-gold font-black uppercase tracking-widest text-xl">
                        Pack X{comboAmount}
                      </h4>
                    </div>
                    
                    <p className="text-yellow-100/70 text-xs md:text-sm font-medium mb-4">
                      Multiplica tus opciones de ganar. La mejor decisión.
                    </p>

                    <div className="flex items-end justify-between w-full">
                      <div className="flex flex-col">
                        <span className="text-white font-black text-3xl drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                          ${comboPrice.toLocaleString('es-CL')}
                        </span>
                        <span className="text-brand-gold font-bold text-xs">
                          (Llevas {comboAmount} participaciones)
                        </span>
                      </div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Divisor */}
                  <div className="flex items-center justify-center gap-3 text-white/20">
                    <div className="w-full h-px bg-white/10" />
                    <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold">O</span>
                    <div className="w-full h-px bg-white/10" />
                  </div>

                  {/* Opción Individual */}
                  <button 
                    onClick={() => onSelectOption?.(1, false, ticketPrice)}
                    className="w-full text-left bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-4 md:p-5 shadow-xl hover:bg-black/80 transition-all group relative z-10"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Ticket className="text-zinc-400" size={18} />
                      <h4 className="text-white/80 font-black uppercase tracking-widest text-base md:text-lg">
                        1 Sticker Suelto
                      </h4>
                    </div>
                    <p className="text-zinc-500 text-xs font-medium mb-3">
                      Participación estándar para probar tu suerte.
                    </p>
                    <div className="flex items-end justify-between w-full">
                      <span className="text-white font-black text-xl">
                        ${ticketPrice.toLocaleString('es-CL')}
                      </span>
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Capibara asomándose por abajo (centrado y por encima) */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140px] md:w-[180px] opacity-100 pointer-events-none z-20">
                    <Image 
                      src="/maestro_capibara-1.png" 
                      alt="Maestro Capibara" 
                      width={180} 
                      height={180} 
                      className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                </div>
              ) : (
                // PANTALLA DE CHECKOUT (Formulario original)
                <>
                  {/* Resumen del Pedido */}
                  <div className="bg-black/50 border border-brand-gold/30 rounded-2xl p-6 relative overflow-hidden">
                    {isCombo && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-xl font-black text-white uppercase">
                          {isCombo ? `Combo VIP (${selectedAmount})` : 'Ticket Individual'}
                        </h3>
                        <p className="text-zinc-400 text-sm font-medium mt-1">
                          {isCombo ? 'Máximas probabilidades de ganar' : 'Participación estándar'}
                        </p>
                      </div>
                      <div className="text-brand-gold font-black text-2xl">
                        ${totalPrice.toLocaleString('es-CL')}
                      </div>
                    </div>
                  </div>

                  {/* Formulario */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">Tus Datos</h3>
                    <CheckoutForm 
                      raffleId={raffleId}
                      selectedAmount={selectedAmount}
                      totalPrice={totalPrice}
                      onCancel={onClose}
                    />
                  </div>
                </>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
