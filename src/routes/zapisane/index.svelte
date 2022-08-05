<script lang="ts">
	import type { KsiążkiSzkoły } from './_data';
	import Select from './_Select.svelte';
	import SelectLang from './_SelectLang.svelte';
	export let data: KsiążkiSzkoły;

	const profileMap: [string, string][] = data.profile.map(({ nazwa, opis }) => [nazwa, opis]);
	const językiMap = data.języki.map(({ nazwa }) => nazwa);

	let profil: number;
	let język: number;
	$: active = profil !== -1 && język !== -1;
</script>

<div>
	<Select placeholder="Profil" bind:value={profil} choices={profileMap} />
	<SelectLang placeholder="Język obcy" bind:value={język} choices={językiMap} />
	<button class:active>Stwórz zamówienie</button>
	{#if profil !== -1 && język !== -1}
		<!-- {#await fetch('/').then((r) => r.json())}{/await} -->
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-flow: column nowrap;
		padding: 0.5rem;
		gap: 0.5rem;
	}
	button {
		appearance: none;
		border: none;
		margin: 0;
		padding: 0.8rem;
		font-size: 1rem;
		border-radius: 0.5rem;
		background-color: #aaa;
		color: #000;
		transition: 0.4s;
		cursor: pointer;
	}
	button.active {
		background-color: #f50;
		color: #fff;
	}
</style>
