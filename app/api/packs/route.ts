import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    const packs = await prisma.pack.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json({
      success: true,
      data: packs,
    })
  } catch (error) {
    console.error('Error fetching packs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packs' },
      { status: 500 }
    )
  }
}
