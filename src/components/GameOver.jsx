import './GameOver.css'

const GameOver = ({retry,score}) => {
  return (
    <div>
        <h1>Fin du jeu</h1>
        <h2>Votre score: <span>{score}</span></h2>
        <button onClick={retry}>Recommencez</button>
    </div>
  )
}

export default GameOver