<script lang="ts">
	import BookComponent from '$lib/m/BookComponent.svelte';
	import type { Base, Book, Order, OrderBook, School, User } from '@prisma/client';
	import OrderComponent from './_Order.svelte';

	export let orders: (Order & {
		books: (OrderBook & {
			book: Book;
		})[];
		seller: Base & {
			user: User | null;
			school: School | null;
		};
	})[];
</script>

<ol>
	{#each orders as order}
		<li>
			<!-- <details>
				<summary>{new Date(order.created).toLocaleDateString('pl')}</summary>
				<ul>
					{#each order.books as { book }}
						<BookComponent {book} />
					{/each}
				</ul>
			</details> -->
			<OrderComponent {order} />
		</li>
	{/each}
</ol>

<style>
	ol {
		display: flex;
		flex-flow: column;
		margin: 0;
		padding: 0.5rem;
		gap: 0.5rem;
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
