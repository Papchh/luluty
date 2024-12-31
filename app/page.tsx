'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Quiz from '../components/Quiz'
import PoemBook from '../components/PoemBook'
import WishlistSearch from '../components/WishlistSearch'
import SpinningWheel from '../components/SpinningWheel'
import FloatingHearts from '../components/FloatingHearts'
import LandingPage from '../components/LandingPage'
import CountdownTimer from '../components/CountdownTimer'
import { GamepadIcon as GameController, Stethoscope } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [currentSection, setCurrentSection] = useState<'quiz' | 'poems' | 'wishlist' | 'wheel' | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <AnimatePresence mode="wait">
      {!isLoggedIn ? (
        <LandingPage key="landing" onSuccessfulLogin={handleSuccessfulLogin} />
      ) : (
        <motion.main
          key="main"
          className="min-h-screen bg-pink-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FloatingHearts />
          <nav className="fixed top-0 left-0 right-0 flex justify-center items-center gap-4 p-4 bg-white/80 backdrop-blur-sm z-50">
            <button
              onClick={() => setCurrentSection('quiz')}
              className={`px-6 py-2 rounded-full transition-all ${
                currentSection === 'quiz' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
              }`}
            >
              Our Love Quiz
            </button>
            <button
              onClick={() => setCurrentSection('poems')}
              className={`px-6 py-2 rounded-full transition-all ${
                currentSection === 'poems' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
              }`}
            >
              Our Poem Book
            </button>
            <button
              onClick={() => setCurrentSection('wishlist')}
              className={`px-6 py-2 rounded-full transition-all ${
                currentSection === 'wishlist' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
              }`}
            >
              Our Wishlist
            </button>
            <button
              onClick={() => setCurrentSection('wheel')}
              className={`px-6 py-2 rounded-full transition-all ${
                currentSection === 'wheel' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
              }`}
            >
              Wheel of Love
            </button>
            <Link
              href="/games"
              className="px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-all flex items-center gap-2"
            >
              Games For You <GameController className="w-4 h-4" />
            </Link>
            <Link
              href="/midwifery"
              className="px-6 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-all flex items-center gap-2"
            >
              Midwifery Quiz <Stethoscope className="w-4 h-4" />
            </Link>
          </nav>

          <div className="pt-24 px-4">
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                <CountdownTimer />
              </div>
            </div>
            <Header />
            
            <motion.div
              className="max-w-4xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentSection === 'quiz' && <Quiz />}
              {currentSection === 'poems' && <PoemBook />}
              {currentSection === 'wishlist' && <WishlistSearch />}
              {currentSection === 'wheel' && <SpinningWheel />}
              {currentSection === null && (
                <div className="text-center text-pink-600 text-lg">
                  Choose a section from the menu above to begin our love journey! ❤️
                </div>
              )}
            </motion.div>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  )
}
