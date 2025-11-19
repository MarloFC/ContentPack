'use client'

import { Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">ContentPack SaaS</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/history')}
            >
              Histórico
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/api/auth/signout')}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
