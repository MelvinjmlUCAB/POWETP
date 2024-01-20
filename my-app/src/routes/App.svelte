<script>
  import HangmanGame from './HangmanGame.svelte';

  let startGame = false;

  const startNewGame = () => {
    startGame = true;
  };
</script>

{#if startGame}
  <HangmanGame />
{:else}
  <button on:click={startNewGame}>Start New Game</button>
{/if}
