import { useEffect, useState } from 'react'
import { Card } from '@/components/retroui/Card'
import { Progress } from '@/components/retroui/Progress'
import type { Question } from '../../types'

interface QuestionScreenProps {
    question: Question
    questionNumber: number
    totalQuestions: number
    onAnswer: (answerIndex: number) => void
}

export const QuestionScreen = ({
    question,
    questionNumber,
    totalQuestions,
    onAnswer
}: QuestionScreenProps) => {
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        // Reset timer for each new question
        setTimeLeft(10)

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0.1) {
                    // Time's up - auto-submit an out-of-bounds answer to guarantee 'wrong'
                    onAnswer(-1)
                    return 0
                }
                return prev - 0.1
            })
        }, 100) // Update every 100ms for smooth animation

        return () => clearInterval(timer)
    }, [question.id, onAnswer]) // Reset when question changes

    const progressPercentage = (timeLeft / 10) * 100

    return (
        <div className="h-full w-full flex flex-col">
            {/* Progress Bar at Top */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Time Left: {Math.ceil(timeLeft)}s</span>
                    <span className="text-sm text-gray-600">Question {questionNumber} of {totalQuestions}</span>
                </div>
                <Progress value={progressPercentage} className="w-full" />
            </div>

            {/* Question */}
            <div className="text-center mb-6 flex-1 flex items-center justify-center">
                <h4 className="text-lg font-medium">{question.question}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 h-1/2">
                {question.options.map((option, index) => (
                    <Card
                        key={index}
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center"
                        onClick={() => onAnswer(index)}
                    >
                        <div className="text-center text-sm font-medium leading-tight">
                            {option}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
