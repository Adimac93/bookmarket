<script lang="ts">
	import type { Book } from '@prisma/client';

	export let books: Book[];

	let cart = new Set<string>();
	function addBook(id: string) {
		if (cart.has(id)) {
			cart.delete(id);
		} else {
			cart.add(id);
		}
		// trigger an update on cart variable
		cart = cart;
		console.log(cart);
	}
</script>

<ul>
	{#each books as book}
		<div class="book {cart.has(book.id) ? 'marked' : ''}">
			<div class="cover" on:click={() => addBook(book.id)}>
				<img src={book.image} alt="Okładka książki" width="200" height="300" />
				<div class="checkmark">✅</div>
			</div>
			<div class="description">
				<h2>{book.title}</h2>
				<p>{book.author}</p>
			</div>
		</div>
	{:else}
		<h1>No books for ya</h1>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-flow: row wrap;
		list-style: none;
		margin: 0;
		padding: 1em;
		gap: 1em;
		background-color: #fff;
	}
	.book {
		width: 16em;
		height: 30em;
		padding: 1em;
		border-radius: 0.5em;
		background-color: #fff;
		box-shadow: 0 0 1em rgba(0, 0, 0, 0.3);
		transition: 0.2s;
	}
	.book.marked {
		box-shadow: 0 0 1em rgba(0, 128, 0, 0.5);
	}
	.cover {
		width: 14em;
		height: 21em;
		cursor: pointer;
		transition: 0.2s;
	}
	.cover:hover {
		opacity: 90%;
	}
	.marked .cover {
		opacity: 75%;
	}

	.checkmark {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		bottom: 2em;
		left: 2em;
		transform: translate(-50%, -50%);
		width: 3em;
		height: 3em;
		background-color: rgba(255, 255, 255, 0.5);
		border: 1px solid black;
		border-radius: 50%;
		transition: 0.2s;
		opacity: 0;
	}
	.cover:hover .checkmark {
		opacity: 1;
	}
	.marked .checkmark {
		opacity: 1;
		background-color: rgba(0, 255, 0, 0.5);
	}
	img {
		display: block;
		height: 100%;
		width: auto;
		margin: auto;
	}
	h2 {
		margin: 0.5em 0;
		font-size: 1.2em;
	}
	p {
		margin: 0.5em 0;
		font-size: 1em;
	}
	h2,
	p {
		display: block;
	}
	h1 {
		color: gray;
		text-align: center;
		font-size: 50px;
		margin-bottom: -3px;
	}
</style>
