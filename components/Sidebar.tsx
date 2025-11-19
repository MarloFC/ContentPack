'use client'

import { Home, Package, Settings, History } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'w-64 border-r bg-card p-4 hidden md:block',
        className
      )}
    >
      <nav className="space-y-2">
        <a
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-accent text-accent-foreground"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </a>
        <a
          href="/packs"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          <Package className="h-4 w-4" />
          Meus Pacotes
        </a>
        <a
          href="/history"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          <History className="h-4 w-4" />
          Histórico
        </a>
        <a
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-4 w-4" />
          Configurações
        </a>
      </nav>
    </aside>
  )
}
