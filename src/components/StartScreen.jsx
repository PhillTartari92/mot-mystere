import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Cliquez sur le bouton pour commencer</p>
        <button onClick={startGame}>Start</button>
    </div>
  )
}

export default StartScreen