import React from 'react'
import { Ticket, CreditCard, Trophy } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: <Ticket size={32} className="text-brand-dark" />,
      title: 'Elige una Opción',
      description: 'Selecciona si quieres un sticker suelto o asegurar ventaja con el Pack VIP.'
    },
    {
      icon: <CreditCard size={32} className="text-brand-dark" />,
      title: 'Compra tus Stickers',
      description: 'Paga de forma rápida y 100% segura a través de Flow.'
    },
    {
      icon: <Trophy size={32} className="text-brand-dark" />,
      title: '¡Ya estás participando!',
      description: 'Recibes tus stickers al instante y entras a competir en el gran sorteo.'
    }
  ]

  return (
    <section id="como-funciona" className="w-full py-24 bg-brand-dark border-y border-white/10 px-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -left-40 top-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-40 bottom-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto flex flex-col items-center relative z-10">
        <div className="relative text-center flex flex-col items-center mb-6">
          <span className="text-brand-gold font-black text-sm md:text-base uppercase tracking-[0.3em] mb-4 drop-shadow-md">
            COMPRA TUS STICKERS
          </span>
          
          <div className="relative flex flex-col items-center w-full">
            <div className="absolute top-0 left-0 w-full flex flex-wrap justify-center z-0 translate-y-1 md:translate-y-2" style={{ textShadow: '0 0 20px rgba(251,191,36,0.6)' }}>
              <span className="section-stroke-back text-4xl sm:text-5xl md:text-6xl lg:text-[75px] font-black italic text-brand-gold uppercase tracking-tighter leading-none">
                Rápido, Fácil y Seguro
              </span>
            </div>
            <div className="relative z-10 flex flex-wrap justify-center" style={{ textShadow: '0px 3px 0px #000, 0px 6px 8px rgba(0,0,0,0.5)' }}>
              <span className="section-stroke-front text-4xl sm:text-5xl md:text-6xl lg:text-[75px] font-black italic text-white uppercase tracking-tighter leading-none">
                Rápido, Fácil y Seguro
              </span>
            </div>
          </div>
        </div>
        <p className="text-zinc-400 font-medium text-lg text-center max-w-2xl mx-auto mb-16 mt-6">
          En Capibara nos preocupamos de que todo el sorteo sea 100% transparente, auditable y automático. Juegas a la segura.
        </p>

        <div className="relative w-full flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4">
          {/* Línea conectora dorada en desktop */}
          <div className="hidden md:block absolute top-10 left-12 right-12 h-0.5 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent z-0" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative z-10 flex-1 group">
              <div className="w-20 h-20 rounded-2xl bg-brand-gold flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(251,191,36,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-300 rotate-3 group-hover:rotate-6">
                <div className="-rotate-3 group-hover:-rotate-6 transition-transform">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide">{step.title}</h3>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
