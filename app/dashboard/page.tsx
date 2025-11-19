'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ContentForm } from './components/ContentForm'
import { GeneratedPack } from './components/GeneratedPack'
import { Loading } from '@/components/Loading'
import type { GeneratedContent, ContentParams } from '@/types/content'

export default function DashboardPage() {
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null)

  const generateMutation = useMutation({
    mutationFn: async (params: ContentParams) => {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          userId: 'demo-user',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      return data.data as GeneratedContent
    },
    onSuccess: (data) => {
      setGeneratedContent(data)
    },
  })

  const handleGenerate = (params: ContentParams) => {
    generateMutation.mutate(params)
  }

  const handleRegenerate = () => {
    if (generatedContent) {
      generateMutation.mutate({
        niche: '',
        platform: '',
        style: '',
        quantity: 5,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ContentForm
              onSubmit={handleGenerate}
              isLoading={generateMutation.isPending}
            />
          </div>

          <div className="lg:col-span-2">
            {generateMutation.isPending && (
              <Loading text="Gerando seu pacote de conteúdo..." />
            )}

            {generateMutation.isError && (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
                <p className="text-sm text-destructive">
                  Erro ao gerar conteúdo. Tente novamente.
                </p>
              </div>
            )}

            {generatedContent && !generateMutation.isPending && (
              <GeneratedPack
                content={generatedContent}
                onRegenerate={handleRegenerate}
                isRegenerating={generateMutation.isPending}
              />
            )}

            {!generatedContent && !generateMutation.isPending && (
              <div className="flex h-96 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">
                  Preencha o formulário para gerar seu pacote de conteúdo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
