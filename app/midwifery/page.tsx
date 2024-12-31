'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Award } from 'lucide-react'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  image?: string
}

const questions: Question[] = [
  {
    question: "Who is considered the 'Mother of Midwifery'?",
    options: [
      "Mary Breckinridge",
      "Margaret Sanger",
      "Florence Nightingale",
      "Martha Ballard"
    ],
    correctAnswer: 0,
    explanation: "Mary Breckinridge (1881-1965) is often called the 'Mother of Midwifery' for establishing the Frontier Nursing Service in Kentucky, which became a model for rural healthcare and midwifery education.",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    question: "What year was the International Confederation of Midwives (ICM) established?",
    options: ["1919", "1954", "1922", "1947"],
    correctAnswer: 0,
    explanation: "The ICM was established in 1919 and continues to be the global voice for midwifery, working to strengthen professional associations of midwives throughout the world.",
  },
  {
    question: "Which of these is a traditional tool used by midwives for centuries?",
    options: [
      "Pinard Horn",
      "Digital Thermometer",
      "Ultrasound Machine",
      "Electronic Fetal Monitor"
    ],
    correctAnswer: 0,
    explanation: "The Pinard Horn, invented in the 1800s, is a traditional tool still used today by midwives to listen to fetal heartbeats. It's a simple but effective wooden or metal device.",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    question: "What percentage of global births are attended by skilled midwives?",
    options: ["50%", "63%", "78%", "85%"],
    correctAnswer: 2,
    explanation: "According to recent WHO data, approximately 78% of births globally are attended by skilled health professionals, including midwives.",
  },
  {
    question: "Which country has one of the highest rates of midwife-attended births?",
    options: ["Netherlands", "United States", "Brazil", "India"],
    correctAnswer: 0,
    explanation: "The Netherlands has one of the highest rates of midwife-attended births, with around 80% of women receiving primary care from midwives during pregnancy.",
  },
  {
    question: "What is the normal duration of a full-term pregnancy?",
    options: ["36 weeks", "38 weeks", "40 weeks", "42 weeks"],
    correctAnswer: 2,
    explanation: "A full-term pregnancy typically lasts 40 weeks from the first day of the last menstrual period to birth.",
  },
  {
    question: "Which stage of labor is known as the 'transition phase'?",
    options: ["Early first stage", "Late first stage", "Second stage", "Third stage"],
    correctAnswer: 1,
    explanation: "The transition phase occurs during the late first stage of labor, when cervical dilation is typically 7-10 cm. It's often considered the most intense part of labor.",
  },
  {
    question: "What is the normal heart rate range for a fetus?",
    options: ["90-120 bpm", "120-160 bpm", "140-180 bpm", "160-200 bpm"],
    correctAnswer: 1,
    explanation: "The normal fetal heart rate range is typically 120-160 beats per minute.",
  },
  {
    question: "Which position is commonly recommended for normal birth?",
    options: ["Supine position", "Upright position", "Left lateral position", "All of the above"],
    correctAnswer: 3,
    explanation: "Different positions can be beneficial during birth. The best position is often the one the mother finds most comfortable.",
  },
  {
    question: "What is the term for the first milk produced by mothers?",
    options: ["Colostrum", "Foremilk", "Hindmilk", "Transitional milk"],
    correctAnswer: 0,
    explanation: "Colostrum is the first milk produced during pregnancy and just after birth. It's rich in antibodies and nutrients.",
  },
  {
    question: "Which of these is a sign of preeclampsia?",
    options: ["High blood pressure", "Low blood sugar", "Regular contractions", "Decreased fetal movement"],
    correctAnswer: 0,
    explanation: "High blood pressure is a key sign of preeclampsia, a serious pregnancy complication that requires immediate medical attention.",
  },
  {
    question: "What is the normal blood loss during vaginal birth?",
    options: ["Up to 300ml", "Up to 500ml", "Up to 700ml", "Up to 1000ml"],
    correctAnswer: 1,
    explanation: "Normal blood loss during vaginal birth is typically up to 500ml. Anything above this is considered postpartum hemorrhage.",
  },
  {
    question: "When should the first breastfeed ideally take place?",
    options: ["Within first hour", "Within 2-3 hours", "Within 4-6 hours", "When baby shows interest"],
    correctAnswer: 0,
    explanation: "The first breastfeed should ideally occur within the first hour after birth, often called the 'golden hour'.",
  },
  {
    question: "What is the purpose of the APGAR score?",
    options: [
      "Assess newborn's condition",
      "Measure mother's recovery",
      "Calculate due date",
      "Determine birth weight"
    ],
    correctAnswer: 0,
    explanation: "The APGAR score is used to quickly assess a newborn's condition at 1 and 5 minutes after birth.",
  },
  {
    question: "Which vitamin is most important during early pregnancy?",
    options: ["Vitamin C", "Vitamin D", "Folic Acid", "Vitamin B12"],
    correctAnswer: 2,
    explanation: "Folic Acid is crucial during early pregnancy to prevent neural tube defects in the developing baby.",
  }
]

const funFacts = [
  "The word 'midwife' means 'with woman' in Old English.",
  "Ancient Egyptian hieroglyphs show birthing scenes with midwives assisting women.",
  "In many cultures, midwives were considered wise women and healers.",
  "The first midwifery school in Europe opened in 1728 in Strasbourg.",
  "New Zealand was the first country to require midwife registration in 1904."
]

export default function MidwiferyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFunFact, setShowFunFact] = useState(false)
  const [currentFact, setCurrentFact] = useState(0)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowAnswer(false)
      setSelectedAnswer(null)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setShowAnswer(false)
    setScore(0)
    setShowResults(false)
    setSelectedAnswer(null)
  }

  const toggleFunFact = () => {
    if (showFunFact) {
      setCurrentFact((prev) => (prev + 1) % funFacts.length)
    }
    setShowFunFact(!showFunFact)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Our Love Story
      </Link>

      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-purple-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Midwifery Knowledge Quiz
        </motion.h1>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 shadow-lg mb-8"
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-purple-600">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="text-sm text-purple-600">Score: {score}</span>
                </div>
                <h2 className="text-2xl font-medium mb-6">{questions[currentQuestion].question}</h2>
                {questions[currentQuestion].image && (
                  <img 
                    src={questions[currentQuestion].image} 
                    alt="Question illustration"
                    className="w-full max-w-md mx-auto rounded-lg mb-6"
                  />
                )}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showAnswer && handleAnswer(index)}
                      className={`w-full p-4 text-left rounded-xl transition-all ${
                        showAnswer
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 text-green-800'
                            : index === selectedAnswer
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-50'
                          : 'bg-purple-50 hover:bg-purple-100'
                      }`}
                      disabled={showAnswer}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-purple-50 rounded-xl"
                  >
                    <p className="text-purple-800">{questions[currentQuestion].explanation}</p>
                    <button
                      onClick={nextQuestion}
                      className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 shadow-lg text-center"
            >
              <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-xl mb-4">Your Score: {score}/{questions.length}</p>
              <p className="text-lg mb-6">
                {score === questions.length 
                  ? "Amazing! You're a midwifery expert! 👩‍⚕️✨" 
                  : score >= questions.length / 2 
                  ? "Great job! You know quite a bit about midwifery! 🎉" 
                  : "Keep learning! Every bit of knowledge helps! 📚"}
              </p>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={toggleFunFact}
            className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all"
          >
            {showFunFact ? 'Show Another Fun Fact!' : 'Show Fun Fact!'}
          </button>
          <AnimatePresence mode="wait">
            {showFunFact && (
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-6 bg-white rounded-2xl shadow-lg"
              >
                <p className="text-lg text-purple-800">{funFacts[currentFact]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
