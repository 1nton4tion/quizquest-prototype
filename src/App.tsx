import { useState, useEffect } from 'react'
import { Card } from '@/components/retroui/Card'
import { TitleScreen } from './components/screens/TitleScreen'
import { LoadingScreen } from './components/screens/LoadingScreen'
import { QuestionScreen } from './components/screens/QuestionScreen'
import { ScoreScreen } from './components/screens/ScoreScreen'
import { BreakoutScreen } from './components/breakout'
import type { GameState } from './types'
import { questions, GAME_CONFIG } from './data'

function App() {
  const [gameState, setGameState] = useState<GameState>({
    screen: 'title',
    currentQuestion: 0,
    score: 0,
    answers: []
  })
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isBreakoutMode, setIsBreakoutMode] = useState(false)

  // Handle loading screen timeout
  useEffect(() => {
    if (gameState.screen === 'loading') {
      const timer = setTimeout(() => {
        const nextScreen = isBreakoutMode ? 'breakout' : 'question'
        setGameState(prev => ({ ...prev, screen: nextScreen }))
      }, GAME_CONFIG.LOADING_DURATION)
      return () => clearTimeout(timer)
    }
  }, [gameState.screen, isBreakoutMode])

  const handleStart = () => {
    setIsBreakoutMode(false)
    setGameState({
      screen: 'loading',
      currentQuestion: 0,
      score: 0,
      answers: []
    })
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...gameState.answers, answerIndex]
    const correct = answerIndex === questions[gameState.currentQuestion].correct
    const newScore = correct ? gameState.score + 1 : gameState.score

    // Show feedback
    setIsCorrect(correct)
    setShowFeedback(true)

    // Hide feedback after 1 second and then proceed
    setTimeout(() => {
      setShowFeedback(false)

      setGameState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore
      }))

      // Move to next question or finish
      if (gameState.currentQuestion < questions.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }))
      } else {
        setGameState(prev => ({
          ...prev,
          screen: 'score'
        }))
      }
    }, 1000)
  }

  const handleBreakoutAnswer = (isCorrect: boolean) => {
    const newAnswers = [...gameState.answers, isCorrect ? questions[gameState.currentQuestion].correct : -1]
    const newScore = isCorrect ? gameState.score + 1 : gameState.score

    // Show feedback
    setIsCorrect(isCorrect)
    setShowFeedback(true)

    // Hide feedback after 1 second and then proceed
    setTimeout(() => {
      setShowFeedback(false)

      setGameState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore
      }))

      // Move to next question or finish
      if (gameState.currentQuestion < questions.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }))
      } else {
        setGameState(prev => ({
          ...prev,
          screen: 'score'
        }))
      }
    }, 1000)
  }

  const handlePlayAgain = () => {
    setIsBreakoutMode(false)
    setGameState({
      screen: 'title',
      currentQuestion: 0,
      score: 0,
      answers: []
    })
  }

  const handleBreakout = () => {
    // Special function called when "breakout" is typed in terminal
    console.log('Breakout command detected!')
    // Set breakout mode and go to loading screen
    setIsBreakoutMode(true)
    setGameState({
      screen: 'loading',
      currentQuestion: 0,
      score: 0,
      answers: []
    })
  }

  const renderScreen = () => {
    switch (gameState.screen) {
      case 'title':
        return <TitleScreen onStart={handleStart} onBreakout={handleBreakout} />

      case 'loading':
        return <LoadingScreen />

      case 'question':
        return (
          <QuestionScreen
            question={questions[gameState.currentQuestion]}
            questionNumber={gameState.currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
          />
        )

      case 'breakout':
        return (
          <BreakoutScreen
            question={{
              question: questions[gameState.currentQuestion].question,
              answers: questions[gameState.currentQuestion].options,
              correct: questions[gameState.currentQuestion].correct
            }}
            questionNumber={gameState.currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleBreakoutAnswer}
          />
        )

      case 'score':
        return (
          <ScoreScreen
            score={gameState.score}
            totalQuestions={questions.length}
            onPlayAgain={handlePlayAgain}
          />
        )

      default:
        return <TitleScreen onStart={handleStart} onBreakout={handleBreakout} />
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-background">
      <Card className="w-200 h-150 p-6 shadow-none hover:shadow-none relative overflow-hidden cyber-glow">
        {/* Feedback Overlay - covers entire card including padding */}
        {showFeedback && (
          <div
            className="absolute inset-0 z-10 transition-opacity duration-100"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backgroundColor: isCorrect
                ? 'rgba(0, 255, 136, 0.3)'
                : 'rgba(255, 0, 64, 0.3)'
            }}
          >
          </div>
        )}
        {renderScreen()}
      </Card>
    </div>
  )
}

export default App
