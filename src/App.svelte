<script>
	export let title;
	import Map from "./components/Map.svelte"

</script>

<main>
	<h1>{title}!</h1>
	<Map />
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

	h1 {
		color:white;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
