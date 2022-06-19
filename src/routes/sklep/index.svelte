<script lang="ts">
	import type { Book } from '@prisma/client';

	export let books: Book[];
</script>

<ul>
	{#each books as book}
		<div>
			<h1>{book.title}</h1>
			<h2>{book.author}</h2>
			<p>{book.description}</p>
			<img src={book.image} alt="Zdjęcie" />
		</div>
	{:else}
		<h1>No books for ya</h1>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-flow: row wrap;
		font-size: 0.8em;
	}
	div {
		width: 20em;
		height: 20em;
		background-color: #fff;
		border-radius: 0.5em;
		padding: 0.5em;
	}
	img {
		width: auto;
		height: auto;
	}
</style>
