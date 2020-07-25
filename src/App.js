import React from 'react'
import './index.css'
import useLogic from './hooks/useLogic'

const App = () => {
  
  const { 
    text,
    timeRemaining,
    count,
    textAreaRef,
    shouldTimerStart,
    handleChange,
    handlePaste,
    startGame
  } = useLogic()
  
  return(
    <>
      <h1>Speety</h1>
      <textarea 
        onChange={handleChange} 
        value={text} 
        disabled={!shouldTimerStart}
        ref={textAreaRef}
        onPaste={handlePaste}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={shouldTimerStart} >Start timer!</button>
      <h1>Word count: {count[0]}</h1>
      <h1>Character count: {count[1]}</h1>
    </>
  )
}

export default App
