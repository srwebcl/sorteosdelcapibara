"use client"
import { useState } from 'react'
import { clsx } from 'clsx'

export default function TicketSelector() {
  const [selected, setSelected] = useState<number | null>(null)
  
  const options = [
    { id: 1, amount: 1, price: 2500, badge: null },
    { id: 2, amount: 5, price: 10000, badge: 'MÁS POPULAR' },
    { id: 3, amount: 10, price: 18000, badge: null },
  ]
  
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight text-white">Selecciona tus Tickets</h2>
      {options.map((opt) => (
        <label 
          key={opt.id}
          className={clsx(
            "relative flex items-center justify-between p-5 rounded-xl cursor-pointer transition-all duration-300 border-2",
            selected === opt.id 
              ? "border-brand-gold bg-brand-gold/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]" 
              : "border-white/10 bg-white/5 hover:bg-white/10"
          )}
        >
          <input 
            type="radio" 
            name="ticketPackage" 
            value={opt.id}
            checked={selected === opt.id}
            onChange={() => setSelected(opt.id)}
            className="hidden"
          />
          <div>
            <div className="font-black text-2xl tracking-tight text-white">{opt.amount} Ticket{opt.amount > 1 ? 's' : ''}</div>
            <div className="text-brand-gold font-medium mt-1">Por ${opt.price.toLocaleString('es-CL')}</div>
          </div>
          {opt.badge && (
            <div className="absolute -top-3 right-4 bg-brand-gold text-brand-dark text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {opt.badge}
            </div>
          )}
          <div className={clsx(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            selected === opt.id ? "border-brand-gold" : "border-white/30"
          )}>
            {selected === opt.id && <div className="w-3 h-3 bg-brand-gold rounded-full" />}
          </div>
        </label>
      ))}
    </div>
  )
}
