"use client"

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function FloatingCoins() {
  const { scrollY } = useScroll()
  const [mounted, setMounted] = useState(false)

  // Use springs to smooth out the scroll (Parallax effect)
  const smoothY = useSpring(scrollY, { damping: 20, mass: 0.5, stiffness: 50 })
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Deterministic array to avoid hydration mismatch
  const coins = [
    { x: '10vw', initialY: 100, scale: 0.8, speed: -0.15, hideOnMobile: false },
    { x: '85vw', initialY: 300, scale: 1.2, speed: -0.35, hideOnMobile: false },
    { x: '5vw', initialY: 700, scale: 0.5, speed: -0.1, hideOnMobile: true },
    { x: '90vw', initialY: 850, scale: 0.9, speed: -0.25, hideOnMobile: true },
    { x: '15vw', initialY: 1300, scale: 1.5, speed: -0.45, hideOnMobile: false },
    { x: '82vw', initialY: 1600, scale: 0.6, speed: -0.12, hideOnMobile: true },
    { x: '22vw', initialY: 2000, scale: 1.1, speed: -0.28, hideOnMobile: false },
    { x: '78vw', initialY: 2400, scale: 0.7, speed: -0.18, hideOnMobile: true },
    { x: '8vw', initialY: 2800, scale: 1.3, speed: -0.4, hideOnMobile: false },
    { x: '88vw', initialY: 3200, scale: 0.85, speed: -0.2, hideOnMobile: true },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {coins.map((coin, i) => {
        return <Coin key={i} coin={coin} scrollY={smoothY} />
      })}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Coin({ coin, scrollY }: { coin: any, scrollY: any }) {
  // Parallax transform based on scroll
  const y = useTransform(scrollY, [0, 1000], [coin.initialY, coin.initialY + (1000 * coin.speed)])
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: coin.x,
        y,
        scale: coin.scale,
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 0.85,
        rotate: [0, 10, -10, 0],
        rotateX: [0, 20, -15, 0],
        rotateY: [0, -25, 20, 0],
      }}
      transition={{
        opacity: { duration: 1.5 },
        rotate: { duration: 15 + (coin.scale * 10), repeat: Infinity, ease: 'easeInOut' },
        rotateX: { duration: 12 + (coin.scale * 10), repeat: Infinity, ease: 'easeInOut' },
        rotateY: { duration: 18 + (coin.scale * 10), repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`w-20 h-20 flex items-center justify-center ${coin.hideOnMobile ? 'hidden md:flex' : 'flex'} will-change-transform shadow-[0_10px_20px_rgba(251,191,36,0.2)] rounded-full`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="gold-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="gold-inner" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Borde Exterior (Outer Rim) */}
        <circle cx="50" cy="50" r="48" fill="url(#gold-base)" />
        <circle cx="50" cy="50" r="47" fill="none" stroke="#fef08a" strokeWidth="1" opacity="0.6" />
        
        {/* Capa de Brillo Simple (En vez de filter feGaussianBlur) */}
        <circle cx="50" cy="50" r="48" fill="url(#shine)" />
        
        {/* Interior de la Moneda */}
        <circle cx="50" cy="50" r="38" fill="url(#gold-inner)" />
        
        {/* Borde Interno Decorativo */}
        <circle cx="50" cy="50" r="36" fill="none" stroke="#fef08a" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />
        
        {/* Símbolo Central ($ o C) */}
        <text 
          x="50" 
          y="68" 
          fontFamily="Georgia, serif" 
          fontSize="48" 
          fontWeight="900" 
          fill="#fef08a" 
          textAnchor="middle" 
          style={{ textShadow: "0px 3px 5px rgba(0,0,0,0.6)" }}
        >
          $
        </text>

        {/* Destello de luz superior izquierda */}
        <circle cx="50" cy="50" r="48" fill="url(#shine)" />
        <ellipse cx="30" cy="25" rx="15" ry="6" fill="#ffffff" opacity="0.4" transform="rotate(-45 30 25)" filter="blur(1px)" />
      </svg>
    </motion.div>
  )
}
