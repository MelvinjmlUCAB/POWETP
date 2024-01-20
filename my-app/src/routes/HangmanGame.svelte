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
    /* Add your CSS styles here */
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
  