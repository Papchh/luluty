'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState('Time until 2025: 12h 19m 02s')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetHours = 12
      const targetMinutes = 19
      const targetSeconds = 2
      
      const now = new Date()
      
      let hours = targetHours
      let minutes = targetMinutes
      let seconds = targetSeconds - now.getSeconds()
      
      if (seconds < 0) {
        seconds += 60
        minutes--
      }
      
      if (minutes < 0) {
        minutes += 60
        hours--
      }

      return `Time until 2025: ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-pink-600 font-medium">
      {timeLeft}
    </div>
  )
}
