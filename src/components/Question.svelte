<script>
  import { onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let question = ''
  let choices = []
  let correctAnswer
  let status
  let numAnsweredQuestions = 0
  let numTotalQuestions = 0

  onMount(async () => {
		const res = await fetch(`https://opentdb.com/api.php?amount=1&difficulty=medium`);
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
      status = 'Rätt svar! Bra jobbat'

      numAnsweredQuestions ++
      numTotalQuestions ++

      // Todo: update point and number of answered questions
    } else {
      status = `Fel svar. Rätt svar är ${correctAnswer}`
      // Todo: update number of answered questions
      numTotalQuestions ++
    }
  }

  function handleContinue() {
    dispatch('continue', {})
  }

</script>
<div>
  {#if question}
    <p>{@html question}</p>

    {#each choices as choice}
      <button on:click={() => handleSubmitAnswer(choice)}>{@html choice}</button>
    {/each}

  {:else}
    laddar fråga ...
  {/if}

  {#if status}
    <p>{ status }</p>
    <button class="button--success button--large" on:click={handleContinue}>Fortsätt</button>
  {/if}

  {#if numTotalQuestions}
    <p>{numAnsweredQuestions} / {numTotalQuestions}</p>
  {/if}
</div>

<style>
  div {
    margin: 40px auto;
    max-width: 640px;
  }
  button {
    margin: 16px 8px;
  }

  p {
    margin: 16px 0;
  }
</style>
