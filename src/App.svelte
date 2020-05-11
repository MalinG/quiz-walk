<script>
	export let title;
	import Location from "./components/Location.svelte"
	import Question from "./components/Question.svelte"
	import { numCorrectQuestions, numTotalQuestions} from './stores.js'

	let showQuestion = true
	let locationComponent

	function handleShowQuestion() {
			showQuestion = true
			console.log('showQuestion')
	}

	function handleQuestionAnswered() {
		showQuestion = false
		console.log('hideQuestion')
	}

</script>

<main>
	<img alt="logo" src="tipspromenix-logo.png" height="120px" />
	<h1>{title}!</h1>
	{#if showQuestion}
		<Question on:continue={handleQuestionAnswered} />
  {/if}
	<div class="count">
		{$numCorrectQuestions} / {$numTotalQuestions}
	</div>
	<Location on:showQuestion={handleShowQuestion} bind:this={locationComponent} />
</main>

<style>
	main {
		color: white;
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		min-height: 100vh;
		background: rgb(156,48,173);
		background: linear-gradient(180deg, rgba(156,48,173,1) 0%, rgba(115,89,254,1) 85%);
	}

	img {
		margin-top: 80px;
	}
	h1 {
		color:white;
		text-transform: uppercase;
		font-size: 40px;
		font-weight: 100;
		margin-top: 8px;
	}

	.count {
		font-size: 18px;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		h1 {
			font-size: 56px;
		}
		main {
			max-width: none;
		}
	}
</style>
