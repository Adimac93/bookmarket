<script lang="ts">
	const initOAuth = async (provider: string) => {
		const url = new URL('/api/oauth/state', window.location.origin);
		url.searchParams.append('provider', provider);
		url.searchParams.append(
			'redirect_uri',
			new URLSearchParams(window.location.search).get('redirect_uri') ??
				window.location.origin + '/sklep',
		);
		const response = await fetch(url).then((r) => r.json());
		window.location.href = response.redirectURI;
	};
</script>

<div class="wrapper">
	<h1>Zaloguj się</h1>
	<div class="login-buttons-wrapper">
		<button class="discord" on:click={() => initOAuth('discord')}
			><img src="/oauth/discord.svg" alt="Discord logo" /><span>Zaloguj się przez Discorda</span
			></button
		>
		<button class="google" on:click={() => initOAuth('google')}
			><img src="/oauth/google.svg" alt="Facebook logo" /><span>Zaloguj się przez Google</span
			></button
		>
		<button class="facebook" on:click={() => initOAuth('facebook')}
			><img src="/oauth/facebook.svg" alt="Facebook logo" /><span>Zaloguj się przez Facebooka</span
			></button
		>
	</div>
</div>

<style>
	.wrapper {
		width: fit-content;
		margin: 1em auto;
		padding: 1em;
		background-color: white;
		border-radius: 0.6em;
		box-shadow: 0px 0px 1em 0px rgba(0, 0, 0, 0.4);
	}
	.wrapper > :first-child {
		margin-top: 0;
	}
	.wrapper > :last-child {
		margin-bottom: 0;
	}
	.login-buttons-wrapper {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5em;
	}
	button {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		padding: 0;
		border: none;
		border-radius: 4px;
		font-size: 1em;
		height: 40px;
		width: 300px;
		transition: 0.1s;
		cursor: pointer;
	}
	button img {
		height: 50%;
		margin-left: 0.7em;
	}
	button span {
		display: block;
		margin: auto;
		font-weight: 500;
	}
	.discord {
		background-color: #5865f2;
		color: #fff;
	}
	.discord:hover {
		background-color: #505cdc;
	}
	.google {
		background-color: #fff;
		color: #3c4043;
		border: 1px solid #dadce0;
	}
	.google:hover {
		background-color: #f7fafe;
		border-color: #d2e3fc;
	}
	.facebook {
		background-color: #3b5998;
		color: #fff;
	}
	.facebook:hover {
		background-color: #35508b;
	}
</style>
