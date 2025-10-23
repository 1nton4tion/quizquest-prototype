import { useState, useEffect } from 'react'
import { Card } from '@/components/retroui/Card'
import { TitleScreen } from './screens/TitleScreen'
import { LoadingScreen } from './screens/LoadingScreen'
import { QuestionScreen } from './screens/QuestionScreen'
import { ScoreScreen } from './screens/ScoreScreen'
import type { GameState } from '../types'
import { questions, GAME_CONFIG } from '../data'

export const Canvas = () => {
    const [gameState, setGameState] = useState<GameState>({
        screen: 'title',
        currentQuestion: 0,
        score: 0,
        answers: []
    })

    // Handle loading screen timeout
    useEffect(() => {
        if (gameState.screen === 'loading') {
            const timer = setTimeout(() => {
                setGameState(prev => ({ ...prev, screen: 'question' }))
            }, GAME_CONFIG.LOADING_DURATION)
            return () => clearTimeout(timer)
        }
    }, [gameState.screen])

    const handleStart = () => {
        setGameState({
            screen: 'loading',
            currentQuestion: 0,
            score: 0,
            answers: []
        })
    }

    const handleAnswer = (answerIndex: number) => {
        const newAnswers = [...gameState.answers, answerIndex]
        const isCorrect = answerIndex === questions[gameState.currentQuestion].correct
        const newScore = isCorrect ? gameState.score + 1 : gameState.score

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
    }

    const handlePlayAgain = () => {
        setGameState({
            screen: 'title',
            currentQuestion: 0,
            score: 0,
            answers: []
        })
    }

    const renderScreen = () => {
        switch (gameState.screen) {
            case 'title':
                return <TitleScreen onStart={handleStart} />

            case 'loading':
                return <LoadingScreen />

            case 'question':
                return (
                    <QuestionScreen
                        question={questions[gameState.currentQuestion]}
                        questionNumber={gameState.currentQuestion + 1}
                        totalQuestions={questions.length}
                        onAnswer={handleAnswer}
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
                return <TitleScreen onStart={handleStart} />
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-96 h-96 p-6 shadow-none hover:shadow-none">
                {renderScreen()}
            </Card>
        </div>
    )
}
