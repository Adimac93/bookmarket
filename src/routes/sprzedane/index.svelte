<script lang="ts">
	import BookComponent from '$lib/m/BookComponent.svelte';
	import type { Base, Book, Order, OrderBook, School, User } from '@prisma/client';
	import OrderComponent from '../zamowione/_Order.svelte';

	export let orders: (Order & {
		books: (OrderBook & {
			book: Book;
		})[];
		buyer: Base & {
			user: User | null;
			school: School | null;
		};
	})[];
</script>

<ol>
	{#each orders as order2}
		{@const order = { ...order2, seller: order2.buyer }}
		<li>
			<OrderComponent {order} />
		</li>
	{:else}
		<h1>Nie sprzedałeś jeszcze żadnych książek.</h1>
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
