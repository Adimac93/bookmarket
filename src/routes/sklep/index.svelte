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
		<div class="book">
			<div class="cover {cart.has(book.id) ? 'marked' : ''}" on:click={() => addBook(book.id)}>
				<img src={book.image} alt="Okładka książki" />
			</div>

			<div class="description">
				<p class="title">
					{book.title}<br />
					<span class="author">{book.author}</span>
				</p>
			</div>
			{#if cart.has(book.id)}
				<div class="checkmark">✅</div>
			{/if}
		</div>
	{:else}
		<h1>No books for ya</h1>
	{/each}
</ul>

<style>
	.book {
		display: inline-block;
		width: 230px;
		height: auto;
		background-color: white;
		border-radius: 25px;
		box-shadow: 0 0 20px rgb(173, 173, 173);
		margin: 25px;
		padding: 10px 10px 0 10px;
		vertical-align: top;
		transition: height 1s;
	}
	.cover:hover {
		opacity: 90%;
		cursor: pointer;
		transition: max-height 0.3s ease-out;
		height: auto;
		max-height: 600px;
	}
	.cover.marked {
		opacity: 75%;
	}

	.checkmark {
		display: flex;
		justify-content: center;
		margin-bottom: 25px;
	}
	.cover img {
		width: 100%;
	}
	.book p {
		margin-top: 12px;
		font-size: 20px;
	}
	.book .author {
		font-size: 15px;
	}
	h1 {
		color: gray;
		text-align: center;
		font-size: 50px;
		margin-bottom: -3px;
	}
</style>
