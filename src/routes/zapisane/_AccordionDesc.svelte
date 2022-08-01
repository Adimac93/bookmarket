<script lang="ts">
	// https://stackoverflow.com/a/37511463
	import fuzzysort from 'fuzzysort';
	import { createEventDispatcher } from 'svelte';
	export let id: number;
	export let label: string;
	export let choices: [string, string, string][];
	export let current: number;
	$: active = current === id;
	let internalvalue = '';
	export let value = internalvalue;

	const normalize = (str: string) => str.normalize('NFKD'); //.replace(/\p{Diacritic}/gu, '');

	let prepared: {
		id: number;
		original: [string, string, string];
		prepared: Fuzzysort.Prepared;
	}[] = [];

	$: {
		prepared = choices.map((choice, id) => ({
			id,
			original: choice,
			prepared: fuzzysort.prepare(normalize(choice[0])),
		}));
		// internalvalue = '';
	}

	$: filtered = fuzzysort.go(normalize(internalvalue), prepared, {
		limit: 20,
		all: true,
		key: 'prepared',
	});

	const dispatch = createEventDispatcher<{ select: string }>();

	const selectChoice = (thisValue: [string, string, string]) => () => {
		value = internalvalue = thisValue[0];
		current++;
		dispatch('select', internalvalue);
	};
</script>

<label on:click={() => (current = id)}>
	<span>{id}</span>
	<input type="text" placeholder={label} bind:value={internalvalue} />
	{#if active}
		<div on:click={() => (internalvalue = '')}>
			<img src="/x.svg" alt="x-zamknij" />
		</div>
	{:else}
		<div>
			<img src="/chevron/down.svg" alt="strzałka w dół" />
		</div>
	{/if}
</label>
<ul class:active>
	{#each filtered as choice}
		<li on:click={selectChoice(choice.obj.original)}>
			<h1>{choice.obj.original[0]}</h1>
			<p>{choice.obj.original[2]}<!--, powiat {choice.obj.original[1]}--></p>
		</li>
	{/each}
</ul>

<style>
	label {
		display: flex;
		justify-content: stretch;
		align-items: center;
		background-color: #fff;
		height: 3rem;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}
	span {
		display: flex;
		flex: 0 0 2rem;
		place-items: center;
		place-content: center;
	}
	div {
		display: flex;
		flex: 0 0 3rem;
		place-items: center;
		place-content: center;
	}
	input {
		display: block;
		flex: 1 1 0;
		padding: 0.5rem;
		height: 2rem;
		border: none;
		/* border-bottom: 1px solid #ccc; */
		font-size: 1rem;
	}
	img {
		display: block;
		width: 1.4rem;
		height: 1.4rem;
	}
	ul {
		display: none;
		list-style: none;
		margin: 0;
		padding: 0 2rem;
		background-color: #fff;
	}
	ul.active {
		display: block;
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin: 0;
		padding: 0.5rem;
		border-top: 1px solid #ccc;
		font-size: 1rem;
		cursor: pointer;
	}
	li:first-child {
		border-top: none;
	}
	h1 {
		margin: 0;
		font-size: 1rem;
		font-weight: normal;
	}
	p {
		margin: 0;
		font-size: 0.8rem;
		color: #444;
	}
</style>
