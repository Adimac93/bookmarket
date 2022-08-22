<script lang="ts">
	import type { UserBook, Book } from '@prisma/client';

	export let userBook: UserBook & { book: Book };
</script>

<div class="book">
	<div class="cover">
		<img
			src="https://cf-taniaksiazka.statiki.pl/images/large/{userBook.book.image}"
			alt="Okładka książki"
			width="200"
			height="300"
		/>
	</div>
	<div class="info">
		<h1>{userBook.book.title}</h1>
		<p>{userBook.book.author}</p>
		<div class="tags">
			{#each [userBook.book.grade, userBook.book.subject, userBook.book.isbn, userBook.condition, 'x' + userBook.count.toString()] as tag}
				<span class="tag">{tag.toLowerCase()}</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.book {
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
