'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ContentFormProps {
  onSubmit: (data: {
    niche: string
    platform: string
    style: string
    quantity: number
  }) => void
  isLoading?: boolean
}

const NICHES = [
  'Marketing Digital',
  'Fitness',
  'Finanças',
  'Tecnologia',
  'Culinária',
  'Moda',
  'Saúde',
  'Educação',
  'Games',
  'Viagens',
]

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn']

const STYLES = [
  'Carrossel',
  'Vídeo Curto',
  'Post Escrito',
  'Story',
  'Reels',
  'Thread',
]

export function ContentForm({ onSubmit, isLoading }: ContentFormProps) {
  const [niche, setNiche] = useState('')
  const [platform, setPlatform] = useState('')
  const [style, setStyle] = useState('')
  const [quantity, setQuantity] = useState([5])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!niche || !platform || !style) return

    onSubmit({
      niche,
      platform,
      style,
      quantity: quantity[0],
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerar Pacote de Conteúdo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="niche">Nicho</Label>
            <Select value={niche} onValueChange={setNiche}>
              <SelectTrigger id="niche">
                <SelectValue placeholder="Selecione seu nicho" />
              </SelectTrigger>
              <SelectContent>
                {NICHES.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Plataforma</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="Selecione a plataforma" />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Estilo de Conteúdo</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style">
                <SelectValue placeholder="Selecione o estilo" />
              </SelectTrigger>
              <SelectContent>
                {STYLES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">
              Quantidade Semanal: {quantity[0]}
            </Label>
            <Slider
              id="quantity"
              min={1}
              max={14}
              step={1}
              value={quantity}
              onValueChange={setQuantity}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!niche || !platform || !style || isLoading}
          >
            {isLoading ? 'Gerando...' : 'Gerar Conteúdo'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
