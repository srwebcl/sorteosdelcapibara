"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para cambiar el estilo del navbar si se desea (más opaco al bajar)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b ${
          isOpen 
            ? 'bg-transparent border-transparent h-24'
            : scrolled 
              ? 'bg-black/90 backdrop-blur-2xl border-brand-gold/20 h-20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
              : 'bg-gradient-to-b from-black/80 to-transparent border-transparent h-24'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-full flex items-center justify-between relative">
          
          {/* LOGO (Absoluto dentro de su contenedor para no romper en monitores grandes) */}
          <div className="flex items-center relative h-full">
            {/* Espaciador invisible */}
            <div className="w-[110px] md:w-[140px]" /> 
            
            <a 
              href="#"
              onClick={(e) => scrollToSection(e, 'top')}
              className={`absolute left-0 z-[60] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                scrolled 
                  ? 'top-2 w-[80px] h-[80px] md:top-2 md:w-[100px] md:h-[100px]' 
                  : 'top-2 w-[110px] h-[110px] md:top-4 md:w-[150px] md:h-[150px]'
              }`}
            >
              <Image 
                src="/logo-rifas.png" 
                alt="Capibara Logo" 
                fill
                className="object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          {/* NAVEGACIÓN DESKTOP (Centrada/Alineada a la derecha) */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { name: 'Inicio', id: 'top' },
              { name: 'Comprar Stickers', id: 'compra-tickets' },
              { name: 'Premios', id: 'premios' },
              { name: 'Cómo Funciona', id: 'como-funciona' },
              { name: 'Stickers', id: 'stickers' }
            ].map((link, idx) => (
              <a 
                key={link.name + idx}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="group relative text-sm font-black text-zinc-300 uppercase tracking-[0.2em] py-2"
              >
                <span className="relative z-10 group-hover:text-brand-gold transition-colors duration-300">
                  {link.name}
                </span>
                {/* Línea animada inferior */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA COMPLEMENTARIO Y MENÚ MOBILE */}
          <div className="flex items-center gap-4">
            
            {/* CTA Secundario (Desktop y Tablet) */}
            {/* Diferente al Hero: Minimalista, estilo "Outline Luxury" en lugar de un bloque macizo */}
            <a 
              href="#compra-tickets"
              onClick={(e) => {
                e.preventDefault()
                window.dispatchEvent(new CustomEvent('open-global-cart', { detail: { mode: 'selection' } }))
              }}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 font-bold text-xs uppercase tracking-widest text-brand-gold border border-brand-gold/50 rounded-full hover:bg-brand-gold hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.1)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
            >
              Comprar Ahora
            </a>

            {/* BOTÓN HAMBURGUESA DE LUJO (Mobile) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-[70] w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-[2px] bg-brand-gold rounded-full transition-transform duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''}`} />
                <span className={`w-full h-[2px] bg-brand-gold rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`w-full h-[2px] bg-brand-gold rounded-full transition-transform duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''}`} />
              </div>
            </button>

          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL A PANTALLA COMPLETA */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-center ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Decoración de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
        
        <nav className="flex flex-col items-center gap-8 px-6 relative z-10">
          {[
            { name: 'Inicio', id: 'top' },
            { name: 'Comprar Stickers', id: 'compra-tickets' },
            { name: 'Premios', id: 'premios' },
            { name: 'Cómo Funciona', id: 'como-funciona' },
            { name: 'Stickers', id: 'stickers' }
          ].map((link, i) => (
            <a 
              key={link.name + i}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-2xl md:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 uppercase tracking-widest hover:scale-110 transition-transform duration-300"
              style={{
                animation: isOpen ? `slideUp 0.5s ease forwards ${i * 0.1}s` : 'none',
                opacity: isOpen ? 0 : 1,
                transform: isOpen ? 'translateY(20px)' : 'translateY(0)'
              }}
            >
              {link.name}
            </a>
          ))}
          
          <div className="w-20 h-[1px] bg-brand-gold/30 my-4" />

          {/* CTA Mobile en el menú */}
          <a 
            href="#compra-tickets"
            onClick={(e) => {
              e.preventDefault()
              setIsOpen(false)
              window.dispatchEvent(new CustomEvent('open-global-cart', { detail: { mode: 'selection' } }))
            }}
            className="px-8 py-3 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-600 rounded-full text-black font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-105 transition-transform"
          >
            Comprar Ahora
          </a>
        </nav>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
