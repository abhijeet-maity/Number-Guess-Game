import { useState, useEffect } from 'react'

import './App.css'

function App() {

  const [inputNumber, setInputNumber] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const [isLarge, setIsLarge] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [countGuess, setCountGuess] = useState(1);
  const [emoji, setEmoji] = useState("");

  function generateRandomNumber() {
    const number = Math.floor(Math.random() * 100);
    setRandomNumber(number);
  }

  useEffect(() => {
    generateRandomNumber(); //
  },[]);

  function handleChange(event) {
    const num = Number(event.target.value);  
    console.log(num);
    setInputNumber(num);
  }

  function randomEmoji(value) {
    console.log("random wromg emojis");
    const happyEmojis = [
      "😀", "👑", "🏆", "🚀", "😃", "😄","🥰", "😊", "😋","👻"
    ];
    const otherEmojis = [
      "😢", "😡", "👊", "💀", "👡", "❌", "😒", "🙄", "😟","😔","😫"
    ];
    if(value){
      
      let index = Math.floor(Math.random()*happyEmojis.length);
      let element = happyEmojis[index];
      setEmoji(element);
    } else {
      
      let index = Math.floor(Math.random()*otherEmojis.length);
      let element = otherEmojis[index];
      setEmoji(element);
    }
  }

  function checkNumber() {

    if(inputNumber < randomNumber) {
      setIsSmall(true);
      setIsLarge(false);
      setCountGuess((prev) => prev + 1);
      setInputNumber("");
      randomEmoji(isCorrect);
    } else if (inputNumber > randomNumber) { 
      setIsSmall(false);
      setIsLarge(true);
      setInputNumber("");
      setCountGuess((prev) => prev + 1);
      randomEmoji(isCorrect);
    } else {
      setIsSmall(false);
      setIsLarge(false);
      setIsCorrect(true);
      randomEmoji(true);
    }
  }

  function reset() {
    console.log("reset");
    setInputNumber(0);
    setIsSmall(false);
    setIsLarge(false);
    setCountGuess(1);
    setIsCorrect(false);
    generateRandomNumber();
  }

  return (
    <div className='app'> 
        <h1>Number Guess Game🧠🎯</h1>
        <div className='main-section'>
          <section className='input-section'>
            <label htmlFor="number">Guess a Number between 0 and 100</label>
            <input className="input" type="number" name="number" placeholder='Enter your Guess' onChange={handleChange} value={inputNumber}/>
          </section>
          <section className='btn-section'>
            <button className="reset" onClick={reset}>Reset</button>
            <button className="check" onClick={checkNumber}>Check</button>
          </section>
        </div>
        <section className='result-section'>
          {isSmall && (
            <div className='result'>
              <h4><span className='red'>Wrong Guess!!!</span></h4>
              <h4>Number is smaller than actual number</h4>
              <h4>Try again...</h4>
              <p>{emoji}</p>
            </div>
            
          )}
          {isLarge && (
            <div className='result'>
              <h4><span className='red'>Wrong Guess!!!</span></h4>
              <h4>Number is larger than actual number</h4>
              <h4>Try again...</h4>
              <p>{emoji}</p>
            </div>
            
          )}
          {isCorrect && (
            <div className='result'>
              <p>{emoji}</p>
              <h3>👏<span className='green'>Congratulations</span>, Correct Guess</h3>
              <h4>You Guessed it in <span className='green'>{countGuess}</span> attempts</h4>
            </div>
          )}
        </section>
    </div>
  )
}

export default App
