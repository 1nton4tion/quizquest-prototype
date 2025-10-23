import { Button } from '@/components/retroui/Button'

interface TitleScreenProps {
    onStart: () => void
}

export const TitleScreen = ({ onStart }: TitleScreenProps) => {
    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold mb-4">QuizQuest</h1>
            <p className="text-lg mb-6">Test your knowledge!</p>
            <Button onClick={onStart} className="w-full text-center justify-center">
                START
            </Button>
        </div>
    )
}
