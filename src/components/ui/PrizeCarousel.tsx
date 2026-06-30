"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function PrizeCarousel({ prizes }: { prizes: { name: string, image?: { url?: string } }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotación
  useEffect(() => {
    if (prizes.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prizes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [prizes.length])

  const next = () => setCurrentIndex((prev) => (prev + 1) % prizes.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + prizes.length) % prizes.length)

  if (!prizes || prizes.length === 0) return null

  const currentPrize = prizes[currentIndex]
  const imageUrl = currentPrize?.image?.url || '/placeholder.jpg'

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] mb-10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 ring-1 ring-white/5 group bg-black/50">
      
      {/* Contenedor de la Imagen con fade transition */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <Image 
          src={imageUrl} 
          alt={currentPrize?.name || 'Premio'} 
          fill 
          priority={true} 
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Gradiente sutil para el texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Título del Premio Actual */}
      <div className="absolute bottom-6 left-6 right-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold bg-black/50 px-2 py-1 rounded-md mb-2 inline-block backdrop-blur-md">
          Premio {currentIndex + 1} de {prizes.length}
        </span>
        <h3 className="text-2xl font-black text-white leading-tight drop-shadow-md">
          {currentPrize?.name}
        </h3>
      </div>

      {/* Controles de Navegación (solo si hay más de 1 premio) */}
      {prizes.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-brand-gold backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-black border border-white/10 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-brand-gold backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-black border border-white/10 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  )
}
