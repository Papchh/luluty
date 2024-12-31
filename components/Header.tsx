'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <div className="text-center">
      <motion.div
        className="inline-block bg-white rounded-full px-8 py-4 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl text-pink-500 font-medium">
          Welcome to Our Love Journey ❤️
        </h2>
      </motion.div>
    </div>
  )
}
