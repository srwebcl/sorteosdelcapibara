import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Search, Download, MoreHorizontal, CheckCircle2, Clock, XCircle } from 'lucide-react'

export default async function OrdenesPage() {
  const payload = await getPayload({ config })
  
  const { docs: orders } = await payload.find({
    collection: 'orders',
    sort: '-createdAt',
  })

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">Órdenes de Compra</h1>
          <p className="text-zinc-400 font-medium mt-1">Supervisa todas las transacciones de Flow.cl</p>
        </div>
        <button className="bg-white/5 text-white border border-white/10 font-black px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
          <Download size={20} />
          Exportar CSV
        </button>
      </div>

      {/* Controles de Tabla */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por ID, RUT o Nombre..." 
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-brand-gold transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 text-brand-gold px-4 py-2 rounded-xl font-bold text-sm">
            Todas
          </button>
          <button className="flex items-center gap-2 bg-black/20 border border-white/10 text-zinc-400 hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors">
            Pagadas
          </button>
          <button className="flex items-center gap-2 bg-black/20 border border-white/10 text-zinc-400 hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors">
            Pendientes
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">Fecha</th>
                <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">ID Orden</th>
                <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">Cliente / RUT</th>
                <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap text-right">Monto</th>
                <th className="p-5 text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap text-center">Estado</th>
                <th className="p-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-5 text-sm text-zinc-400 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString('es-CL', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-5 font-bold text-white whitespace-nowrap">{order.id}</td>
                  <td className="p-5 whitespace-nowrap">
                    <p className="font-bold text-zinc-200">{order.name}</p>
                    <p className="text-xs text-zinc-500 mt-1">{order.rut}</p>
                  </td>
                  <td className="p-5 font-black text-white text-right whitespace-nowrap">
                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(order.total_amount)}
                  </td>
                  <td className="p-5 whitespace-nowrap text-center">
                    {order.payment_status === 'paid' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle2 size={12} /> Pagado
                      </span>
                    )}
                    {order.payment_status === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        <Clock size={12} /> Pendiente
                      </span>
                    )}
                    {order.payment_status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-red-500/10 text-red-400 border-red-500/20">
                        <XCircle size={12} /> Fallido
                      </span>
                    )}
                  </td>
                  <td className="p-5 text-right whitespace-nowrap">
                    <button className="text-zinc-500 hover:text-brand-gold transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-zinc-500 font-medium">
                    Aún no hay órdenes de compra registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
