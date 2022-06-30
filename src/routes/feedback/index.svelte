<script lang="ts">
	let title = '';
	let description = '';
	let isBug = true;
	let categories = { ui: 'interfejs', oauth: 'logowanie', account: 'konto' };
	let category = 'Kategoria';

	let files: FileList;
	let message = '';

	async function sendForm() {
		let images: string[] = [];
		if (files) {
			images = await prepareImages(files);
		}

		const response = await fetch('/api/feedback', {
			method: 'post',
			body: JSON.stringify({ category, title, description, isBug, images }),
		});
		if (response.status == 200) {
			message = 'Wysłano zgłoszenie!';
		} else if (response.status == 403) {
			message =
				'Nie prawidłowe dane zgłoszenia, wypenił wszystkie pola / nie przekraczaj limitu znaków';
		} else if (response.status == 401) {
			message = 'Zaloguj się aby wysłać zgłoszenie';
		} else {
			message = 'Coś poszło nie tak, spróbuj ponownie';
		}
	}
	async function prepareImages(files: FileList): Promise<string[]> {
		let images: string[] = [];
		for (let i = 0; i < files.length; i++) {
			let base64 = (await toBase64(files[i])).result;

			if (!base64) {
				continue;
			}
			images.push(base64.toString().split(',')[1]);
		}
		return images;
	}
	const toBase64 = (file: File): Promise<FileReader> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader);
			reader.onerror = (error) => reject(error);
		});
</script>

<form on:submit|preventDefault={sendForm}>
	<button on:click={() => (isBug = !isBug)}>Zmień typ zgłoszenia</button>
	<h1>{isBug ? 'Zgłoś błąd' : 'Zasugeruj zmiany'}</h1>
	<h3>{message}</h3>
	<input type="text" required placeholder="Tytuł" bind:value={title} /><span />
	<select bind:value={category}>
		<option>Kategoria</option>
		{#each Object.entries(categories) as [value, name]}
			<option {value} required>{name}</option>
		{/each}
	</select>

	<textarea
		rows="5"
		cols="30"
		type="text"
		required
		placeholder="Opis"
		bind:value={description}
	/><span />
	<input type="file" accept="image/png, image/jpeg, image/jpg" multiple bind:files />
	<button>Wyślij</button>
</form>

<style>
	form {
		width: min(100%, 20rem);
		margin: 1em auto;
		padding: 1em;
		background-color: white;
		border-radius: 0.6em;
		box-shadow: 0px 0px 1em 0px rgba(0, 0, 0, 0.4);
		display: flexbox;
	}
</style>
