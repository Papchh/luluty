'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Position {
  x: number
  y: number
}

type Difficulty = 'easy' | 'medium' | 'hard'

const MAZE_SIZES = {
  easy: 10,
  medium: 15,
  hard: 20
}

const COMPLETION_MESSAGES = {
  easy: [
    "You found your way to my heart! ❤️",
    "Love guided you perfectly! 💕",
    "Sweet navigation, my love! 🌸"
  ],
  medium: [
    "Our love conquers all mazes! 💝",
    "You're amazing at finding love paths! 🦋",
    "Your heart knows the way! ✨"
  ],
  hard: [
    "Nothing can keep us apart, you proved it! 💖",
    "Your love compass is extraordinary! 🌟",
    "Through the hardest paths, you still find me! 💑"
  ]
}

export default function MazeGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [maze, setMaze] = useState<string[][]>([])
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 1, y: 1 })
  const [completed, setCompleted] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completionMessage, setCompletionMessage] = useState('')

  const mazeSize = MAZE_SIZES[difficulty]

  const generateMaze = (newDifficulty?: Difficulty) => {
    if (newDifficulty) {
      setDifficulty(newDifficulty)
    }
    
    const size = newDifficulty ? MAZE_SIZES[newDifficulty] : mazeSize
    
    // Initialize maze with walls
    const newMaze = Array(size).fill(null).map(() => Array(size).fill('#'))
    const stack: Position[] = []
    const start: Position = { x: 1, y: 1 }

    // Mark start position as path
    newMaze[start.y][start.x] = ' '
    stack.push(start)

    // Recursive backtracking to generate maze
    while (stack.length > 0) {
      const current = stack[stack.length - 1]
      const neighbors = [
        { x: current.x, y: current.y - 2 }, // up
        { x: current.x + 2, y: current.y }, // right
        { x: current.x, y: current.y + 2 }, // down
        { x: current.x - 2, y: current.y }  // left
      ].filter(pos => 
        pos.x > 0 && pos.x < size - 1 && 
        pos.y > 0 && pos.y < size - 1 && 
        newMaze[pos.y][pos.x] === '#'
      )

      if (neighbors.length > 0) {
        // Randomly choose next cell
        const next = neighbors[Math.floor(Math.random() * neighbors.length)]
        newMaze[next.y][next.x] = ' '
        // Create path between cells
        newMaze[current.y + (next.y - current.y) / 2][current.x + (next.x - current.x) / 2] = ' '
        stack.push(next)
      } else {
        stack.pop()
      }
    }

    // Set start and end points
    newMaze[1][1] = 'S'
    
    // Place end point in the opposite corner area
    let endX = size - 2
    let endY = size - 2
    
    // Make sure there's a path to the end
    if (newMaze[endY][endX] === '#') {
      // Find nearest accessible position
      for (let d = 1; d < 3; d++) {
        const positions = [
          { x: endX - d, y: endY },
          { x: endX, y: endY - d },
          { x: endX - d, y: endY - d }
        ]
        
        for (const pos of positions) {
          if (newMaze[pos.y][pos.x] === ' ') {
            endX = pos.x
            endY = pos.y
            break
          }
        }
        if (newMaze[endY][endX] === ' ') break
      }
    }
    newMaze[endY][endX] = 'E'

    setMaze(newMaze)
    setPlayerPosition({ x: 1, y: 1 })
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return

      const moves = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }
      }

      const move = moves[e.key as keyof typeof moves]
      if (!move) return

      setPlayerPosition(prev => {
        const newPos = {
          x: prev.x + move.x,
          y: prev.y + move.y
        }

        // Check if move is valid
        if (
          newPos.x >= 0 && newPos.x < mazeSize &&
          newPos.y >= 0 && newPos.y < mazeSize &&
          maze[newPos.y][newPos.x] !== '#'
        ) {
          // Check if reached end
          if (maze[newPos.y][newPos.x] === 'E') {
            setCompleted(true)
            setIsPlaying(false)
            const messages = COMPLETION_MESSAGES[difficulty]
            const randomMessage = messages[Math.floor(Math.random() * messages.length)]
            setCompletionMessage(randomMessage)
          }
          return newPos
        }
        return prev
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [maze, isPlaying, difficulty, mazeSize])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-red-800">Navigate Our Love Maze</h2>
      
      <div className="flex gap-4 mb-4">
        {(['easy', 'medium', 'hard'] as const).map((level) => (
          <button
            key={level}
            onClick={() => generateMaze(level)}
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

      <div className="bg-white p-4 rounded-xl shadow-lg">
        {maze.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <motion.div
                key={`${x}-${y}`}
                className={`w-8 h-8 flex items-center justify-center border border-pink-100 ${
                  cell === '#' ? 'bg-pink-900' :
                  cell === 'E' ? 'bg-green-500' :
                  cell === 'S' ? 'bg-pink-500' :
                  'bg-white'
                }`}
                animate={{
                  scale: playerPosition.x === x && playerPosition.y === y ? 1.1 : 1
                }}
              >
                {playerPosition.x === x && playerPosition.y === y && '❤️'}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <p className="text-gray-600">Use arrow keys to move</p>

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
