<script lang="ts">
	import BookComponent from '$lib/m/BookComponent.svelte';
	import type { Book, Order, OrderBook } from '@prisma/client';

	export let orders: (Order & {
		books: (OrderBook & {
			book: Book;
		})[];
	})[];
</script>

<ol>
	{#each orders as order}
		<li>
			<details>
				<summary>{new Date(order.created).toLocaleDateString('pl')}</summary>
				<ul>
					{#each order.books as { book }}
						<BookComponent {book} />
					{/each}
				</ul>
			</details>
		</li>
	{/each}
</ol>

<style>
	ol {
		display: block;
		margin: 0;
		padding: 0;
		gap: 0.2rem;
		list-style: none;
	}
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		margin: 0;
		padding: 0;
		gap: 0.2rem;
		list-style: none;
	}
</style>
