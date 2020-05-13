<script>
	export let title;
	import Location from "./components/Location.svelte"
	import Question from "./components/Question.svelte"
	import { numCorrectQuestions, numTotalQuestions} from './stores.js'

	let showQuestion = false
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
	<button on:click={handleShowQuestion}>Show question</button>
</main>

<style>
	main {
		color: white;
		text-align: center;
		margin: 0 auto;
		padding: 0 16px;
		min-height: 100vh;
		background: rgb(156,48,173);
		background: linear-gradient(180deg, rgba(156,48,173,1) 0%, rgba(115,89,254,1) 85%);
	}

	img {
		margin-top: 48px;
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

	button {
		background: transparent;
		position: absolute;
		bottom: 0;
		right: 0;
		font-weight: 100;
		font-size: 14px;
	}

	@media (min-width: 640px) {
		h1 {
			font-size: 56px;
		}
		main {
			max-width: none;
		}

		img {
			margin-top: 80px;
		}
	}
</style>
