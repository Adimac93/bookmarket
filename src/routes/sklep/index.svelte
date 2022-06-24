<script lang="ts">
	import type { Condition, Book as BookType } from '@prisma/client';
	import Book from '$lib/store/Book.svelte';

	export let books: BookType[];

	let defaultCondition: Condition = 'NEW';

	let cart = new Set<string>();
</script>

<ul>
	{#each books as book}
		<Book {cart} {book} condition={defaultCondition} />
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
</style>
