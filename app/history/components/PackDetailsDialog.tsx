'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

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

interface PackDetailsDialogProps {
  pack: Pack | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PackDetailsDialog({
  pack,
  open,
  onOpenChange,
}: PackDetailsDialogProps) {
  if (!pack) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <div className="px-6 pt-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl">{pack.params.niche}</DialogTitle>
            <DialogDescription>
              Gerado em{' '}
              {new Date(pack.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </DialogDescription>
            <div className="flex gap-2 pt-2">
              <Badge variant="secondary">{pack.params.platform}</Badge>
              <Badge variant="outline">{pack.params.style}</Badge>
            </div>
          </DialogHeader>
        </div>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6">
            {/* Calendário */}
            {pack.result.calendar && pack.result.calendar.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Calendário Semanal
                </h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {pack.result.calendar.map((day, index) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium text-primary">
                            Dia {index + 1}:
                          </span>{' '}
                          {day}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            <Separator />

            {/* Posts */}
            {pack.result.posts && pack.result.posts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Posts Gerados</h3>
                <div className="space-y-4">
                  {pack.result.posts.map((post, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center justify-between">
                          <span>Post {index + 1}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">
                            Título:
                          </h4>
                          <p className="text-sm">{post.title}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">
                            Texto:
                          </h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {post.text}
                          </p>
                        </div>

                        {post.script && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2">
                              Script:
                            </h4>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {post.script}
                            </p>
                          </div>
                        )}

                        {post.tags && post.tags.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2">
                              Tags:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Miniaturas */}
            {pack.result.thumbs && pack.result.thumbs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Ideias de Miniaturas
                </h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {pack.result.thumbs.map((thumb, index) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium text-primary">
                            {index + 1}.
                          </span>{' '}
                          {thumb}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
