"use client"

import { useState } from 'react'
import { processCheckout } from '@/actions/checkout'

interface CheckoutFormProps {
  raffleId: string;
  selectedAmount: number;
  totalPrice: number;
  onCancel?: () => void;
}

export default function CheckoutForm({ raffleId, selectedAmount, totalPrice, onCancel }: CheckoutFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    const result = await processCheckout(formData)
    
    if (result.success && result.redirectUrl) {
      window.location.href = result.redirectUrl
    } else {
      setError(result.error || 'Ocurrió un error inesperado. Intenta de nuevo.')
      setIsPending(false)
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <input type="hidden" name="ticketAmount" value={selectedAmount} />
      <input type="hidden" name="raffleId" value={raffleId} />
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-bold text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <input name="name" type="text" placeholder="Nombre" className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-brand-gold transition-colors font-medium text-sm placeholder:text-zinc-500" required />
          <input name="lastname" type="text" placeholder="Apellidos" className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-brand-gold transition-colors font-medium text-sm placeholder:text-zinc-500" required />
        </div>
        <input name="rut" type="text" placeholder="RUT (Ej: 12.345.678-9)" className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-brand-gold transition-colors font-medium text-sm placeholder:text-zinc-500" required />
        <input name="email" type="email" placeholder="Correo Electrónico" className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-brand-gold transition-colors font-medium text-sm placeholder:text-zinc-500" required />
        <input name="phone" type="tel" placeholder="Teléfono (+56 9...)" className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:border-brand-gold transition-colors font-medium text-sm placeholder:text-zinc-500" required />
      </div>
      
      <div className="flex flex-col gap-3 mt-2">
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-brand-gold text-black font-black text-xl p-5 rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] uppercase tracking-widest disabled:opacity-50 flex flex-col items-center justify-center leading-none gap-2 hover:-translate-y-1"
        >
          {isPending ? 'Procesando...' : (
            <>
              <span>Pagar ${totalPrice.toLocaleString('es-CL')}</span>
              <span className="text-[10px] font-bold text-black/70 tracking-widest uppercase">Pago 100% Seguro vía Flow.cl</span>
            </>
          )}
        </button>

        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="w-full bg-white/5 text-white font-bold text-sm p-4 rounded-xl hover:bg-white/10 transition-colors uppercase tracking-wider"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
