<script lang="ts">
	import type { KsiążkiSzkoły } from './_data';
	import Select from './_Select.svelte';
	import SelectLang from './_SelectLang.svelte';
	export let data: KsiążkiSzkoły;

	const profileMap: [string, string][] = data.profile.map(({ nazwa, opis }) => [nazwa, opis]);
	const językiMap = data.języki.map(({ nazwa }) => nazwa);

	let profil: number;
	let język: number;
</script>

<div>
	<Select placeholder="Profil" bind:value={profil} choices={profileMap} />
	<SelectLang placeholder="Język obcy" bind:value={język} choices={językiMap} />
</div>

<style>
	div {
		display: flex;
		flex-flow: column nowrap;
		padding: 0.5rem;
		gap: 0.5rem;
	}
</style>
