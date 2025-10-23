import type { Question, FinalMessage } from './types'

export const questions: Question[] = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        id: 3,
        question: "What is the capital of Germany?",
        options: ["Berlin", "Hamburg", "Munich", "Frankfurt"],
        correct: 0
    },
    {
        id: 4,
        question: "What is the capital of Italy?",
        options: ["Milan", "Rome", "Naples", "Turin"],
        correct: 1
    },
    {
        id: 5,
        question: "What is the capital of Spain?",
        options: ["Seville", "Barcelona", "Valencia", "Madrid"],
        correct: 3
    }
]

export const GAME_CONFIG = {
    LOADING_DURATION: 5000,
    TOTAL_QUESTIONS: questions.length
}

export const loadingMessages: string[] = [
    "Warming up the braincells. Please hold.",
    "Installing extra trivia.",
    "Calibrating guesses.",
    "Shuffling fun facts.",
    "Buffering dramatic pauses.",
    "Feeding the quiz gremlins.",
    "Teaching the scoreboard to count.",
    "Downloading smugness for winners.",
    "Upgrading wrong answers to “creative.”",
    "Stirring the pot of knowledge.",
    "Aligning planets for bonus points.",
    "Ironing out trick questions.",
    "Summoning the quiz master.",
    "Locating the Any Key.",
    "Dusting off the buzzer.",
    "Polishing your confidence.",
    "Verifying fun-to-facts ratio.",
    "Untangling headphone wires of truth.",
    "Inflating ego balloons.",
    "Spinning up plot twists.",
    "Checking batteries in the thinking cap.",
    "Defragmenting your memory.",
    "Charging up lifelines.",
    "Unlocking secret levels you won’t reach.",
    "Greasing the wheels of fortune.",
    "Teaching 2 + 2 to be 4 again.",
    "Baking fresh multiple choice.",
    "Whispering hints to the void.",
    "Tuning the trivia antenna.",
    "Herding cats into categories.",
    "Rendering witty comebacks.",
    "Sanitizing dad jokes.",
    "Shaking the Magic 8-Bit.",
    "Preheating the leaderboard to 180°.",
    "Removing calories from brain snacks.",
    "Fetching facts from the cloud. It’s foggy.",
    "Negotiating with the timer.",
    "Painting targets on red herrings.",
    "Cooling hot takes to lukewarm.",
    "Approving puns with legal."
];

export const finalMessages: FinalMessage[] = [
    { normalizedScore: 1.0, message: "Perfect game. The trivia bows to you.", emoji: "🧠👑" },
    { normalizedScore: 0.9, message: "Near-perfect. One more neuron and you’d be illegal.", emoji: "🚀" },
    { normalizedScore: 0.8, message: "Elite recall. You study or you’re scary. Maybe both.", emoji: "📚" },
    { normalizedScore: 0.7, message: "Strong performance. Minor guesswork detected.", emoji: "💪" },
    { normalizedScore: 0.6, message: "Above average. You and the curve are on speaking terms.", emoji: "👍" },
    { normalizedScore: 0.5, message: "Coin-flip champion. Luck and knowledge are co-parents.", emoji: "🎲" },
    { normalizedScore: 0.4, message: "So close you can smell it. That smell is effort.", emoji: "😅" },
    { normalizedScore: 0.3, message: "Some hits, some myths. Good groundwork.", emoji: "🧩" },
    { normalizedScore: 0.2, message: "The journey begins. Maps are in the lobby.", emoji: "🗺️" },
    { normalizedScore: 0.1, message: "You discovered new wrong answers. Valuable science.", emoji: "🔬" },
    { normalizedScore: 0.0, message: "All airballs. Reload knowledge and try again.", emoji: "🔄" }
];
