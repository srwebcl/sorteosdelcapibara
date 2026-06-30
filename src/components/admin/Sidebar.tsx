"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Ticket, ShoppingCart, Settings } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Rifas', href: '/admin/rifas', icon: Ticket },
    { name: 'Órdenes', href: '/admin/ordenes', icon: ShoppingCart },
    { name: 'Configuración', href: '/admin/configuracion', icon: Settings },
  ]

  return (
    <aside className="w-full md:w-72 bg-brand-surface border-r border-white/10 md:min-h-screen flex flex-col flex-shrink-0">
      <div className="p-8 border-b border-white/10">
        <h2 className="text-xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-600">
          Capibara VIP
        </h2>
        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mt-1">Bespoke Admin</p>
      </div>
      
      <nav className="flex-1 p-6 flex flex-col gap-2">
        {navItems.map((item) => {
          // Check if active. Explicit match for /admin, prefix match for others
          const isActive = item.href === '/admin' 
            ? pathname === '/admin' 
            : pathname.startsWith(item.href)

          const Icon = item.icon

          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive 
                  ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20 shadow-[0_0_15px_rgba(251,191,36,0.1)]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-6 border-t border-white/10">
        <Link href="/cms" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all text-sm font-bold w-full">
          CMS Nativo (Respaldo)
        </Link>
      </div>
    </aside>
  )
}
