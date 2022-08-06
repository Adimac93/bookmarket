<script lang="ts">
	import { type Book, Condition } from '@prisma/client';

	export let book: Book;

	let condition: Condition = 'GOOD';

	const submit = async () => {
		const searchParams = new URLSearchParams();
		searchParams.append('isbn', book.isbn);
		searchParams.append('condition', condition);
		await fetch(`/sprzedaj/dodaj/potwierdz/__data.json?${searchParams}`, {
			method: 'post',
		});
	};

	const conditionDescription: { [K in Condition]: string } = {
		NEW: 'Książka w stanie nowym - czyli po prostu nowa.',
		GOOD: 'Książka w stanie dobrym - czyli po prostu używana.',
		DAMAGED: 'Książka w stanie lekko zniszczonym - używana ale bardziej.',
		BAD: 'Książka w stanie złym - coś poszło nie tak.',
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
	<span>{book.isbn}</span>
	<span>{book.grade}</span>
	<span>{book.subject}</span>
	<div class="right">
		<h3>Stan książki</h3>
		<div class="radio">
			<label>
				<input type="radio" name="condition" value={Condition.NEW} bind:group={condition} />
				<span>Nowy</span>
			</label>
			<label>
				<input type="radio" name="condition" value={Condition.GOOD} bind:group={condition} />
				<span>Dobry</span>
			</label>
			<label>
				<input type="radio" name="condition" value={Condition.DAMAGED} bind:group={condition} />
				<span>Zniszczony</span>
			</label>
			<label>
				<input type="radio" name="condition" value={Condition.BAD} bind:group={condition} />
				<span>Zły</span>
			</label>
		</div>
		<p>{conditionDescription[condition]}</p>
	</div>
	<label>
		<input type="checkbox" name="confirm" required />
		<span>
			Potwierdzam, że posiadam tę książkę, chcę ją sprzedać i zobowiązuję się dostarczyć ją w
			terminie.
		</span>
	</label>
	<button class="confirm">
		<span>Dodaj</span>
		<img src="/chevron/right.svg" alt="strzałka w prawo" />
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
	label {
		display: block;
	}
	.radio {
		display: flex;
		flex-flow: row nowrap;
		justify-content: stretch;
		gap: 0.2rem;
	}
	.radio label {
		display: block;
		flex: 1;
	}
	.radio span {
		display: block;
		background-color: #f50;
		color: #fff;
		border-radius: 2rem;
		text-align: center;
		padding: 0.3rem 0.6rem;
		transition: background-color 0.2s;
	}
	.radio input {
		display: none;
	}
	.radio :not(:checked) + span {
		background-color: #888;
	}
	.right p {
		display: inline-block;
		font-size: 1rem;
	}
	h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: normal;
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
