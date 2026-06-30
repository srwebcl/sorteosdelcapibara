import React from 'react'
import { Shield, CreditCard, Bell, Key, Save } from 'lucide-react'

export default function ConfiguracionPage() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider text-white">Configuración Global</h1>
        <p className="text-zinc-400 font-medium mt-1">Ajustes del sistema y credenciales de pasarelas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Menú Lateral Configuración */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <button className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-bold transition-all">
            <CreditCard size={20} />
            Pasarela Flow
          </button>
          <button className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-semibold">
            <Shield size={20} />
            Seguridad API
          </button>
          <button className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-semibold">
            <Bell size={20} />
            Notificaciones Correo
          </button>
        </div>

        {/* Panel de Edición */}
        <div className="md:col-span-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                <CreditCard className="text-brand-gold" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Pasarela Flow.cl</h2>
                <p className="text-sm text-zinc-400 mt-1">Credenciales para procesar pagos y webhooks.</p>
              </div>
            </div>

            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Flow API Key</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input 
                    type="password" 
                    defaultValue="fkj32hf8923hf98h23f9823hf"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-brand-gold transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Flow Secret Key</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input 
                    type="password" 
                    defaultValue="secret1234567890"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-brand-gold transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Entorno de Pagos</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none font-bold">
                  <option value="sandbox">Sandbox (Pruebas)</option>
                  <option value="production">Producción (Live)</option>
                </select>
              </div>

              <div className="mt-4 pt-6 border-t border-white/10 flex justify-end">
                <button type="button" className="bg-brand-gold text-brand-dark font-black px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
                  <Save size={20} />
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
