<script lang="ts">
	import type { Book, BookForSale } from '@prisma/client';
	import FloatingAnchor from '$lib/floating/FloatingAnchor.svelte';
	import BookComponent from '$lib/book/Row.svelte';
	import LargeCover from '$lib/book/LargeCover.svelte';

	export let books: (BookForSale & {
		book: Book;
	})[] = [];

	const booksExpanded = books
		.map((book) => Array.from<Book>({ length: book.count }).fill(book.book))
		.flat();
</script>

<ul>
	{#each booksExpanded as book}
		<BookComponent {book} />
	{:else}
		<h1>Nie wystawiłeś jeszcze na sprzedaż żadnych książek.</h1>
	{/each}
</ul>

<FloatingAnchor href="/sprzedaj/dodaj">
	<img src="/plus.svg" alt="plus" style:filter="invert(1)" />
</FloatingAnchor>

<LargeCover />

<style>
	ul {
		display: flex;
		flex-flow: column;
		margin: 0;
		padding: 0.4rem;
		gap: 0.4rem;
		list-style: none;
	}
</style>
