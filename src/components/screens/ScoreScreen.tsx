import { Button } from '@/components/retroui/Button'

interface ScoreScreenProps {
    score: number
    totalQuestions: number
    onPlayAgain: () => void
}

export const ScoreScreen = ({ score, totalQuestions, onPlayAgain }: ScoreScreenProps) => {
    const getScoreMessage = () => {
        if (score === totalQuestions) {
            return "Perfect! You got them all right!"
        } else if (score >= totalQuestions / 2) {
            return "Good job! You passed!"
        } else {
            return "Keep studying and try again!"
        }
    }

    return (
        <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Quiz Complete!</h2>
            <h3 className="text-xl font-medium mb-4">Your Score: {score} / {totalQuestions}</h3>
            <p className="text-gray-600 mb-6">
                {getScoreMessage()}
            </p>
            <Button onClick={onPlayAgain} className="w-full">
                Play Again
            </Button>
        </div>
    )
}
