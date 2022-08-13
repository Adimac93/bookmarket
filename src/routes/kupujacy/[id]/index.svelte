<script lang="ts">
	import LargeCover from '$lib/book/LargeCover.svelte';
	import Row from '$lib/book/Row.svelte';
	import type { BookForSale } from '@prisma/client';
	import type { ShadowData } from '.';
	import type { ShadowPostData } from '../../sprzedane';

	export let buyer: ShadowData['buyer'];
	export let buying: ShadowData['buying'];
	export let notBuying: ShadowData['notBuying'];

	const selected = buying.map((book) => ({
		selected: true,
		book,
	}));

	$: sum = selected
		.filter(({ selected }) => selected)
		.reduce((sum, { book }) => sum + book.book.price, 0);

	const zł = (price: number) =>
		price.toLocaleString('pl', {
			style: 'currency',
			currency: 'PLN',
		});

	async function createOrder() {
		const mapped: Omit<BookForSale, 'sellerId'>[] = selected
			.filter(({ selected }) => selected)
			.map(({ book }) => ({
				condition: book.condition,
				count: book.count,
				isbn: book.isbn,
			}));

		const data: ShadowPostData = {
			books: mapped,
			buyerId: buyer.school?.id ?? buyer.user?.id!,
		};

		await fetch('/sprzedane/__data.json', {
			method: 'post',
			body: JSON.stringify(data),
		});
	}
</script>

<div class="tile">
	{#if buyer.school}
		{@const { school } = buyer}
		<h4>{school.name}</h4>
		<p>{school.city}, {school.region}</p>
		<span>{zł(sum)}</span>
		<button on:click={createOrder}>Stwórz zamówienie</button>
	{/if}
</div>
Książki które możesz sprzedać
<ul>
	{#each selected as obj}
		<li>
			<Row book={obj.book.book}>
				{zł(obj.book.book.price)}
				<button
					class="select"
					class:selected={obj.selected}
					on:click={() => (obj.selected = !obj.selected)}
				>
					{#if obj.selected}
						<img src="/tick.svg" />
					{/if}
				</button>
			</Row>
		</li>
	{/each}
</ul>
Twoje pozostałe książki na sprzedaż
<ul>
	{#each notBuying as { book }}
		<li>
			<Row {book} />
		</li>
	{/each}
</ul>

<LargeCover />

<style>
	div {
		margin: 0.4rem;
	}
	ul {
		display: flex;
		flex-flow: column;
		margin: 0;
		padding: 0.4rem;
		gap: 0.4rem;
		list-style: none;
	}
	button.select {
		height: 2rem;
		width: 2rem;
		padding: 0.3rem;
		appearance: none;
		border: 2px solid #08f;
		border-radius: 50%;
		background-color: #fff;
		transition: background-color 0.2s;
	}
	button.selected {
		background-color: #08f;
	}
	img {
		display: block;
		height: 100%;
		width: 100%;
		filter: invert(1);
	}
</style>
