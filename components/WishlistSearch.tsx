'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X } from 'lucide-react'

const wishlistPlaces = [
  { 
    name: "Paris", 
    description: "The city of love and lights",
    voted: false 
  },
  { 
    name: "Maldives", 
    description: "Paradise on Earth with crystal clear waters",
    voted: false 
  },
  { 
    name: "Santorini", 
    description: "Breathtaking sunsets and white-washed buildings",
    voted: false 
  },
  { 
    name: "Bali", 
    description: "Tropical paradise with rich culture",
    voted: false 
  },
  { 
    name: "New York", 
    description: "The city that never sleeps",
    voted: false 
  },
  { 
    name: "Tokyo, Japan", 
    description: "Experience the blend of tradition and future, anime world and amazing food!",
    voted: false 
  },
  { 
    name: "Venice, Italy", 
    description: "Romantic gondola rides through historic canals",
    voted: false 
  },
  { 
    name: "Kyoto, Japan", 
    description: "Ancient temples, beautiful gardens, and traditional culture",
    voted: false 
  },
  { 
    name: "Rome, Italy", 
    description: "Eternal city with amazing history, art, and the best pizza!",
    voted: false 
  },
  { 
    name: "Marrakech", 
    description: "Vibrant colors and rich Moroccan culture",
    voted: false 
  }
]

interface Place {
  name: string
  description: string
  voted: boolean
}

export default function WishlistSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [places, setPlaces] = useState<Place[]>(wishlistPlaces)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
  }

  const handleVote = (index: number, wantToVisit: boolean) => {
    setPlaces(currentPlaces => {
      const newPlaces = [...currentPlaces]
      if (wantToVisit) {
        newPlaces[index] = { ...newPlaces[index], voted: true }
      } else {
        // Mark for removal with animation
        setTimeout(() => {
          setPlaces(places => places.filter((_, i) => i !== index))
        }, 500)
      }
      return newPlaces
    })
  }

  const filteredPlaces = places.filter(place => 
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      className="w-full max-w-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        placeholder="Search our dream destinations, Aichouchty..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-4 mb-6 border border-pink-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <div className="space-y-4">
        <AnimatePresence>
          {filteredPlaces.map((place, index) => (
            <motion.div
              key={place.name}
              className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-300 ${
                place.voted ? 'border-2 border-pink-400' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                  <p className="text-gray-600">{place.description}</p>
                </div>
                {!place.voted && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(index, true)}
                      className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                      title="Yes, let's visit!"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleVote(index, false)}
                      className="p-2 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400 transition-colors"
                      title="Maybe not this one"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {place.voted && (
                  <span className="text-pink-500 font-semibold">Added to our list! ❤️</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filteredPlaces.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No places found. Let's add a new destination to our wishlist, Aicha! 🌍✨
        </p>
      )}
      {filteredPlaces.some(place => place.voted) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-pink-50 rounded-xl text-center"
        >
          <p className="text-lg font-semibold text-pink-600">
            Our adventure list is growing! Can't wait to explore these places with you, Aichouchty! 🌟
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

