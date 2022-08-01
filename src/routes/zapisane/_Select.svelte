<script lang="ts">
	// https://stackoverflow.com/a/37511463
	import fuzzysort from 'fuzzysort';
	import { createEventDispatcher } from 'svelte';
	export let id: string;
	export let label: string;
	export let choices: string[];
	let value = '';
	let active = true;

	const normalize = (str: string) => str.normalize('NFKD'); //.replace(/\p{Diacritic}/gu, '');

	const prepared = choices.map((choice) => ({
		original: choice,
		prepared: fuzzysort.prepare(normalize(choice)),
	}));
	$: filtered = fuzzysort.go(normalize(value), prepared, {
		limit: 20,
		all: true,
		key: 'prepared',
	});

	const dispatch = createEventDispatcher<{ select: string }>();

	const onClick = (thisValue: string) => () => {
		value = thisValue;
		dispatch('select', thisValue);
	};
</script>

<div class="wrapper" class:active>
	<label name={label}>
		<input type="text" placeholder={label} bind:value />
		<img src="/chevron/down.svg" alt="strzałka w dół" />
	</label>
	<div class="dropdown">
		<ul>
			{#each filtered as choice}
				<li on:click={onClick(choice.obj.original)}>
					<span>{choice.obj.original}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.wrapper {
		position: relative;
		width: 15rem;
	}
	.wrapper:focus-within {
		/* outline: 1px solid #adf; */
	}
	.dropdown {
		display: none;
		position: absolute;
		width: 100%;
		margin-top: 0.2rem;
		padding: 0 0.5rem;
		border-radius: 0.3rem;
		background-color: #fff;
		max-height: 20rem;
		overflow-y: scroll;
	}
	.wrapper:focus-within .dropdown {
		display: block;
		box-shadow: 0 0 0.2em 0 rgba(0, 0, 0, 0.4);
	}
	label {
		display: flex;
		flex-flow: row nowrap;
		margin: 0;
		padding: 0.2rem;
		background-color: #fff;
		border-radius: 0.3rem;
		cursor: pointer;
	}
	label:focus-within {
		box-shadow: 0 0 0.2em 0 rgba(0, 0, 0, 0.4);
	}
	input {
		display: block;
		margin: 0;
		padding: 0.3rem;
		width: 100%;
		border: none;
		border-radius: 0.3rem;
		font-size: 1rem;
		background-color: transparent;
	}
	input:focus {
		outline: none;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		/* border-top: 1px solid #ccc; */
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
</style>
