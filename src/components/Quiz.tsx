"use client"

import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loader2, ImageIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import StatisticsPage from './StatisticsPage'

interface Option {
  [key: string]: string
}

interface Question {
  question_text: string
  options: Option
  correct_answer: string
  difficulty?: string
  subtopic?: string
  image?: string
  explanation?: string
}

interface QuestionResult {
  difficulty: string | null
  timeTaken: number
  subtopic: string | null
  isCorrect: boolean
  question: Question
  userAnswer: string | null
  timeUp: boolean
}

interface MCQQuizProps {
  questions: Question[]
  timePerQuestion: number
  subject: string
}

export default function MCQQuiz({ questions, timePerQuestion, subject }: MCQQuizProps) {
  const { user } = useUser()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)
  const [timer, setTimer] = useState<number>(timePerQuestion)
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([])
  const [shuffledOptions, setShuffledOptions] = useState<[string, string][]>([])

  useEffect(() => {
    if (questions.length > 0 && !quizCompleted) {
      setStartTime(new Date())
      const timerInterval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval)
            handleTimeUp()
            return timePerQuestion
          }
          return prevTimer - 1
        })
      }, 1000)
      return () => clearInterval(timerInterval)
    }
  }, [currentQuestionIndex, questions, quizCompleted, timePerQuestion])

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion()
    } else {
      submitQuiz()
    }
  }

  useEffect(() => {
    const options = Object.entries(questions[currentQuestionIndex].options)
    const shuffled = options.sort(() => Math.random() - 0.5)
    setShuffledOptions(shuffled)
  }, [currentQuestionIndex, questions])

  const selectOption = (optionKey: string) => {
    setSelectedOption(optionKey)
  }

  const nextQuestion = () => {
    updateQuestionResult()
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setTimer(timePerQuestion)
    }
  }

  const updateQuestionResult = () => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedOption !== null && currentQuestion.options[selectedOption] === currentQuestion.correct_answer
    
    setQuestionResults(prevResults => [
      ...prevResults,
      {
        difficulty: currentQuestion.difficulty || null,
        timeTaken: timePerQuestion - timer,
        subtopic: currentQuestion.subtopic || null,
        isCorrect: isCorrect,
        question: currentQuestion,
        userAnswer: selectedOption ? currentQuestion.options[selectedOption] : null,
        timeUp: timer === 0
      }
    ])
  }

  const submitQuiz = async () => {
    updateQuestionResult()
    setQuizCompleted(true)

    const calculatedScore = questionResults.reduce((total, result) => result.isCorrect ? total + 1 : total, 0)
    setScore(calculatedScore)

    try {
      const response = await fetch('https://server.datasenseai.com/custom-test/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkId: user?.id || 'anonymous',
          subject: `${subject} (MCQ)`,
          results: [{
            questions: questionResults.map(result => ({
              ...result,
              question: result.question,
              timeUp: result.timeUp,
              submittedAt: new Date()
            }))
          }]
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit quiz results')
      }
      console.log('Quiz submitted successfully!')
    } catch (error) {
      console.error('Error submitting quiz:', error)
      toast.error('Failed to submit quiz. Please try again.')
    }
  }

  if (questions.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <h5 className="mt-4 text-2xl font-thin text-gray-700">Loading...</h5>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <StatisticsPage
        score={score}
        totalQuestions={questions.length}
        totalTime={questionResults.reduce((total, result) => total + result.timeTaken, 0)}
        results={questionResults}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Left Panel */}
        <Card className="w-[500px] h-full rounded-none border-r">
          <CardContent className="p-6">
            <ScrollArea className="h-[calc(100vh-48px)]">
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-white">{questions[currentQuestionIndex].question_text}</h2>
                </div>
                
                {/* Show image if available */}
                {questions[currentQuestionIndex].image && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={questions[currentQuestionIndex].image}
                      alt="Question visual"
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Additional content or explanation can go here */}
                {questions[currentQuestionIndex].explanation && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">{questions[currentQuestionIndex].explanation}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Content */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Question {currentQuestionIndex + 1}/{questions.length}</h1>
              <span className="text-sm font-semibold text-gray-600">Time Remaining: {timer}s</span>
            </div>

            <div className="space-y-4 mb-8">
              {shuffledOptions.map(([key, value]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption === key
                      ? 'bg-blue-500 text-white ring-2 ring-blue-600 ring-offset-2'
                      : 'bg-white hover:bg-gray-50 text-gray-800 shadow-sm'
                  }`}
                  onClick={() => selectOption(key)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      selectedOption === key ? 'border-white' : 'border-gray-300'
                    }`}>
                      {key}
                    </div>
                    <span className="flex-1">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {questions[currentQuestionIndex].difficulty || 'Standard'} Level
              </span>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
                onClick={currentQuestionIndex === questions.length - 1 ? submitQuiz : nextQuestion}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

