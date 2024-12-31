'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PuzzlePiece {
  id: number
  currentPosition: number
  correctPosition: number
}

type Difficulty = 'easy' | 'medium' | 'hard'

const GRID_SIZES = {
  easy: 4,
  medium: 5,
  hard: 6
}

const COMPLETION_MESSAGES = {
  easy: [
    "Sweet start, my love! ❤️ Ready for a bigger challenge?",
    "You make even simple puzzles look lovely! 🌸",
    "Perfect solve! Want to try medium next? 💝"
  ],
  medium: [
    "You're getting better at solving our love puzzles! 💕",
    "Your dedication makes my heart flutter! 🦋",
    "Amazing work! Ready for the hardest challenge? ✨"
  ],
  hard: [
    "You're absolutely incredible! Your persistence is why I love you! 💖",
    "Nothing can stop our love, just like nothing stopped you from solving this! 🌟",
    "You're the missing piece to my puzzle, and you just proved it! 💑"
  ]
}

const IMAGE_SIZE = 400

export default function JigsawPuzzle() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completionMessage, setCompletionMessage] = useState('')

  const gridSize = GRID_SIZES[difficulty]
  const totalPieces = gridSize * gridSize

  const initializePuzzle = (newDifficulty?: Difficulty) => {
    if (newDifficulty) {
      setDifficulty(newDifficulty)
    }
    
    const size = newDifficulty ? GRID_SIZES[newDifficulty] : gridSize
    const total = size * size
    
    const newPieces: PuzzlePiece[] = Array.from({ length: total }, (_, index) => ({
      id: index,
      currentPosition: index,
      correctPosition: index
    }))

    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = newPieces[i].currentPosition
      newPieces[i].currentPosition = newPieces[j].currentPosition
      newPieces[j].currentPosition = temp
    }

    setPieces(newPieces)
    setSelectedPiece(null)
    setCompleted(false)
    setTimer(0)
    setIsPlaying(true)
    setCompletionMessage('')
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const handlePieceClick = (index: number) => {
    if (!isPlaying) return

    if (selectedPiece === null) {
      setSelectedPiece(index)
    } else {
      // Swap pieces
      const newPieces = [...pieces]
      const temp = newPieces[index].currentPosition
      newPieces[index].currentPosition = newPieces[selectedPiece].currentPosition
      newPieces[selectedPiece].currentPosition = temp
      setPieces(newPieces)
      setSelectedPiece(null)

      // Check if puzzle is completed
      const isCompleted = newPieces.every(piece => piece.currentPosition === piece.correctPosition)
      if (isCompleted) {
        setCompleted(true)
        setIsPlaying(false)
        const messages = COMPLETION_MESSAGES[difficulty]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        setCompletionMessage(randomMessage)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getPieceStyle = (currentPos: number) => {
    const row = Math.floor(currentPos / gridSize)
    const col = currentPos % gridSize
    const pieceSize = IMAGE_SIZE / gridSize
    
    return {
      width: pieceSize,
      height: pieceSize,
      backgroundImage: "url('/love-puzzle.jpg')",
      backgroundSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
      backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-red-800">Solve Our Love Puzzle</h2>
      
      <div className="flex gap-4 mb-4">
        {(['easy', 'medium', 'hard'] as const).map((level) => (
          <button
            key={level}
            onClick={() => initializePuzzle(level)}
            className={`px-4 py-2 rounded-full transition-colors ${
              difficulty === level && isPlaying
                ? 'bg-pink-600 text-white'
                : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-lg font-medium">Time: {formatTime(timer)}</div>

      <div 
        className="grid gap-0.5 bg-white p-4 rounded-xl shadow-lg"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: IMAGE_SIZE + 32,
          height: IMAGE_SIZE + 32
        }}
      >
        {pieces.map((piece, index) => (
          <motion.div
            key={piece.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedPiece === index ? 'ring-2 ring-pink-500' : ''
            }`}
            style={getPieceStyle(piece.currentPosition)}
            onClick={() => handlePieceClick(index)}
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>

      <p className="text-gray-600">Click two pieces to swap them</p>

      {completed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-pink-600 text-center"
        >
          {completionMessage}
          <br />
          <span className="text-lg text-pink-500">
            Time: {formatTime(timer)} 🕒
          </span>
        </motion.div>
      )}
    </div>
  )
}
