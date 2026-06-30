"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface HeroPromocionalProps {
  title: string
  subtitle: string
  imageUrl: string // Keep for backwards compatibility if needed
}

const HERO_IMAGES = [
  '/hero-bg-1.webp',
  '/hero-bg-2.webp',
  '/hero-bg-3.webp'
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeroPromocional({ title, subtitle, imageUrl }: HeroPromocionalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('compra-tickets')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Split title for word-by-word staggered animation
  const titleWords = title.split(' ')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 100, scale: 0.5, rotateX: 45 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        type: 'spring', 
        damping: 12, 
        stiffness: 100 
      }
    }
  }

  return (
    <section className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Fondo Promocional Animado (Carrusel) */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={HERO_IMAGES[currentImageIndex]} 
              alt="Fondo Promocional" 
              fill 
              priority
              className="object-cover opacity-50"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-brand-dark pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(218,165,32,0.15)_0%,_transparent_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1400px] mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-0">
        
        {/* Etiqueta Superior */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="inline-block bg-white/5 border border-white/20 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-6 sm:mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span className="text-brand-gold font-black uppercase tracking-[0.3em] drop-shadow-md text-xs sm:text-xs md:text-sm">
            Sorteamos Premios Increíbles
          </span>
        </motion.div>
        
          {/* Textos Promocionales Masivos (Staggered Words) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-6 sm:mb-8 perspective-[1000px] w-full"
        >
          {/* Variables responsivas para el stroke (borde del texto) */}
          <style jsx>{`
            .responsive-stroke-back {
              -webkit-text-stroke: 4px #000;
            }
            .responsive-stroke-front {
              -webkit-text-stroke: 1.5px #000;
            }
            @media (min-width: 640px) {
              .responsive-stroke-back { -webkit-text-stroke: 5px #000; }
              .responsive-stroke-front { -webkit-text-stroke: 2px #000; }
            }
            @media (min-width: 1024px) {
              .responsive-stroke-back { -webkit-text-stroke: 6px #000; }
              .responsive-stroke-front { -webkit-text-stroke: 1.5px #000; }
            }
          `}</style>

          {/* Capa dorada trasera (Sombra/Borde 3D) */}
          <div 
            className="absolute top-0 left-0 w-full flex flex-wrap justify-center gap-x-3 sm:gap-x-4 lg:gap-x-5 z-0 translate-y-1 sm:translate-y-2"
            style={{ textShadow: '0 0 20px rgba(251,191,36,0.6)' }}
            aria-hidden="true"
          >
            {titleWords.map((word, i) => (
              <motion.span 
                key={i} 
                variants={wordVariants}
                className="responsive-stroke-back text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[75px] xl:text-[85px] font-black italic text-brand-gold uppercase tracking-tighter leading-[0.95] sm:leading-[0.9]"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Capa principal frontal (Texto blanco) */}
          <div 
            className="relative z-10 flex flex-wrap justify-center gap-x-3 sm:gap-x-4 lg:gap-x-5"
            style={{ textShadow: '0px 2px 0px #000, 0px 4px 0px #000, 0px 8px 10px rgba(251,191,36,0.4)' }}
          >
            {titleWords.map((word, i) => (
              <motion.span 
                key={i} 
                variants={wordVariants}
                className="responsive-stroke-front text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[75px] xl:text-[85px] font-black italic text-white uppercase tracking-tighter leading-[0.95] sm:leading-[0.9]"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        {/* Subtítulo */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-zinc-200 font-bold max-w-[90%] sm:max-w-2xl lg:max-w-3xl mx-auto mb-10 sm:mb-12 leading-snug sm:leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        >
          {subtitle}
        </motion.p>

        {/* CTA Principal con Efecto Elástico */}
        <motion.a 
          href="#compra-tickets"
          onClick={scrollToCheckout}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 15, 
            delay: 1.1 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center justify-center px-5 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 font-black text-sm sm:text-lg lg:text-xl text-black bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-600 rounded-full overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.4)] sm:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_40px_rgba(251,191,36,0.8)] transition-shadow duration-500"
        >
          {/* Brillo animado infinito */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <span className="relative uppercase tracking-widest flex items-center gap-2 sm:gap-3 drop-shadow-sm">
            Comprar Stickers Ahora
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
        </motion.a>
      </div>
      
      {/* Separador inferior difuminado */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none" />
    </section>
  )
}
