'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    question: "where did we first meet?",
    options: ["highshcool", "Restaurant", "Beach", "Cinema"],
    correctAnswer: 0
  },
  {
    question: "What's Aicha's favorite color?",
    options: ["pink", "Red", "skyblue sometimes green ", "Purple"],
    correctAnswer: 2
  },
  {
    question: "What's our anniversary date?",
    options: ["papch say its 29 nov", "February 14th", "pookie say its 29 oct", "December 31st"],
    correctAnswer: 2
  },
  {
    question: "What is lulu love language?",
    options: ["give her a hug", "sweet texts", "make her laugh", "Surprise her with gifts"],
    correctAnswer: 3
  },
  {
    question: "What is one thing that always makes me smile?",
    options: ["A warm hug", "Your jokes", "Your smile ", "Compliments"],
    correctAnswer: 1
  },
  {
    question: "What do I love most about our relationship?",
    options: ["The trust and loaylty", "The deep connection we share", "The little everyday moments and tiddies ", "everything from above and more"],
    correctAnswer: 3
  },
  {
    question: "What is lulu comfort drink when she's feeling down?",
    options: ["daily", "coffee", "watter ", "daily and coffee ;)"],
    correctAnswer: 3
  },
  {
    question: "would you like to marry me ",
    options: ["yes", "yes", "yes ", "mf duh wtf hell yeah lets do it"],
    correctAnswer: 3
  },
  {
    question: "whos your daddy ? ",
    options: ["your actulal dad", "3alal", "he went for milk ", "ehm me ofc me this is the only right answer"],
    correctAnswer: 3
  },
  {
    question: "What is the moment that made me realize how much I love you? ",
    options: ["A simple, everyday moment", " A special occasion or date", " ive always loved you and everything else made me love you more", "A spontaneous act of love"],
    correctAnswer: 2
  }
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-medium mb-6">{questions[currentQuestion].question}</h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="w-full p-4 text-left bg-pink-50 hover:bg-pink-100 rounded-xl transition-all"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-lg text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
            <p className="text-xl mb-4">Your Score: {score}/{questions.length}</p>
            {score === questions.length ? (
              <p className="text-lg mb-6">Wow, hehehehehe baby! You know our relationship perfectly. I'm so lucky to have such an attentive and loving girlfriend hehe!</p>
            ) : score >= questions.length / 2 ? (
              <p className="text-lg mb-6">Great job, Aichouchty! You remember so many special moments of our relationship. Let's keep creating more beautiful memories together!</p>
            ) : (
              <p className="text-lg mb-6">Aicha, my love, dont cry you did great but. How about we plan a date to talk about our favorite memories?</p>
            )}
            <button
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all"
              onClick={resetQuiz}
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

