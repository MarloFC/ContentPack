import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateContentPack } from '@/lib/gemini'
import { prisma } from '@/lib/prisma'

const generateSchema = z.object({
  niche: z.string().min(1, 'Nicho é obrigatório'),
  platform: z.string().min(1, 'Plataforma é obrigatória'),
  style: z.string().min(1, 'Estilo é obrigatório'),
  quantity: z.number().min(1).max(30),
  userId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = generateSchema.parse(body)

    const result = await generateContentPack({
      niche: validatedData.niche,
      platform: validatedData.platform,
      style: validatedData.style,
      quantity: validatedData.quantity,
    })

    if (validatedData.userId) {
      let user = await prisma.user.findUnique({
        where: { id: validatedData.userId },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            id: validatedData.userId,
            email: 'demo@contentpack.com',
            name: 'Demo User',
          },
        })
      }

      await prisma.pack.create({
        data: {
          userId: validatedData.userId,
          params: {
            niche: validatedData.niche,
            platform: validatedData.platform,
            style: validatedData.style,
            quantity: validatedData.quantity,
          },
          result: result,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      )
    }

    console.error('Error generating content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
