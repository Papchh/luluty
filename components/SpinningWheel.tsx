'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const loveMessages = [
  "Aicha, you're the sunshine in my life",
  "Every moment with you is a blessing lulu",
  "Your smile lights up my world",
  "I fall in love with you more each day",
  "You're my soulmate and best friend",
  "Our love story is my favorite ",
  "You make my heart skip a beat",
  "I'm grateful for your love every day",
  "You are my sunshine",
  "I love you to the moon and back",
 "I can't imagine my life without you",
  "You make me a better person",
  "You are my one and only",
  "Your smile lights up my world",
  "You are my forever love",
   "I am madly in love with you",
   " i would die for you",
   " your my queen ", 
   " i love the crap out of you", 
   "your my favorite person khouloud ",
   "your my favorite person khld hehe ", 
   "glbi and rohi you make me smile ",
   " mwah mwah mwah ",
   " you should prolly text me rn i miss you ", 
   "your pretty today aichouch",
   "i miss the crap out of you "
]

export default function SpinningWheel() {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState('')

  const spinWheel = () => {
    setSpinning(true)
    setResult('')
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * loveMessages.length)
      setResult(loveMessages[randomIndex])
      setSpinning(false)
    }, 3000)
  }

  return (
    <div className="text-center">
      <motion.div
        className="w-64 h-64 rounded-full bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-8"
        animate={{ rotate: spinning ? 360 * 5 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white font-bold">Spin for Love</span>
        </div>
      </motion.div>
      <button
        className="px-6 py-3 bg-red-500 text-white rounded-full text-lg font-bold hover:bg-red-600 transition duration-300"
        onClick={spinWheel}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin the Wheel"}
      </button>
      {result && (
        <motion.p
          className="mt-8 text-xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {result}
        </motion.p>
      )}
    </div>
  )
}

