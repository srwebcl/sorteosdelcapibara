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
    { x: '10vw', initialY: 100, scale: 0.8, speed: -0.15, blur: 'blur-[2px]' },
    { x: '85vw', initialY: 300, scale: 1.2, speed: -0.35, blur: 'blur-[5px]' },
    { x: '5vw', initialY: 700, scale: 0.5, speed: -0.1, blur: 'blur-[1px]' },
    { x: '90vw', initialY: 850, scale: 0.9, speed: -0.25, blur: 'blur-[3px]' },
    { x: '15vw', initialY: 1300, scale: 1.5, speed: -0.45, blur: 'blur-[8px]' },
    { x: '82vw', initialY: 1600, scale: 0.6, speed: -0.12, blur: 'blur-[1px]' },
    { x: '22vw', initialY: 2000, scale: 1.1, speed: -0.28, blur: 'blur-[4px]' },
    { x: '78vw', initialY: 2400, scale: 0.7, speed: -0.18, blur: 'blur-[2px]' },
    { x: '8vw', initialY: 2800, scale: 1.3, speed: -0.4, blur: 'blur-[6px]' },
    { x: '88vw', initialY: 3200, scale: 0.85, speed: -0.2, blur: 'blur-[3px]' },
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
      className={`w-20 h-20 flex items-center justify-center ${coin.blur} drop-shadow-[0_15px_25px_rgba(251,191,36,0.3)]`}
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
          <filter id="inner-shadow">
            <feOffset dx="0" dy="2"/>
            <feGaussianBlur stdDeviation="2" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood floodColor="black" floodOpacity="0.7" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>
        </defs>
        
        {/* Borde Exterior (Outer Rim) */}
        <circle cx="50" cy="50" r="48" fill="url(#gold-base)" />
        <circle cx="50" cy="50" r="47" fill="none" stroke="#fef08a" strokeWidth="1" opacity="0.6" />
        
        {/* Relieve estriado (Ribbed edge) */}
        <circle cx="50" cy="50" r="44" fill="none" stroke="#713f12" strokeWidth="4" strokeDasharray="3 4" opacity="0.5" />
        
        {/* Centro de la moneda (Inner face) */}
        <circle cx="50" cy="50" r="38" fill="url(#gold-inner)" filter="url(#inner-shadow)" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#fef08a" strokeWidth="0.5" opacity="0.4" />
        
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
