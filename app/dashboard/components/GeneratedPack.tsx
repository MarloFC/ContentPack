'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContentCard } from './ContentCard'
import { generatePDF } from '@/lib/utils'
import { Download, RefreshCw } from 'lucide-react'
import type { GeneratedContent } from '@/types/content'

interface GeneratedPackProps {
  content: GeneratedContent
  onRegenerate: () => void
  isRegenerating?: boolean
}

export function GeneratedPack({
  content,
  onRegenerate,
  isRegenerating,
}: GeneratedPackProps) {
  const handleExportPDF = () => {
    generatePDF(content)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pacote Gerado</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onRegenerate}
            disabled={isRegenerating}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {isRegenerating ? 'Regenerando...' : 'Regerar'}
          </Button>
          <Button onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {content.calendar && content.calendar.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Calendário Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {content.calendar.map((day, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium">Dia {index + 1}:</span> {day}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {content.posts && content.posts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Posts Gerados</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.posts.map((post, index) => (
              <ContentCard key={index} post={post} index={index} />
            ))}
          </div>
        </div>
      )}

      {content.thumbs && content.thumbs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ideias de Miniaturas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {content.thumbs.map((thumb, index) => (
                <li key={index} className="text-sm">
                  {index + 1}. {thumb}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
