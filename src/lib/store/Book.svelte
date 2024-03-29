<script lang="ts">
	import type { Book, Condition } from '@prisma/client';

	export let cart: Set<string>;
	export let book: Book;
	export let condition: Condition;
	export let displayCover: (id: string) => () => void;

	$: inCart = cart.has(book.isbn);

	const priceMapping: { [K in Condition]: number } = {
		NEW: 32,
		GOOD: 26,
		DAMAGED: 20,
		BAD: 12,
	};

	const nextCondition = () => {
		condition =
			condition === 'NEW'
				? 'GOOD'
				: condition === 'GOOD'
				? 'DAMAGED'
				: condition === 'DAMAGED'
				? 'BAD'
				: 'NEW';
	};

	const addBook = (id: string) => {
		if (cart.has(id)) {
			cart.delete(id);
		} else {
			cart.add(id);
		}
		// trigger an update on cart variable
		cart = cart;
		console.log(cart);
	};
</script>

<div class="book {inCart ? 'marked' : ''}">
	<div class="cover">
		<img
			on:click={displayCover(book.image)}
			src="https://cf-taniaksiazka.statiki.pl/images/large/{book.image}"
			alt="Okładka książki"
			width="200"
			height="300"
		/>
	</div>
	<div class="info">
		<h1>{book.title}</h1>
		<p>{book.author}</p>
		<div class="tags">
			{#each [book.grade, book.subject, book.isbn] as tag}
				<span class="tag">{tag.toLowerCase()}</span>
			{/each}
		</div>
		<div class="actions">
			<div class="condition">
				<span class="price">{priceMapping[condition]} zł</span>
				<button
					class="condition"
					style:--color={condition === 'NEW'
						? '#080'
						: condition === 'GOOD'
						? '#880'
						: condition === 'DAMAGED'
						? '#a60'
						: '#d20'}
					on:click={nextCondition}>{condition}</button
				>
			</div>
			<button class="cart" on:click={() => addBook(book.isbn)}
				><img src="/shopping-bag.svg" alt="shopping-bag" /></button
			>
		</div>
	</div>
</div>

<style>
	button {
		appearance: none;
		margin: 0;
		padding: 0;
		border: none;
		cursor: pointer;
	}
	.book {
		width: 24em;
		height: fit-content;
		display: flex;
		padding: 0.5em;
		gap: 0.5em;
		border-bottom: 1px solid #ddd;
		border-radius: 0.5em;
		background-color: #fff;
		transition: 0.2s;
	}
	.cover {
		flex: 0 0 6em;
		height: 9em;
		cursor: pointer;
		transition: 0.2s;
	}
	.cover:hover {
		opacity: 90%;
	}
	img {
		display: block;
		margin: auto;
		object-fit: contain;
		height: 100%;
		width: 100%;
	}
	.info {
		position: relative;
		flex: 1;
	}
	h1 {
		font-size: 1.2em;
		margin: 0.2em 0;
	}
	p {
		font-size: 0.8em;
		margin: 0.2em 0;
	}
	h1,
	p {
		display: block;
	}
	div.actions {
		position: absolute;
		bottom: 0.5em;
		display: flex;
		align-items: flex-end;
		gap: 0.5em;
		height: fit-content;
		width: 100%;
	}
	div.condition {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
	span.price {
		display: block;
		width: 4ch;
		margin-bottom: 0.1em;
		text-align: right;
		font-size: 1.5em;
		font-weight: 500;
	}
	button.condition {
		width: 7em;
		height: 2em;
		border: 2px solid;
		border-radius: 3em;
		border-color: var(--color);
		background-color: #fff;
		color: #000;
		font-weight: 600;
		transition: 0.2s;
	}
	button.condition:hover {
		background-color: var(--color);
		color: #fff;
	}
	button.cart {
		width: 4em;
		height: 4em;
		margin-left: auto;
		border: 2px solid;
		border-radius: 50%;
		border-color: #ccc;
		background-color: #fff;
		color: #000;
		font-weight: 600;
		transition: 0.2s;
	}
	.marked button.cart {
		background-color: #0a0;
		color: #fff;
		border-color: #0a0;
	}
	button.cart img {
		width: 45%;
		height: 45%;
	}
	.marked button.cart img {
		filter: invert(1);
	}

	div.tags {
		display: flex;
		flex-flow: row wrap;
		gap: 0.2em;
		margin: 0.5em 0;
	}
	span.tag {
		padding: 0.2em 0.5em;
		font-size: 0.7em;
		background-color: #ddd;
		border-radius: 2em;
		cursor: pointer;
		transition: 0.2s;
	}
	span.tag:hover {
		background-color: #ccc;
	}
</style>
