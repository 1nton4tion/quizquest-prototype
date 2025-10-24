export interface Ball {
    x: number
    y: number
    dx: number
    dy: number
    radius: number
}

export interface Paddle {
    x: number
    y: number
    width: number
    height: number
}

export interface Block {
    x: number
    y: number
    width: number
    height: number
    color: string
    isAnswer: boolean
    answerIndex?: number
    isDestroyed: boolean
}

export interface BreakoutGameState {
    ball: Ball
    paddle: Paddle
    blocks: Block[]
    score: number
    lives: number
    isGameOver: boolean
    isPaused: boolean
    currentQuestion: number
    totalQuestions: number
    correctAnswers: number
}

export interface BreakoutQuestion {
    question: string
    answers: string[]
    correct: number
}
