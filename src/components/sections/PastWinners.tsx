import React from 'react'
import { PlayCircle } from 'lucide-react'

export default function PastWinners() {
  const winners = [
    {
      id: 1,
      prize: 'MacBook Air M2',
      name: 'Camila S.',
      date: 'Mayo 2026',
      image: '/placeholder.jpg'
    },
    {
      id: 2,
      prize: 'iPhone 15 Pro Max',
      name: 'Ignacio R.',
      date: 'Abril 2026',
      image: '/placeholder.jpg'
    },
    {
      id: 3,
      prize: 'Consola PlayStation 5',
      name: 'Matias V.',
      date: 'Marzo 2026',
      image: '/placeholder.jpg'
    },
    {
      id: 4,
      prize: '$1.000.000 Efectivo',
      name: 'Valentina P.',
      date: 'Febrero 2026',
      image: '/placeholder.jpg'
    }
  ]

  return (
    <section className="w-full py-24 bg-brand-dark px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 uppercase tracking-wider text-center">
          Ganadores Anteriores
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {winners.map((winner) => (
            <div 
              key={winner.id} 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl bg-zinc-900"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${winner.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle size={60} className="text-white/80" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-1">
                <p className="text-brand-gold font-black text-lg uppercase tracking-tight leading-tight">{winner.prize}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-white font-bold">{winner.name}</p>
                  <p className="text-zinc-400 text-xs font-medium">{winner.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
