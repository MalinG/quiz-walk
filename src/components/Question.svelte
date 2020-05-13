<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { numCorrectQuestions, numTotalQuestions} from '../stores'

  const dispatch = createEventDispatcher();

  let question = ''
  let choices = []
  let correctAnswer
  let status

  onMount(async () => {
		const res = await fetch(`https://opentdb.com/api.php?amount=1&category=9&difficulty=medium`);
    const items = await res.json()
    const item = items.results[0]
    question = item.question;
    choices = shuffle([...item.incorrect_answers, item.correct_answer]);
    correctAnswer = item.correct_answer
  });

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
	}

  function handleSubmitAnswer(answer) {
    if(answer === correctAnswer) {
      status = 'Correct! Well done :)'
      numTotalQuestions.update(existing => existing + 1);
      numCorrectQuestions.update(existing => existing + 1)
    } else {
      status = `Wrong answer. The correct answer is ${correctAnswer}`
      numTotalQuestions.update(existing => existing + 1);
    }
  }

  function handleContinue() {
    dispatch('continue', {})
  }
  // @todo: play sound on displaying question
  // @todo: disable buttons after answer
</script>
<div class="wrapper">
  {#if question}
    <div transition:fly="{{ y: 80, duration: 300 }}" class="question">
      <p>{@html question}</p>

      {#each choices as choice}
        <button on:click={() => handleSubmitAnswer(choice)}>{@html choice}</button>
      {/each}
    </div>
  {:else}
    loading question ...
  {/if}

  {#if status}
    <p>{ status }</p>
    <button class="button--success button--large" on:click={handleContinue}>Fortsätt</button>
  {/if}

</div>

<style>
  .wrapper {
    margin: 40px auto;
    max-width: 640px;
  }
  button {
    margin: 8px;
  }

  p {
    margin: 16px 0;
  }
</style>
