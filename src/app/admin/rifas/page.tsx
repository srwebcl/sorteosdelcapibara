import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Plus, MoreVertical } from 'lucide-react'
import Link from 'next/link'

export default async function RifasPage() {
  const payload = await getPayload({ config })

  const { docs: raffles } = await payload.find({
    collection: 'raffles',
    sort: '-createdAt',
  })

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">Gestión de Rifas</h1>
          <p className="text-zinc-400 font-medium mt-1">Crea, edita y supervisa tus sorteos activos.</p>
        </div>
        <Link href="/admin/rifas/crear">
          <button className="bg-brand-gold text-brand-dark font-black px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
            <Plus size={20} />
            Crear Nueva Rifa
          </button>
        </Link>
      </div>

      {/* Grid de Rifas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {raffles.map((rifa) => (
          <div key={rifa.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 relative group">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md mb-3 inline-block ${
                  rifa.status === 'Activa' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-400'
                }`}>
                  {rifa.status}
                </span>
                <h3 className="text-xl font-black text-white leading-tight">{rifa.title}</h3>
              </div>
              <Link href={`/admin/rifas/editar/${rifa.id}`}>
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <MoreVertical size={20} />
                </button>
              </Link>
            </div>

            {/* Barra de Progreso */}
            <div>
              <div className="flex justify-between text-xs font-bold text-zinc-400 mb-2">
                <span>{(rifa.last_ticket_issued || 0).toLocaleString()} vendidos</span>
                <span>{(rifa.total_tickets).toLocaleString()} total</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${rifa.status === 'Activa' ? 'bg-brand-gold' : 'bg-zinc-500'}`} 
                  style={{ width: `${Math.min(((rifa.last_ticket_issued || 0) / rifa.total_tickets) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-auto">
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Precio Ticket</p>
                <p className="text-lg font-black text-brand-gold">
                  {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(rifa.ticket_packages?.[0]?.price || 0)}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Fecha Sorteo</p>
                <p className="text-sm font-bold text-white mt-1">
                  {new Date(rifa.draw_date).toLocaleDateString('es-CL', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {raffles.length === 0 && (
          <div className="col-span-full p-12 text-center text-zinc-500 font-medium">
            No hay rifas registradas en la base de datos.
          </div>
        )}
      </div>
    </div>
  )
}
