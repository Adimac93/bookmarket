<script lang="ts">
	// https://stackoverflow.com/a/37511463
	import fuzzysort from 'fuzzysort';
	import { createEventDispatcher } from 'svelte';
	export let id: number;
	export let label: string;
	export let choices: [string, string][];
	export let current: number;
	export let filled: number;
	$: active = current === id;
	let internalvalue = '';
	let lastValue = '';
	export let value = internalvalue;

	const normalize = (str: string) => str.normalize('NFKD').replace('ł', 'l'); //.replace(/\p{Diacritic}/gu, '');

	function prepare(newChoices: [string, string][]) {
		internalvalue = '';
		return newChoices.map((choice, id) => ({
			id,
			original: choice,
			prepared: fuzzysort.prepare(normalize(choice[0])),
		}));
	}

	$: prepared = prepare(choices);

	function filter(newValue: string, prepared: ReturnType<typeof prepare>) {
		return fuzzysort.go(normalize(newValue), prepared, {
			limit: 20,
			all: true,
			key: 'prepared',
		});
	}

	$: filtered = fuzzysort.go(normalize(internalvalue), prepared, {
		limit: 20,
		all: true,
		key: 'prepared',
	});

	const dispatch = createEventDispatcher<{ select: number }>();

	const selectChoice = (i: number) => () => {
		internalvalue = choices[i][0];
		if (internalvalue === lastValue) {
			current = filled + 1;
			return;
		}
		value = lastValue = internalvalue;
		filled = id;
		current++;
		dispatch('select', i);
	};
</script>

<div class="wrapper" class:active>
	<div class="header">
		<span class="id">{id}</span>
		<label>
			<input type="text" placeholder={label} bind:value={internalvalue} on:focus />
		</label>
		{#if active}
			<div class="img" on:click={() => (internalvalue = '')}>
				<img src="/x.svg" alt="x-zamknij" />
			</div>
		{:else}
			<div class="img">
				<img src="/chevron/down.svg" alt="tick" />
			</div>
		{/if}
	</div>
	<ul>
		{#each filtered as choice}
			<li on:click={selectChoice(choice.obj.id)}>
				<h1>{choice.obj.original[0]}</h1>
				<p>{choice.obj.original[1]}</p>
			</li>
		{/each}
	</ul>
</div>

<style>
	div.wrapper {
		border-radius: 0.5rem;
		background-color: #fff;
	}
	div.header {
		display: flex;
		justify-content: stretch;
		align-items: center;
		height: 3rem;
	}
	.active div.header {
		border-bottom: 1px solid #ccc;
	}
	span.id {
		display: flex;
		flex: 0 0 2rem;
		place-items: center;
		place-content: center;
	}
	label {
		display: flex;
		justify-content: flex-start;
		flex: 1 1 0;
	}
	div.img {
		display: flex;
		flex: 0 0 3rem;
		place-items: center;
		place-content: center;
		cursor: pointer;
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
		padding: 0 0.5rem;
	}
	.active ul {
		display: block;
	}
	li {
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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
