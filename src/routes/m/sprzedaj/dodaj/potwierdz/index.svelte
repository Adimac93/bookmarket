<script lang="ts">
	import type { Book } from '@prisma/client';

	export let book: Book;

	const submit = async () => {
		const searchParams = new URLSearchParams();
		searchParams.append('isbn', book.id);
		searchParams.append('condition', 'NEW');
		await fetch(`potwierdz/__data.json?${searchParams}`, {
			method: 'post',
		});
	};
</script>

<form on:submit|preventDefault={submit}>
	<h1>Sprzedaj książkę</h1>
	<div class="cover">
		<img
			src="https://cf-taniaksiazka.statiki.pl/images/large/{book.image}"
			alt="Okładka książki"
			width="200"
			height="300"
		/>
	</div>
	<h2>{book.title}</h2>
	<span>{book.id}</span>
	<span>{book.grade}</span>
	<span>{book.subject}</span>
	<label>
		<input type="checkbox" name="confirm" required />
		<span>
			Potwierdzam, że posiadam tę książkę, chcę ją sprzedać i zobowiązuję się dostarczyć ją w
			terminie.
		</span>
	</label>
	<button class="confirm">
		<span>Dodaj</span>
		<img src="/m/chevron/right.svg" alt="strzałka w prawo" />
	</button>
</form>

<style>
	form {
		height: 100%;
		display: flex;
		flex-flow: column;
		margin: 0.4rem;
		padding: 0.4rem;
		gap: 0.4rem;
		background-color: #fff;
		border-radius: 0.4rem;
	}
	h1 {
		margin: 0.4rem;
		font-size: 1.6rem;
		text-align: center;
	}
	.cover {
		height: 16em;
		cursor: pointer;
		transition: 0.2s;
	}
	.cover > img {
		display: block;
		margin: auto;
		object-fit: contain;
		height: 100%;
		width: 100%;
	}
	h2 {
		margin: 0.4rem;
		font-size: 1.2rem;
	}
	form > span {
		display: block;
	}
	label {
		display: block;
	}
	button {
		text-decoration: none;
		margin: 0;
		padding: 0.6rem 0.8rem;
		border: none;
		cursor: pointer;
		border-radius: 0.4rem;
		background-color: #f50;
		color: #fff;
		margin-top: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button img {
		height: 1em;
		filter: invert(1);
		flex: 0 0 1em;
	}
</style>
