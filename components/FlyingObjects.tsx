'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

type FlyingObject = {
  id: number
  type: 'balloon' | 'heart'
  x: number
  y: number
}

export default function FlyingObjects() {
  const [objects, setObjects] = useState<FlyingObject[]>([])
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      const newObject: FlyingObject = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'balloon' : 'heart',
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 100,
      }
      setObjects(prev => [...prev, newObject])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    controls.start(i => ({
      y: -window.innerHeight - 100,
      transition: {
        duration: 15,
        delay: i * 0.2,
        ease: 'linear',
      },
    }))
  }, [controls])

  const handleClick = (id: number) => {
    setObjects(prev => prev.filter(obj => obj.id !== id))
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {objects.map((obj, index) => (
        <motion.div
          key={obj.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{ left: obj.x, top: obj.y }}
          custom={index}
          animate={controls}
          onClick={() => handleClick(obj.id)}
        >
          {obj.type === 'balloon' ? '🎈' : '❤️'}
        </motion.div>
      ))}
    </div>
  )
}

