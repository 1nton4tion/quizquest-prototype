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
    }
]

export const GAME_CONFIG = {
    LOADING_DURATION: 2500,
    TOTAL_QUESTIONS: questions.length
}