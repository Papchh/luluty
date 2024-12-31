'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingObject {
  id: number
  x: number
  type: '❤️' | '🎈'
  delay: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingObject[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: FloatingObject = {
        id: Date.now(),
        x: Math.random() * (window.innerWidth - 40),
        type: Math.random() > 0.5 ? '❤️' : '🎈',
        delay: Math.random() * 2
      }
      setHearts(prev => [...prev, newHeart])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const removeHeart = (id: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== id))
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-auto cursor-pointer select-none"
            style={{ left: heart.x }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{
              y: '-100vh',
              opacity: [0, 1, 1, 0],
              scale: [1, 1.2, 1, 0.8],
              x: heart.x + Math.sin(heart.delay) * 50
            }}
            transition={{
              duration: 10,
              delay: heart.delay,
              ease: 'linear',
              times: [0, 0.2, 0.8, 1]
            }}
            onClick={() => removeHeart(heart.id)}
            onAnimationComplete={() => removeHeart(heart.id)}
          >
            <span className="text-2xl">{heart.type}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

