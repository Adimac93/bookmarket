<script lang="ts">
	import type { Condition, Book as BookType } from '@prisma/client';
	import Book from '$lib/store/Book.svelte';

	export let books: BookType[];

	let defaultCondition: Condition = 'NEW';

	let cart = new Set<string>();

	let coverId: string | null = null;
	const displayCover = (id: string) => () => {
		coverId = id;
	};
</script>

{#if coverId}
	<div class="cover" on:click={() => (coverId = null)}>
		<img
			src="https://bigimg.taniaksiazka.pl/images/popups/{coverId}"
			alt="Powiększone zdjęcie okładki"
		/>
	</div>
{/if}
<ul>
	{#each books as book}
		<Book {cart} {book} condition={defaultCondition} {displayCover} />
	{:else}
		<h1>No books for ya</h1>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-flow: row wrap;
		list-style: none;
		margin: 0 auto;
		padding: 0.5em;
		gap: 0.5em;
		background-color: #ddd;
	}
	h1 {
		color: gray;
		text-align: center;
		font-size: 50px;
		margin-bottom: -3px;
	}
	div {
		position: fixed;
		z-index: 1;
		width: 100vw;
		height: 100%;
		display: flex;
		place-content: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
	div img {
		margin: 1em;
		object-fit: contain;
	}
</style>
