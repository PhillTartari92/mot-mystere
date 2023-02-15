//CSS
import './App.css';

//REACT
import { useCallback,useEffect,useState} from 'react';

//data
import {wordList} from './data/words'

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  {id: 1 ,name: "start"},
  {id: 2 ,name: "game"},
  {id: 3 ,name: "end"}
]

const guessesQty = 3;


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)

  const[words] = useState(wordList)

  const[pickedWord, setPickedWord] = useState('')
  const[pickedCategory, setPickedCategory] = useState('')
  const[letters, setLetters] = useState([])

  const [guessedLetters, setguessedLetters] = useState([]);
  const [wrongLetters,setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(50)
  
  const pickWordAndCategory = useCallback(() =>{
    //Pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)

    //Pick a random word

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)

    return {word, category}
  },[words]);



  //Starts Secret Word Game
  const startGame = useCallback(() =>{
   //Clear all letters 
   clearLetterStates();

   //PIck wor an pick category
   const {word, category} = pickWordAndCategory();

   //Create an Array of letters
   let wordLetters = word.split('');
   wordLetters =wordLetters.map((l) => l.toLowerCase());

   console.log(word,category)
   console.log(wordLetters)

   //Fill States
   setPickedWord(word);
   setPickedCategory(category);
   setLetters(wordLetters)

    setGameStage(stages[1].name)
  },[pickWordAndCategory]);

  //Process The Letter Input

   const verifyLetter = (letter)=>{
    const normalizedLetter = letter.toLowerCase();

    //Check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) ||
    wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
//push guessed letter or removed a guess
if(letters.includes(normalizedLetter)) {
  setguessedLetters((actualGuessedLetters) =>[
    ...actualGuessedLetters,
    normalizedLetter
  ]);
}else{
  setWrongLetters((actualWrongLetters) =>[
    ...actualWrongLetters,
    normalizedLetter
  ]);
  setGuesses((actualGuesses) => actualGuesses - 1);
 }
};

const clearLetterStates = () => {
  setguessedLetters([])
  setWrongLetters([])
};

//Check if guesses ended

useEffect(()=> {

  if(guesses <= 0){
    //reset all stages
    clearLetterStates();

    setGameStage(stages[2].name)
  }

},[guesses]);

//Check win condition

useEffect(()=>{

 const uniqueLetters = [...new Set(letters)]

 //win condition
 if(guessedLetters.length === uniqueLetters.length){
  //add score
  setScore((actualScore)=> actualScore += 100)

  startGame();
 }

},[guessedLetters,letters, startGame])

   //Restarts The Game

   const retry = () => {

    setScore(0);
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
   }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}

      {gameStage === 'game' && 
      (<Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />)}

      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
