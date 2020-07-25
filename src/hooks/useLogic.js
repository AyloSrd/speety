import { useState, useEffect, useRef } from 'react'

const useLogic = () => {
	const TIMER_DURATION = 30
  
	const [text, setText] = useState('')
	const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION)
	const [shouldTimerStart, setShouldTimerStart] = useState(false)
	const [count, setCount] = useState([0, 0])
	const textAreaRef = useRef(null)

  	const handleChange = e => {
		const { value } = e.target
		setText(value)
	}

	const handlePaste = e => {
        e.preventDefault()
    }

	const startGame = () => {
		setTimeRemaining(TIMER_DURATION)
		setShouldTimerStart(true)
		setText('')  
		textAreaRef.current.disabled = false
		textAreaRef.current.focus()
	}

	useEffect(() => {
			if (timeRemaining > 0 && shouldTimerStart) {
			setTimeout(() => {
				setTimeRemaining(prevTime => prevTime - 1)
			}, 1000)
			} else if (timeRemaining === 0) {
			endGame()
			}
	  	}, [timeRemaining, shouldTimerStart])

	const endGame = () => {
		setShouldTimerStart(false)
		setCount([countWords(text), countCharacters(text)])
	}
	const countWords = txt => txt.trim().split(/\s+/).length
	const countCharacters = txt => txt.split('').length

  return { 
	text,
	timeRemaining,
	count,
	textAreaRef,
	shouldTimerStart,
	handleChange,
	handlePaste,
	startGame
   }
}

export default useLogic