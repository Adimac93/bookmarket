<script lang="ts">
	import { afterUpdate } from 'svelte';

	export let placeholder: string;
	export let choices: string[];
	export let value = -1;
	export let kontynuacja = false;
	$: choices,
		(value = -1),
		(active = true),
		setTimeout(() => console.log('c', choices, list?.scrollHeight));

	let active = true;
	// $: active = value === -1;

	let list: HTMLUListElement;
	let scrollHeight = '';
	// $: (scrollHeight = list ? (active ? list.scrollHeight + 'px' : '0') : '');
	afterUpdate(() => (scrollHeight = active ? list.scrollHeight + 'px' : '0'));
</script>

<div class="wrapper" class:active>
	<div class="header" on:click={() => (active = !active)}>
		<span class="id">1</span>
		<span class="value"
			>{value > -1
				? `${choices[value]} - ${kontynuacja ? 'kontynuacja' : 'od zera'}`
				: placeholder}</span
		>
		<div class="img" style:display={value === -1 ? 'none' : 'flex'}>
			<img src="/tick.svg" alt="tick" />
		</div>
	</div>
	<ul bind:this={list} style:max-height={scrollHeight}>
		{#each choices as name, i}
			<li>
				<p
					on:click={() => {
						value = i;
						kontynuacja = false;
						active = false;
					}}
				>
					Od zera
				</p>
				<h6 on:click|stopPropagation>{name}</h6>
				<p
					on:click={() => {
						value = i;
						kontynuacja = true;
						active = false;
					}}
				>
					Kontynuacja
				</p>
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
	span.value {
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
	img {
		display: block;
		width: 1.4rem;
		height: 1.4rem;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0 0.5rem;
		overflow: hidden;
		transition: max-height 0.3s;
	}
	li {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0;
		border-top: 1px solid #ccc;
		font-size: 1rem;
	}
	li:first-child {
		border-top: none;
	}
	h6 {
		flex: 1 1 0;
		margin: 0;
		font-size: 1rem;
		font-weight: normal;
		text-align: center;
	}
	p {
		flex: 1 1 0;
		margin: 0;
		padding: 1rem;
		font-size: 0.8rem;
		color: #444;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
	p:last-child {
		text-align: right;
	}
</style>
