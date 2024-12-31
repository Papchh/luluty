'use client'

import { useState } from 'react'
import Link from 'next/link'
import JigsawPuzzle from '../../components/JigsawPuzzle'
import MazeGame from '../../components/MazeGame'
import { ArrowLeft } from 'lucide-react'

export default function GamesPage() {
  const [currentGame, setCurrentGame] = useState<'jigsaw' | 'maze' | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-red-50 p-8">
      <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-800 mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Our Love Story
      </Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-red-800">Our Love Games</h1>
      {!currentGame ? (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => setCurrentGame('jigsaw')}
            className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors duration-300 w-64"
          >
            Play Jigsaw Puzzle
          </button>
          <button
            onClick={() => setCurrentGame('maze')}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition-colors duration-300 w-64"
          >
            Play Maze Game
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setCurrentGame(null)}
            className="mb-4 text-red-600 hover:text-red-800"
          >
            ← Back to game selection
          </button>
          {currentGame === 'jigsaw' ? <JigsawPuzzle /> : <MazeGame />}
        </div>
      )}
    </div>
  )
}
