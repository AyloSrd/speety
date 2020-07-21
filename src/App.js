import React, { useState, useEffect, useRef } from 'react'
import './index.css'

const App = () => {
  const TIMER_DURATION = 3
  
  const [text, setText] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION)
  const [shouldTimerStart, setShouldTimerStart] = useState(false)
  const [count, setCount] = useState([0, 0])
  const textAreaRef = useRef(null)

  const handleChange = (e) => {
    const { value } = e.target
    setText(value)
  }

const startGame =() => {
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

  return(
    <>
      <h1>Speety</h1>
      <textarea 
        onChange={handleChange} 
        value={text} 
        disabled={!shouldTimerStart}
        ref={textAreaRef}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={shouldTimerStart} >Start timer!</button>
      <h1>Word count: {count[0]}</h1>
      <h1>Character count: {count[1]}</h1>
    </>
  )
}

export default App
