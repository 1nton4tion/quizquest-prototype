import { useEffect, useRef, useState } from 'react'
import type { Ball, Paddle, Block, BreakoutQuestion } from './types'

interface BreakoutGameProps {
    question: BreakoutQuestion
    onAnswer: (isCorrect: boolean) => void
}

export const BreakoutGame = ({ question, onAnswer }: BreakoutGameProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const keysRef = useRef<{ [key: string]: boolean }>({})

    // Game state stored in refs to avoid React re-render cycles
    const gameStateRef = useRef({
        ball: { x: 0, y: 0, dx: 0, dy: 0, radius: 8 } as Ball,
        paddle: { x: 0, y: 0, width: 100, height: 15 } as Paddle,
        blocks: [] as Block[],
        score: 0,
        answerSelected: false,
        selectedAnswer: -1,
        gameOver: false,
        isPaused: false
    })

    // Only use useState for UI that needs React rendering
    const [gameOver, setGameOver] = useState(false)

    // Initialize game
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        canvas.width = 600
        canvas.height = 400

        // Initialize game state
        initializeGame(canvas.width, canvas.height, question)
    }, [question])

    // Keyboard event handlers
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keysRef.current[e.key] = true
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            keysRef.current[e.key] = false
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    // Game loop - restart when question changes
    useEffect(() => {
        let animationId: number

        const gameLoop = () => {
            updateGame()
            drawGame()
            animationId = requestAnimationFrame(gameLoop)
        }

        animationId = requestAnimationFrame(gameLoop)

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [question]) // Restart game loop when question changes

    const initializeGame = (width: number, height: number, question: BreakoutQuestion) => {
        const state = gameStateRef.current

        // Initialize ball
        state.ball = {
            x: width / 2,
            y: height - 100,
            dx: (Math.random() - 0.5) * 4,
            dy: -3,
            radius: 8
        }

        // Initialize paddle
        state.paddle = {
            x: width / 2 - 50,
            y: height - 30,
            width: 100,
            height: 15
        }

        // Initialize blocks
        const blocks: Block[] = []
        const blockWidth = 80
        const blockHeight = 30
        const blocksPerRow = 6
        const startX = (width - (blocksPerRow * blockWidth)) / 2
        const startY = 60

        // Create answer blocks (4 blocks with answers) - center them
        const totalAnswerWidth = 4 * blockWidth
        const answerStartX = (width - totalAnswerWidth) / 2
        const answerBlocks = question.answers.map((_, index) => ({
            x: answerStartX + (index * blockWidth),
            y: startY,
            width: blockWidth,
            height: blockHeight,
            color: '#00ff88', // All answer blocks are green
            isAnswer: true,
            answerIndex: index,
            isDestroyed: false
        }))

        // Create only one row of non-answer blocks below the answer blocks
        for (let col = 0; col < blocksPerRow; col++) {
            blocks.push({
                x: startX + col * blockWidth,
                y: startY + blockHeight,
                width: blockWidth,
                height: blockHeight,
                color: '#333333',
                isAnswer: false,
                isDestroyed: false
            })
        }

        // Reset game state
        state.blocks = [...answerBlocks, ...blocks]
        state.score = 0
        state.answerSelected = false
        state.selectedAnswer = -1
        state.gameOver = false
        state.isPaused = false

        // Update React state for UI
        setGameOver(false)
    }

    const ballCollidesWithBlock = (ball: Ball, block: Block): boolean => {
        const ballLeft = ball.x - ball.radius
        const ballRight = ball.x + ball.radius
        const ballTop = ball.y - ball.radius
        const ballBottom = ball.y + ball.radius

        return ballRight > block.x &&
            ballLeft < block.x + block.width &&
            ballBottom > block.y &&
            ballTop < block.y + block.height
    }

    const updateGame = () => {
        const state = gameStateRef.current
        const canvas = canvasRef.current
        if (!canvas || state.isPaused || state.gameOver || state.answerSelected) return

        // Handle paddle movement with keyboard
        const paddleSpeed = 5
        if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) {
            state.paddle.x = Math.max(0, state.paddle.x - paddleSpeed)
        }
        if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) {
            state.paddle.x = Math.min(600 - state.paddle.width, state.paddle.x + paddleSpeed)
        }

        // Update ball position
        state.ball.x += state.ball.dx
        state.ball.y += state.ball.dy

        // Ball collision with walls
        if (state.ball.x - state.ball.radius <= 0 || state.ball.x + state.ball.radius >= 600) {
            state.ball.dx = -state.ball.dx
        }
        if (state.ball.y - state.ball.radius <= 0) {
            state.ball.dy = -state.ball.dy
        }

        // Ball collision with paddle
        if (state.ball.y + state.ball.radius >= state.paddle.y &&
            state.ball.y - state.ball.radius <= state.paddle.y + state.paddle.height &&
            state.ball.x + state.ball.radius >= state.paddle.x &&
            state.ball.x - state.ball.radius <= state.paddle.x + state.paddle.width) {

            // Make sure ball is above paddle
            state.ball.y = state.paddle.y - state.ball.radius
            state.ball.dy = -Math.abs(state.ball.dy)

            // Add some spin based on where ball hits paddle
            const hitPos = (state.ball.x - state.paddle.x) / state.paddle.width
            state.ball.dx = (hitPos - 0.5) * 8
        }

        // Ball fell off bottom - counts as wrong answer
        if (state.ball.y > 400) {
            state.gameOver = true
            setGameOver(true)
            onAnswer(false) // Wrong answer - ball missed
        }

        // Ball collision with blocks
        for (let i = 0; i < state.blocks.length; i++) {
            const block = state.blocks[i]
            if (block.isDestroyed) continue

            if (ballCollidesWithBlock(state.ball, block)) {
                // Reverse ball direction
                state.ball.dy = -state.ball.dy
                state.score += 10

                // ALWAYS destroy the block (answer or not)
                block.isDestroyed = true

                // If it's an answer block AND we haven't selected yet
                if (block.isAnswer && !state.answerSelected) {
                    state.answerSelected = true
                    state.selectedAnswer = block.answerIndex!
                    const isCorrect = block.answerIndex === question.correct
                    state.gameOver = true
                    setGameOver(true)
                    onAnswer(isCorrect)
                }

                break // Only process one collision per frame
            }
        }
    }

    const drawGame = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const state = gameStateRef.current

        // Clear canvas
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw blocks
        state.blocks.forEach(block => {
            if (!block.isDestroyed) {
                ctx.fillStyle = block.color
                ctx.fillRect(block.x, block.y, block.width, block.height)

                // All blocks have the same styling
                ctx.strokeStyle = '#00ff88'
                ctx.lineWidth = 2

                ctx.strokeRect(block.x, block.y, block.width, block.height)
                ctx.shadowBlur = 0 // Reset shadow

                // Draw answer text on answer blocks
                if (block.isAnswer && block.answerIndex !== undefined) {
                    ctx.fillStyle = '#000'
                    ctx.font = 'bold 12px monospace'
                    ctx.textAlign = 'center'
                    const answerText = question.answers[block.answerIndex].substring(0, 8)
                    ctx.fillText(answerText, block.x + block.width / 2, block.y + block.height / 2 + 4)
                }
            }
        })

        // Draw paddle
        ctx.fillStyle = '#00ff88'
        ctx.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height)

        // Draw ball
        ctx.fillStyle = '#00ff88'
        ctx.beginPath()
        ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw UI - removed score and lives display

        // Draw question
        ctx.font = '14px monospace'
        ctx.textAlign = 'center'
        const questionText = question.question.length > 50 ?
            question.question.substring(0, 50) + '...' :
            question.question
        ctx.fillText(questionText, 300, 350)
    }

    return (
        <div className="flex flex-col items-center">
            <canvas
                ref={canvasRef}
                className="border-2 border-green-400 cursor-none"
                style={{ imageRendering: 'pixelated' }}
            />
            <div className="mt-4 text-center">
                <p className="text-green-400 font-mono text-sm mb-2">
                    Break the correct answer block! Use A/D or Arrow Keys to move paddle.
                </p>
                {gameOver && (
                    <p className="text-red-400 font-mono">
                        Game Over! {gameStateRef.current.answerSelected ?
                            (gameStateRef.current.selectedAnswer === question.correct ? 'Correct answer hit!' : 'Wrong answer!') :
                            'Try again!'}
                    </p>
                )}
            </div>
        </div>
    )
}