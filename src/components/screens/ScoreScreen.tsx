import { Button } from '@/components/retroui/Button'
import { finalMessages } from '../../data'

interface ScoreScreenProps {
    score: number
    totalQuestions: number
    onPlayAgain: () => void
}

export const ScoreScreen = ({ score, totalQuestions, onPlayAgain }: ScoreScreenProps) => {
    const normalizedScore = (score / totalQuestions);

    // Find the appropriate message based on normalized score
    const getFinalMessage = () => {
        // Find the first message where normalizedScore is >= the threshold
        for (const message of finalMessages) {
            if (normalizedScore >= message.normalizedScore) {
                return message
            }
        }
        // Fallback to the lowest score message
        return finalMessages[finalMessages.length - 1]
    }

    const finalMessage = getFinalMessage()

    return (
        <div className="flex flex-col items-center justify-center text-center h-full w-full space-y-6">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold">Quiz Complete!</h2>
                <div className="text-2xl font-semibold">
                    Score: {score} / {totalQuestions}
                </div>
                <div className="text-lg text-gray-400">
                    ({Math.round(normalizedScore * 100)}%)
                </div>
            </div>

            <div className="space-y-4">
                <div className="text-4xl">{finalMessage.emoji}</div>
                <p className="text-lg font-medium max-w-sm">
                    {finalMessage.message}
                </p>
            </div>

            <Button onClick={onPlayAgain} className="w-full">
                Play Again
            </Button>
        </div>
    )
}
