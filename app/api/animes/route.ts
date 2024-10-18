import { NextResponse } from 'next/server'

interface DateType {
  name: string
  image: string
  genre: string
  releaseDate: number
  episodes: number
  studio: string
  popularity: string
}

export async function POST(request: Request) {
  const data: DateType = await request.json()
  const { name, image, genre, releaseDate, episodes, studio, popularity } = data

  if (!name || !image || !genre || !releaseDate || !episodes || !studio || !popularity) {
    return NextResponse.json({ message: 'Deu erro' }, { status: 400 })
  }

  return NextResponse.json({ message: data }, { status: 201 })
}

export async function GET() {}

export async function PUT() {}

export async function DELETE() {}
