import type { Question } from './types'

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
