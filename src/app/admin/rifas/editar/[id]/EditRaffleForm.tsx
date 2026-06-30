"use client"

import React, { useState } from 'react'
import { ArrowLeft, Save, Upload, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { updateRaffleAction } from '@/actions/admin'

type PrizeData = {
  id: string
  name: string
  existing_image_id: string
  existing_image_url: string
  preview: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditRaffleForm({ raffle }: { raffle: any }) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Transform existing prizes into our state structure
  const initialPrizes: PrizeData[] = (raffle.prizes || []).map((p: { name: string, image?: { id?: string, url?: string }, id?: string }, index: number) => ({
    id: p.id || `prize-${index}`,
    name: p.name,
    existing_image_id: p.image?.id || '',
    existing_image_url: p.image?.url || '',
    preview: p.image?.url || null
  }))

  const [prizes, setPrizes] = useState<PrizeData[]>(
    initialPrizes.length > 0 ? initialPrizes : [{ id: 'new', name: '', existing_image_id: '', existing_image_url: '', preview: null }]
  )
  const [heroPreview, setHeroPreview] = useState<string | null>(raffle.hero_image?.url || null)

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHeroPreview(URL.createObjectURL(file))
    }
  }

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const newPrizes = [...prizes]
      newPrizes[index].preview = URL.createObjectURL(file)
      setPrizes(newPrizes)
    }
  }

  const addPrize = () => {
    setPrizes([...prizes, { id: crypto.randomUUID(), name: '', existing_image_id: '', existing_image_url: '', preview: null }])
  }

  const removePrize = (id: string) => {
    if (prizes.length > 1) {
      setPrizes(prizes.filter(p => p.id !== id))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('prizesCount', prizes.length.toString())
    formData.append('existing_hero_image_id', raffle.hero_image?.id || '')
    
    prizes.forEach((p, i) => {
      formData.append(`prize_${i}_existing_image`, p.existing_image_id)
    })

    const updateWithId = updateRaffleAction.bind(null, raffle.id)
    const result = await updateWithId(formData)
    
    if (result && !result.success) {
      setError(result.error)
      setIsPending(false)
    }
  }

  // Ensure dates are correctly formatted for the input (YYYY-MM-DD)
  const formattedDrawDate = raffle.draw_date ? new Date(raffle.draw_date).toISOString().split('T')[0] : ''

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/rifas" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">Editar Sorteo y Portada</h1>
          <p className="text-zinc-400 font-medium mt-1">Actualiza la campaña, los premios y configura los detalles.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {/* Sección: Hero (Portada) */}
        <div className="bg-white/5 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-gold text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl">Landing Page</div>
          <h2 className="text-xl font-bold uppercase tracking-widest text-brand-gold border-b border-white/10 pb-4">1. Configuración de Portada (Hero)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Título Principal (Gancho)</label>
                <input name="hero_title" type="text" defaultValue={raffle.hero_title} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors font-black text-xl" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Subtítulo (Descripción)</label>
                <textarea name="hero_subtitle" defaultValue={raffle.hero_subtitle} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors h-24 resize-none" required />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Fondo de Pantalla (Background)</label>
              <label className="w-full h-full min-h-[200px] border-2 border-dashed border-white/20 rounded-xl hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group/img">
                {/* Note: not required for edit mode, existing image will be used if empty */}
                <input name="hero_image" type="file" accept="image/*" className="hidden" onChange={handleHeroImageChange} />
                {heroPreview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/img:opacity-30 transition-opacity" />
                    <div className="relative z-10 text-white opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center">
                      <Upload size={24} />
                      <span className="text-sm font-bold mt-2">Cambiar Fondo</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-zinc-500">
                    <Upload size={32} className="mb-3 text-zinc-600" />
                    <span className="text-sm font-bold">Subir Imagen Lujosa</span>
                    <span className="text-[10px] uppercase tracking-wider mt-1">Recomendado: 1920x1080</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Sección: Datos Generales */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4">2. Configuración de Sorteo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Nombre Interno / Rifa</label>
              <input name="title" type="text" defaultValue={raffle.title} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Total Stickers a Vender</label>
              <input name="totalTickets" type="number" min="1" defaultValue={raffle.total_tickets} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors" required />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Fecha del Sorteo</label>
              <input name="drawDate" type="date" defaultValue={formattedDrawDate} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors custom-date-input" required />
            </div>
          </div>
        </div>

        {/* Sección: Premios */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold uppercase tracking-widest text-white">3. Productos / Premios</h2>
            <button type="button" onClick={addPrize} className="flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} /> AÑADIR OTRO PREMIO
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prizes.map((prize, index) => (
              <div key={prize.id} className="bg-black/30 border border-white/5 rounded-xl p-5 flex flex-col gap-4 relative group">
                {prizes.length > 1 && (
                  <button type="button" onClick={() => removePrize(prize.id)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                  </button>
                )}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Premio #{index + 1}</label>
                  <input name={`prize_${index}_name`} type="text" defaultValue={prize.name} placeholder="Ej: PlayStation 5" className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-brand-gold transition-colors" required />
                </div>
                <label className="w-full border-2 border-dashed border-white/10 rounded-xl hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all cursor-pointer flex flex-col items-center justify-center h-32 relative overflow-hidden group/img">
                  {/* Not required if there is a preview (which means we have an existing image or newly selected one) */}
                  <input name={`prize_${index}_image`} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(index, e)} {...(!prize.preview ? { required: true } : {})} />
                  {prize.preview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={prize.preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/img:opacity-30 transition-opacity" />
                      <div className="relative z-10 text-white opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center">
                        <Upload size={18} />
                        <span className="text-xs font-bold mt-1">Cambiar</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-zinc-500">
                      <Upload size={24} className="mb-2 text-zinc-600" />
                      <span className="text-xs font-bold">Subir Foto del Producto</span>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Modelo de Precios (2 Opciones) */}
        <div className="bg-gradient-to-br from-brand-gold/20 to-black border border-brand-gold/50 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/20 pb-4">4. Modelo de Precios (Single vs Combo)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Opción 1: Ticket Único */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-white">1</div>
                <h3 className="text-lg font-black uppercase tracking-wider text-white">Compra Simple</h3>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Precio de 1 Ticket ($)</label>
                <input name="ticket_price" type="number" min="1" defaultValue={raffle.ticket_price} className="w-full bg-black border border-white/20 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-brand-gold text-2xl font-black" required />
              </div>
            </div>

            {/* Opción 2: El Combo (Recomendado) */}
            <div className="bg-brand-gold/10 border-2 border-brand-gold rounded-xl p-6 flex flex-col gap-4 relative">
              <div className="absolute -top-3 right-4 bg-brand-gold text-black text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">El Pack Más Vendido</div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center font-black text-black">2</div>
                <h3 className="text-lg font-black uppercase tracking-wider text-brand-gold">Combo Promocional</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/70">¿Cuántos Tickets?</label>
                  <input name="combo_amount" type="number" min="2" defaultValue={raffle.combo_amount} className="w-full bg-black border border-brand-gold/30 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-brand-gold text-2xl font-black" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/70">Precio Total ($)</label>
                  <input name="combo_price" type="number" min="1" defaultValue={raffle.combo_price} className="w-full bg-black border border-brand-gold/30 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-brand-gold text-2xl font-black" required />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-brand-gold text-brand-dark font-black px-10 py-5 rounded-xl hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50"
          >
            {isPending ? 'Guardando Cambios...' : (
              <>
                <Save size={24} /> Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
