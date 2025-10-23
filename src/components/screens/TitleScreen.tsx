import { Button } from '@/components/retroui/Button'

interface TitleScreenProps {
    onStart: () => void
}

export const TitleScreen = ({ onStart }: TitleScreenProps) => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full w-full">
            <h1 className="text-6xl font-bold mb-4">QuizQuest</h1>
            <p className="text-lg mb-8">Test your knowledge!</p>
            <Button onClick={onStart}>
                START
            </Button>
        </div>
    )
}
