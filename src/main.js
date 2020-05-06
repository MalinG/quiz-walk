import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: 'Tipspromenix',
		name: 'world'
	}
});

export default app;
