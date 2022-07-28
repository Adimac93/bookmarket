<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Tapbar from '$lib/tapbar/Tapbar.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<Tapbar />

<style>
	main {
		margin-bottom: 3rem;
	}
</style>
