<script lang="ts">
	import type { Book } from '@prisma/client';

	export let books: Book[];
</script>

<ul>
	{#each books as book}
		<div class="book">
			<div class="cover">
				<img src={book.image} alt="Okładka książki" />
			</div>
			<div class="description">
				<p class="title">
					{book.title}<br />
					<span class="author">{book.author}</span>
				</p>
			</div>
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
		box-shadow: 0 0 20px #aaa;
		margin: 25px;
		padding: 10px 10px 0 10px;
		vertical-align: top;
		transition: height 1s;
	}

	.cover {
		border: 2px solid gray;
		height: 80%;
		overflow: hidden;
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
