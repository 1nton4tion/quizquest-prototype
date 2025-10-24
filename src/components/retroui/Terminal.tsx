import { useState, useEffect, useRef } from 'react'

interface TerminalProps {
    className?: string
    onBreakout?: () => void
}

export const Terminal = ({ className = '', onBreakout }: TerminalProps) => {
    const [lines, setLines] = useState<string[]>(['$ ERROR: Unauthorized access detected!', '$ System: "Nice try, cheater!"', '$ Access granted anyway... because we\'re cool like that'])
    const [currentInput, setCurrentInput] = useState('')
    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Focus the terminal when clicked
    const handleTerminalClick = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    // Handle typing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(e.target.value)
    }

    // Handle enter key
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const input = currentInput.trim()

            // Check for special "breakout" command
            if (input.toLowerCase() === 'breakout' && onBreakout) {
                onBreakout()
            }

            // Add the command to terminal history
            setLines(prev => [...prev, `$ ${input}`])
            setCurrentInput('')

            // Auto-scroll to bottom
            setTimeout(() => {
                if (terminalRef.current) {
                    terminalRef.current.scrollTop = terminalRef.current.scrollHeight
                }
            }, 10)
        }
    }

    // Auto-scroll when new lines are added
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [lines])

    return (
        <div
            className={`terminal-container ${className}`}
            onClick={handleTerminalClick}
        >
            <div className="terminal-body" ref={terminalRef}>
                {lines.map((line, index) => (
                    <div key={index} className="terminal-line">
                        <span className="terminal-text">{line}</span>
                    </div>
                ))}
                <div className="terminal-line">
                    <span className="terminal-prompt">user@quizquest:~$</span>
                    <span className="terminal-text">{currentInput}</span>
                    <span className="terminal-cursor">_</span>
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="terminal-input"
                    autoFocus
                />
            </div>
        </div>
    )
}
