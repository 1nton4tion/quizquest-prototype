import { Button } from '@/components/retroui/Button'
import { Terminal } from '@/components/retroui/Terminal'

interface TitleScreenProps {
    onStart: () => void
    onBreakout?: () => void
}

export const TitleScreen = ({ onStart, onBreakout }: TitleScreenProps) => {
    return (
        <div className="h-full w-full relative">
            {/* Full-screen terminal background */}
            <Terminal
                className="h-full w-full"
                onBreakout={onBreakout}
            />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                <div className="pointer-events-auto flex flex-col items-center">
                    <h1 className="text-6xl font-bold mb-4 cyber-text-glow">QuizQuest</h1>
                    <p className="text-lg mb-8">Test your knowledge!</p>
                    <div className="flex justify-center">
                        <Button onClick={onStart}>
                            START
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
