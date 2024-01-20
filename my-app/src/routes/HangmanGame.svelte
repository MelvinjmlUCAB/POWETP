<script>
    import { onMount } from 'svelte';
    // @ts-ignore
    import { io } from 'socket.io-client';
  
    let word = '';
    /**
     * @type {any[]}
     */
    let hiddenWord = [];
    /**
     * @type {any[]}
     */
    let guessedLetters = [];
    let incorrectAttempts = 0;
    let maxAttempts = 6;
    let isGameOver = false;
  
    const socket = io('http://localhost:3000');
  
    socket.on('startGame', (/** @type {string} */ newWord) => {
      word = newWord.toUpperCase();
      hiddenWord = Array(word.length).fill('_');
    });
  
    socket.on('guessLetter', (/** @type {string} */ letter) => {
      if (!isGameOver && guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
  
        if (word.includes(letter)) {
          word.split('').forEach((char, index) => {
            if (char === letter) {
              hiddenWord[index] = letter;
            }
          });
        } else {
          incorrectAttempts += 1;
        }
  
        checkGameStatus();
      }
    });
  
    const fetchWord = async () => {
      const response = await fetch('https://api.example.com/word');
      const data = await response.json();
      const newWord = data.word;
      socket.emit('startGame', newWord);
    };
  
    const handleLetterGuess = (/** @type {string} */ letter) => {
      socket.emit('guessLetter', letter);
    };
  
    const checkGameStatus = () => {
      if (hiddenWord.join('') === word) {
        isGameOver = true;
        alert('You win!');
      } else if (incorrectAttempts >= maxAttempts) {
        isGameOver = true;
        alert('Game over. The word was: ' + word);
      }
    };
  
    onMount(fetchWord);
  </script>
  
  <style>
   div {
    font-family: 'Arial', sans-serif;
    text-align: center;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #333;
  }

  p {
    margin: 10px 0;
  }

  button {
    font-size: 16px;
    margin: 5px;
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #45a049;
  }

  .game-over {
    color: red;
    font-weight: bold;
    font-size: 20px;
  }
</style>

<div>
  <h1>Hangman Game</h1>
  <p>Incorrect Attempts: {incorrectAttempts}/{maxAttempts}</p>
  <p>Guessed Letters: {guessedLetters.join(', ')}</p>
  <p>{hiddenWord.join(' ')}</p>
  {#if !isGameOver}
    <div>
      {#each 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' as letter}
        <button on:click={() => handleLetterGuess(letter)}>{letter}</button>
      {/each}
    </div>
  {:else}
    <p class="game-over">{isGameOver ? 'Game Over' : 'You Win!'}</p>
  {/if}
</div>
 </style>
  
  <div>
    <h1>Hangman Game</h1>
    <p>Incorrect Attempts: {incorrectAttempts}/{maxAttempts}</p>
    <p>Guessed Letters: {guessedLetters.join(', ')}</p>
    <p>{hiddenWord.join(' ')}</p>
    {#if !isGameOver}
      <div>
        {#each 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' as letter}
          <button on:click={() => handleLetterGuess(letter)}>{letter}</button>
        {/each}
      </div>
    {/if}
  </div>
  