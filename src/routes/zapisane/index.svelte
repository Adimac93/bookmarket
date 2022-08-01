<script lang="ts">
	import AccordionDesc from './_AccordionDesc.svelte';
	import { miastoWojewództwo, szkoły } from './_data';

	let current = 1;
</script>

<div>
	<AccordionDesc id={1} bind:current label="Miasto" choices={miastoWojewództwo} />
	<AccordionDesc id={2} bind:current label="Szkoła" choices={szkoły} />
</div>

<style>
	div {
		display: flex;
		flex-flow: column nowrap;
		padding: 0.5rem;
		gap: 0.5rem;
	}
</style>
