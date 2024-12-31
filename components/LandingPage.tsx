'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const validUsernames = ['khld', 'khouloud', 'aicha', 'aichouch', 'aichouchty', 'baby', 'omri', 'hobi', 'babygirl', 'wifey', 'glbi']
const validPasswords = ['wolf', 'raven', 'cat']

interface LandingPageProps {
  onSuccessfulLogin: () => void
}

export default function LandingPage({ onSuccessfulLogin }: LandingPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validUsernames.includes(username.toLowerCase()) && validPasswords.includes(password.toLowerCase())) {
      onSuccessfulLogin()
    } else {
      setError('Oops! That\'s not quite right, my love. Try again! 💕')
    }
  }

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-pink-100 to-red-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-800">Welcome, My Love ❤️</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              What do I call you?
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              What's my favorite animal?
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Enter Our Love Story ✨
          </button>
        </form>
      </div>
    </motion.div>
  )
}

