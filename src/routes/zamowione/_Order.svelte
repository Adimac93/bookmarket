<script lang="ts">
	import BookComponent from '$lib/book/Tile.svelte';
	import type { Base, Book, Order, OrderBook, School, User } from '@prisma/client';

	export let order: Order & {
		books: (OrderBook & {
			book: Book;
		})[];
		seller: Base & {
			user: User | null;
			school: School | null;
		};
	};

	let active = false;

	let list: HTMLUListElement;
	let scrollHeight = '';
	$: scrollHeight = list ? (active ? list.scrollHeight + 'px' : '0') : '';
</script>

<div class="wrapper" class:active>
	<div class="header" on:click={() => (active = !active)}>
		<span class="date">{new Date(order.created).toLocaleDateString('pl')}</span>
		<span class="seller">{order.seller.school?.abbr ?? order.seller.user?.name}</span>
	</div>
	<ul bind:this={list} style:max-height={scrollHeight}>
		{#each order.books as { book }}
			<BookComponent {book} />
		{:else}
			<p>Brak książek.</p>
		{/each}
	</ul>
</div>

<style>
	div.wrapper {
	}
	div.header {
		display: flex;
		justify-content: stretch;
		align-items: center;
		height: 3rem;
		padding: 0.5rem;
		gap: 0.5rem;
		border-radius: 0.5rem;
		background-color: #fff;
		cursor: pointer;
	}
	/* .active div.header {
		border-bottom: 1px solid #ccc;
	} */
	span.date {
		display: flex;
		flex: 0 0;
		place-items: center;
		place-content: center;
	}
	span.seller {
		display: flex;
		justify-content: flex-start;
		flex: 1 1 0;
	}
	div.img {
		display: flex;
		flex: 0 0 3rem;
		place-items: center;
		place-content: center;
		cursor: pointer;
	}
	img {
		display: block;
		width: 1.4rem;
		height: 1.4rem;
	}
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		margin: 0;
		padding: 0;
		gap: 0.5rem;
		list-style: none;
		overflow: hidden;
		transition: max-height 0.3s;
	}
</style>
