import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export interface GenerateParams {
  niche: string
  platform: string
  style: string
  quantity: number
}

export interface Post {
  title: string
  text: string
  script?: string
  tags: string[]
}

export interface GeneratedContent {
  calendar: string[]
  posts: Post[]
  thumbs: string[]
}

export async function generateContentPack(
  params: GenerateParams
): Promise<GeneratedContent> {
  const { niche, platform, style, quantity } = params

  const prompt = `Você é um gerador profissional de conteúdo para criadores. Gere um pacote semanal no formato JSON:
{
 "calendar": ["Dia 1: ...", "Dia 2: ..."],
 "posts": [
   { "title": "...", "text": "...", "script": "...", "tags": ["...", "..."] }
 ],
 "thumbs": ["Descrição da miniatura 1", "Descrição 2"]
}

Regras:
- linguagem simples
- títulos chamativos
- scripts curtos
- nada muito longo

PARÂMETROS:
- Nicho: ${niche}
- Plataforma: ${platform}
- Estilo: ${style}
- Quantidade de posts: ${quantity}

Gere exatamente ${quantity} posts para a semana. Retorne APENAS o JSON, sem texto adicional, sem markdown, sem explicações.`

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  })

  const text = response.text
  if (!text) {
    throw new Error('No text returned from Gemini API')
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from response')
  }

  const parsed = JSON.parse(jsonMatch[0]) as GeneratedContent
  return parsed
}
