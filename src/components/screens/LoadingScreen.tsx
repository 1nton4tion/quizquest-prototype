import { useEffect, useState } from "react";
import { loadingMessages } from "@/data";
import { Loader } from "@/components/retroui/Loader"
export const LoadingScreen = () => {



    // Show a new message every 900ms
    const MESSAGE_INTERVAL = 900;
    // Pick a random initial message index
    const [messageIndex, setMessageIndex] = useState(() => Math.floor(Math.random() * loadingMessages.length));

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev: number) => (prev + 1) % loadingMessages.length);
        }, MESSAGE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
            <Loader count={30} duration={1} delayStep={100} />
            <p className="text-sm text-gray-600">
                {loadingMessages[messageIndex]}...
            </p>
        </div>
    )
}
