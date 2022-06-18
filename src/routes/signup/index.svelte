<script lang="ts">
	let name = '';
	async function sendForm(){
		const query = new URLSearchParams(window.location.search) ;
		await fetch(`/signup?id=${query.get('id') || ''}`,{method:"post",body: JSON.stringify({name})})
		window.location.href='/sklep'
	}
</script>
<form on:submit|preventDefault="{sendForm}">
	<h1>Załóż konto</h1>
	<label>Imię i nazwisko<input type="text" required placeholder="Jan Kowalski" pattern="{`\\p{Letter}+\\s\\p{Letter}+`}" bind:value={name}><span /></label>
	<!-- <h2>Dane kontaktowe</h2>
	<p>Aby coś sprzedać lub kupić musisz podać co najmniej jeden sposób kontaktu. Możesz to zrobić później, nie jest to wymagane do samego założenia konta.</p>
	<label>Numer telefonu<input type="tel" placeholder="123456789"><span /></label>
	<label>Konto Discord<input type="text" placeholder="username#1234" pattern="{`.+#\\d{4}`}"><span /></label> -->
	<button>Załóż konto</button>
</form>
<style>
	form {
		width: min(100%, 20rem);
		margin: 1em auto;
		padding: 1em;
		background-color: white;
		border-radius: 0.6em;
		box-shadow: 0px 0px 1em 0px rgba(0, 0, 0, 0.4);
	}
	* {
		margin-left: 0;
	}
	form > :first-child {
		margin-top: 0;
	}
	form > :last-child {
		margin-bottom: 0;
	}
	label {
		display: block;
		margin-top: 0.5em;
	}
	input {
		display: block;
		border: 1px solid #aaa;
		border-radius: 2px;
		margin-top: 0.2em;
	}
	input:invalid {
		border-color: red;
	}
	input:valid:not(:placeholder-shown) {
		border-color: green;
	}
	input:required:placeholder-shown + span::after {
		display: block;
		font-size: 0.7em;
		content: "To pole jest wymagane";
		color: red;
	}
	input:focus {
		box-shadow: 0 0 0.4em 0 rgba(0, 0, 0, 0.4);
		outline: none;
	}
	button {
		border: none;
		border-radius: 2px;
		background-color: #080;
		color: white;
		font-size: 1em;
		padding: 0.3em 1em;
		margin-top: 1em;
		transition: 0.2s;
	}
	button:hover {
		background-color: #060;
	}
	form:invalid > button {
		background-color: #aaa;
	}
</style>