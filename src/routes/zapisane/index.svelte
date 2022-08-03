<script lang="ts">
	import Select from './_Select.svelte';
	import SelectLang from './_SelectLang.svelte';

	const profile: [string, string][] = [
		['Przemysł przyszłości', 'Matematyka, fizyka, informatyka'],
		['Programowanie', 'Matematyka, informatyka, język angielski'],
		['Architektura i budownictwo', 'Matematyka, fizyka, geografia'],
	];

	const języki = ['Niemiecki', 'Rosyjski'];

	let iter = 0;
	let choices = profile.filter((_, i) => i !== iter);
	let profil: number;
	let język: number;
</script>

<button
	on:click={() => (
		(iter = (((iter + 1) % 4) + 4) % 4),
		(choices = profile.filter((_, i) => i !== iter)),
		console.log('p', choices)
	)}>reset</button
>
<div>
	<Select placeholder="Profil" bind:value={profil} choices={profile} />
	<SelectLang placeholder="Język obcy" bind:value={język} choices={języki} />
</div>

<style>
	div {
		display: flex;
		flex-flow: column nowrap;
		padding: 0.5rem;
		gap: 0.5rem;
	}
</style>
