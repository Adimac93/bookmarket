<script lang="ts">
	import type { Book } from '@prisma/client';

	export let book: Book;
</script>

<li class="book">
	<div class="cover">
		<img
			src="https://cf-taniaksiazka.statiki.pl/images/large/{book.image}"
			alt="Okładka książki"
			width="200"
			height="300"
		/>
	</div>
	<div class="info">
		<h1>{book.title}</h1>
		<span>{book.id}</span>
		<span>{book.grade}</span>
		<span>{book.subject}</span>
	</div>
</li>

<style>
	button {
		appearance: none;
		margin: 0;
		padding: 0;
		border: none;
		cursor: pointer;
	}
	.book {
		/* width: 11.8em; */
		/* flex: 1 1 10em; */
		height: fit-content;
		display: flex;
		padding: 0.4em;
		gap: 0.4em;
		border-bottom: 1px solid #ddd;
		/* border-radius: 0.5em; */
		background-color: #fff;
		transition: 0.2s;
	}
	.cover {
		flex: 0 0 4em;
		height: 6em;
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
		display: block;
		margin: 0.2rem 0;
		font-size: 1rem;
		font-weight: normal;
	}
	span {
		display: block;
		font-size: 0.8rem;
	}
</style>
