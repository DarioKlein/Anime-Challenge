import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

interface DateType {
  id: number
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  try {
    if (id) {
      const anime = await prisma.anime.findUnique({
        where: { id: Number(id) },
      })

      if (!anime) {
        return NextResponse.json({ message: 'Anime não encontrado' }, { status: 404 })
      }

      return NextResponse.json(anime, { status: 200 })
    }

    if (name) {
      const anime = await prisma.anime.findFirst({
        where: { 
          name: {
            contains: name
          }
        },
      })

      if (!anime) {
        return NextResponse.json({ message: 'Anime não encontrado' }, { status: 404 })
      }

      return NextResponse.json(anime, { status: 200 })
    }

    const animes = await prisma.anime.findMany()
    return NextResponse.json(animes, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar os animes:', error)
    return NextResponse.json({ message: 'Erro ao buscar anime' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const data: DateType = await request.json()
  const { id, name, imageUrl, genre, releaseDate, episodes, studio, popularity } = data

  if (!id) {
    NextResponse.json({ message: 'Id é obrigatório para atualizar' }, { status: 400 })
  }

  try {
    const animeExist = await prisma.anime.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!animeExist) {
      NextResponse.json({ message: 'Anime não encontrado' }, { status: 404 })
    }

    const updateData: Partial<Omit<DateType, 'id'>> = {}

    if (name) updateData.name = name
    if (imageUrl) updateData.imageUrl = imageUrl
    if (genre) updateData.genre = genre
    if (releaseDate) updateData.releaseDate = releaseDate
    if (episodes) updateData.episodes = episodes
    if (studio) updateData.studio = studio
    if (popularity) updateData.popularity = popularity

    const updateAnime = await prisma.anime.update({
      where: { id: Number(id) },
      data: updateData,
    })

    return NextResponse.json(updateAnime, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar o anime: ', error)
    return NextResponse.json({ message: 'Erro ao atualizar o anime' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    NextResponse.json({ message: 'Id é obrigatório para deletar' }, { status: 400 })
  }

  try {
    const animeExist = await prisma.anime.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!animeExist) {
      return NextResponse.json({ message: 'Anime não encontrado' }, { status: 404 })
    }

    await prisma.anime.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ message: 'Anime deletado com sucesso' }, { status: 200 })
  } catch (error) {
    console.error('Erro ao deletar anime:', error)
    return NextResponse.json({ message: 'Erro ao deletar o anime' }, { status: 500 })
  }
}
