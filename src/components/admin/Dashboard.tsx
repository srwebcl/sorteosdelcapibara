"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-16 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 uppercase tracking-tighter bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            Centro de Comando VIP
          </h1>
          <p className="text-xl text-zinc-400 font-medium">Las Rifas del Capibara - Panel de Control</p>
        </motion.div>
        
        {/* Estadísticas Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-yellow-500/0 via-yellow-400 to-yellow-500/0 opacity-50" />
            <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Rifas Activas</h3>
            <p className="text-6xl font-black text-white">3</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-yellow-500/0 via-yellow-400 to-yellow-500/0 opacity-50" />
            <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Tickets Vendidos</h3>
            <p className="text-6xl font-black text-white">14.285</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-green-500/0 via-green-400 to-green-500/0 opacity-50" />
            <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Ingresos Totales</h3>
            <p className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">$12.450.000</p>
          </motion.div>
        </div>

        {/* Botones de Acción Rápida */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/collections/raffles/create">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-yellow-400 to-amber-600 rounded-3xl p-10 flex items-center justify-center text-center cursor-pointer shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_50px_rgba(251,191,36,0.5)] transition-shadow border border-yellow-300/50"
            >
              <h2 className="text-3xl font-black uppercase text-black drop-shadow-sm">➕ Crear Nueva Rifa</h2>
            </motion.div>
          </Link>
          
          <Link href="/admin/collections/orders">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 rounded-3xl p-10 flex items-center justify-center text-center cursor-pointer shadow-2xl transition-all"
            >
              <h2 className="text-3xl font-black uppercase text-white">👀 Ver Órdenes Flow</h2>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}
