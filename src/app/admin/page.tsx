import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DollarSign, Ticket as TicketIcon, TrendingUp, MoreHorizontal, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default async function CustomAdminDashboard() {
  const payload = await getPayload({ config })

  // 1. Fetch active raffles
  const { docs: activeRaffles } = await payload.find({
    collection: 'raffles',
    where: { status: { equals: 'Activa' } },
  })

  // 2. Fetch paid orders for revenue
  const { docs: paidOrders } = await payload.find({
    collection: 'orders',
    where: { payment_status: { equals: 'paid' } },
    limit: 10000, // For a real app, use aggregation or pagination
  })

  // 3. Fetch recent orders for the table
  const { docs: recentOrders } = await payload.find({
    collection: 'orders',
    sort: '-createdAt',
    limit: 5,
  })

  const totalRevenue = paidOrders.reduce((acc, order) => acc + (order.total_amount || 0), 0)
  const totalTicketsSold = activeRaffles.reduce((acc, raffle) => acc + (raffle.last_ticket_issued || 0), 0)

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <header>
        <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter bg-gradient-to-r from-brand-gold to-yellow-600 bg-clip-text text-transparent">
          Centro de Comando VIP
        </h1>
        <p className="text-zinc-400 text-lg font-medium">Bespoke Architecture Overview</p>
      </header>

      {/* Tarjetas de Resumen (Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
            <DollarSign size={80} className="text-brand-gold blur-sm" />
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
              <DollarSign size={24} className="text-brand-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">Ingresos Totales</p>
              <p className="text-4xl font-black text-white">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(totalRevenue)}
              </p>
            </div>
            <div className="text-xs font-bold text-green-400 flex items-center gap-1">
              <TrendingUp size={14} /> +0% vs mes anterior
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
            <TicketIcon size={80} className="text-brand-gold blur-sm" />
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
              <TicketIcon size={24} className="text-brand-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">Tickets Vendidos (Rifas Activas)</p>
              <p className="text-4xl font-black text-white">
                {new Intl.NumberFormat('es-CL').format(totalTicketsSold)}
              </p>
            </div>
            <div className="text-xs font-bold text-green-400 flex items-center gap-1">
              <TrendingUp size={14} /> {activeRaffles.length} rifas activas
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black uppercase text-white mb-2">Acciones Rápidas</h3>
            <p className="text-sm text-zinc-400 font-medium mb-6">Gestiona el sistema desde aquí.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/admin/rifas/crear">
              <button className="w-full bg-brand-gold text-brand-dark font-black px-4 py-3 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
                Lanzar Rifa <ArrowUpRight size={18} />
              </button>
            </Link>
            <button className="w-full bg-white/5 text-white font-black px-4 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2 uppercase tracking-wide">
              Exportar Data
            </button>
          </div>
        </div>
      </section>

      {/* Tabla de Últimas Órdenes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black uppercase tracking-wider text-white">Últimas Órdenes</h2>
          <Link href="/admin/ordenes" className="text-brand-gold font-bold hover:underline text-sm uppercase">Ver Todo</Link>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">ID Orden</th>
                  <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">Cliente</th>
                  <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">RUT</th>
                  <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">Monto</th>
                  <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">Estado</th>
                  <th className="p-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-5 font-medium text-white whitespace-nowrap">{order.id}</td>
                      <td className="p-5 font-bold text-zinc-300 whitespace-nowrap">{order.name}</td>
                      <td className="p-5 text-sm text-zinc-400 whitespace-nowrap">{order.rut}</td>
                      <td className="p-5 font-black text-brand-gold whitespace-nowrap">
                        {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(order.total_amount)}
                      </td>
                      <td className="p-5 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                          order.payment_status === 'paid' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          order.payment_status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="p-5 text-right whitespace-nowrap">
                        <button className="text-zinc-500 hover:text-white transition-colors">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-zinc-500 font-medium">
                      Aún no hay órdenes de compra.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
