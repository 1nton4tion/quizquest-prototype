import { Button } from '@/components/retroui/Button'
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
    return (
        <div className="space-y-4">
            <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Question {questionNumber} of {totalQuestions}</h3>
                <h4 className="text-lg mt-4">{question.question}</h4>
            </div>

            <div className="space-y-2">
                {question.options.map((option, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => onAnswer(index)}
                    >
                        {String.fromCharCode(65 + index)}. {option}
                    </Button>
                ))}
            </div>
        </div>
    )
}
