'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loading } from '@/components/Loading'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText } from 'lucide-react'
import { PackDetailsDialog } from './components/PackDetailsDialog'

interface Pack {
  id: string
  params: {
    niche: string
    platform: string
    style: string
    quantity: number
  }
  result: {
    calendar: string[]
    posts: Array<{
      title: string
      text: string
      script?: string
      tags: string[]
    }>
    thumbs: string[]
  }
  createdAt: string
}

export default function HistoryPage() {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['packs'],
    queryFn: async () => {
      const response = await fetch('/api/packs?userId=demo-user')
      if (!response.ok) {
        throw new Error('Failed to fetch packs')
      }
      const result = await response.json()
      return result.data as Pack[]
    },
  })

  const handleCardClick = (pack: Pack) => {
    setSelectedPack(pack)
    setDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Loading text="Carregando histórico..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
            <p className="text-sm text-destructive">
              Erro ao carregar histórico. Tente novamente.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Histórico de Pacotes</h1>
          <p className="text-muted-foreground">
            Visualize todos os pacotes de conteúdo que você gerou
          </p>
        </div>

        {!data || data.length === 0 ? (
          <div className="flex h-96 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Nenhum pacote gerado ainda.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((pack) => (
              <Card
                key={pack.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCardClick(pack)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {pack.params.niche}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(pack.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{pack.params.platform}</Badge>
                    <Badge variant="outline">{pack.params.style}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium">{pack.result.posts.length}</span>{' '}
                      posts gerados
                    </p>
                    <p>
                      <span className="font-medium">{pack.result.calendar.length}</span>{' '}
                      dias no calendário
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <PackDetailsDialog
        pack={selectedPack}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
