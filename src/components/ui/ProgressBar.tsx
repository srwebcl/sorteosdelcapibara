"use client"
import { motion } from 'framer-motion'

interface ProgressBarProps {
  total: number
  sold: number
}

export default function ProgressBar({ total, sold }: ProgressBarProps) {
  const percentage = Math.min((sold / total) * 100, 100)
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2 text-zinc-300 font-bold uppercase tracking-wider">
        <span>Stickers Vendidos: {sold} / {total}</span>
        <span className="text-brand-gold">{Math.round(percentage)}%</span>
      </div>
      <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          className="h-full bg-brand-gold rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
