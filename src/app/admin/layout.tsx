import React from 'react'
import '../(frontend)/globals.css'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-brand-dark text-white flex flex-col md:flex-row font-sans selection:bg-brand-gold selection:text-black" suppressHydrationWarning>
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
