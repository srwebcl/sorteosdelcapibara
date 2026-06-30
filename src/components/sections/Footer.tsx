import React from 'react'
import { Mail, Phone, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t-4 border-brand-gold pt-20 pb-10 px-6 relative overflow-hidden font-sans">
      
      {/* Luces de Fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1 - Logo & About */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="relative flex flex-col items-start w-full">
              <div className="absolute top-0 left-0 w-full flex z-0 translate-y-1" style={{ textShadow: '0 0 15px rgba(251,191,36,0.5)' }}>
                <span className="section-stroke-back text-3xl font-black italic text-brand-gold uppercase tracking-tighter leading-none">
                  CAPIBARA
                </span>
              </div>
              <div className="relative z-10 flex" style={{ textShadow: '0px 2px 0px #000, 0px 4px 6px rgba(0,0,0,0.5)' }}>
                <span className="section-stroke-front text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                  CAPIBARA
                </span>
              </div>
            </div>
            <p className="text-zinc-400 font-medium text-sm leading-relaxed mb-2">
              La tienda de stickers de la suerte más exclusiva. Compra tus stickers digitales y participa directamente por increíbles premios.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-brand-gold hover:text-black cursor-pointer transition-all flex items-center justify-center text-zinc-400 shadow-lg hover:shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                {/* Instagram SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-brand-gold hover:text-black cursor-pointer transition-all flex items-center justify-center text-zinc-400 shadow-lg hover:shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                {/* Facebook SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-brand-gold hover:text-black cursor-pointer transition-all flex items-center justify-center text-zinc-400 shadow-lg hover:shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                {/* TikTok SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2 - Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2 drop-shadow-md">Navegación</h4>
            <Link href="#top" className="text-zinc-400 hover:text-brand-gold transition-colors font-bold text-sm tracking-wide">Inicio</Link>
            <Link href="#compra-tickets" className="text-zinc-400 hover:text-brand-gold transition-colors font-bold text-sm tracking-wide">Comprar Stickers</Link>
            <Link href="#premios" className="text-zinc-400 hover:text-brand-gold transition-colors font-bold text-sm tracking-wide">Premios</Link>
            <Link href="#como-funciona" className="text-zinc-400 hover:text-brand-gold transition-colors font-bold text-sm tracking-wide">Cómo Funciona</Link>
            <Link href="#stickers" className="text-zinc-400 hover:text-brand-gold transition-colors font-bold text-sm tracking-wide">Stickers</Link>
          </div>

          {/* Col 3 - Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2 drop-shadow-md">Información Legal</h4>
            <Link href="#" className="text-zinc-400 hover:text-brand-gold transition-colors font-bold text-sm tracking-wide">Bases del Sorteo</Link>
            <Link href="#" className="text-zinc-400 hover:text-brand-gold transition-colors font-bold text-sm tracking-wide">Términos y Condiciones</Link>
            <Link href="#" className="text-zinc-400 hover:text-brand-gold transition-colors font-bold text-sm tracking-wide">Política de Privacidad</Link>
          </div>

          {/* Col 4 - Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2 drop-shadow-md">Soporte VIP</h4>
            <a href="mailto:contacto@rifasdelcapibara.cl" className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors font-bold text-sm">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-gold group-hover:text-black group-hover:border-brand-gold transition-all flex items-center justify-center">
                <Mail size={14} />
              </div>
              contacto@rifasdelcapibara.cl
            </a>
            <a href="#" className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors font-bold text-sm">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-gold group-hover:text-black group-hover:border-brand-gold transition-all flex items-center justify-center">
                <Phone size={14} />
              </div>
              +56 9 1234 5678
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase text-center md:text-left">
            © {new Date().getFullYear()} LAS RIFAS DEL CAPIBARA. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <p className="text-zinc-600 text-[10px] font-bold tracking-widest uppercase text-center flex items-center justify-center gap-1">
            Desarrollado con <Zap size={10} className="text-brand-gold fill-brand-gold" /> por <a href="https://www.srweb.cl" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">SRweb</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
