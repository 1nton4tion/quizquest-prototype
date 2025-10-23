import { Progress } from '@/components/retroui/Progress'

export const LoadingScreen = () => {
    return (
        <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
            <Progress value={75} />
            <p className="text-sm text-gray-600">
                Preparing your questions...
            </p>
        </div>
    )
}
