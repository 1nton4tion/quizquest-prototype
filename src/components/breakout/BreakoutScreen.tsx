import { useState, useEffect } from 'react'
import { BreakoutGame } from './BreakoutGame'
import type { BreakoutQuestion } from './types'

interface BreakoutScreenProps {
    question: BreakoutQuestion
    questionNumber: number
    totalQuestions: number
    onAnswer: (isCorrect: boolean) => void
}

export const BreakoutScreen = ({
    question,
    questionNumber,
    totalQuestions,
    onAnswer
}: BreakoutScreenProps) => {
    const [answerProcessed, setAnswerProcessed] = useState(false)

    // Reset state when question changes
    useEffect(() => {
        setAnswerProcessed(false)
    }, [question])

    const handleAnswer = (isCorrect: boolean) => {
        if (answerProcessed) return // Prevent multiple calls

        setAnswerProcessed(true)
        onAnswer(isCorrect)
    }

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-green-400 mb-2 cyber-text-glow">
                    Question {questionNumber} of {totalQuestions}
                </h2>
                <p className="text-lg text-green-400 mb-2">
                    Break the correct answer block!
                </p>
                <p className="text-sm text-green-400 mb-4">
                    Use A/D or Arrow Keys to move paddle
                </p>
            </div>

            <BreakoutGame
                question={question}
                onAnswer={handleAnswer}
            />
        </div>
    )
}
