import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

interface DateType {
  name: string
  imageUrl: string
  genre: string
  releaseDate: number
  episodes: number
  studio: string
  popularity: string
}

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const data: DateType = await request.json()
  const { name, imageUrl, genre, releaseDate, episodes, studio, popularity } = data

  if (!name || !imageUrl || !genre || !releaseDate || !episodes || !studio || !popularity) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 })
  }

  const animeExists = await prisma.anime.findFirst({
    where: {
      name,
    },
    select: {
      name: true,
    },
  })

  if (animeExists) {
    return NextResponse.json({ message: 'O anime já foi cadastrado' }, { status: 400 })
  }

  try {
    const newAnime = await prisma.anime.create({
      data: {
        name,
        genre,
        episodes,
        imageUrl,
        popularity,
        releaseDate,
        studio,
      },
    })

    return NextResponse.json(newAnime, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar anime:', error)
    return NextResponse.json({ message: 'Erro ao cadastrar o anime' }, { status: 500 })
  }
}

export async function GET() {}

export async function PUT() {}

export async function DELETE() {}
