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
        <div className="flex flex-col items-center justify-center text-center h-full w-full space-y-6">
            <Loader count={50} duration={1} delayStep={100} className="w-full" />
            <p className="text-sm text-gray-400">
                {loadingMessages[messageIndex]}..
            </p>
        </div>
    )
}
