export type Screen = 'title' | 'loading' | 'question' | 'score'

export interface Question {
    id: number
    question: string
    options: string[]
    correct: number
}

export interface GameState {
    screen: Screen
    currentQuestion: number
    score: number
    answers: number[]
}

export interface FinalMessage {
    normalizedScore: number,
    message: string,
    emoji: string
}