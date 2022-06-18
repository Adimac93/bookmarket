<script lang="ts">
</script>

<div class="wrapper">
	<h1>Zaloguj się</h1>
	<div class="login-buttons-wrapper">
		<a
			class="login-button discord"
			href="https://discord.com/api/oauth2/authorize?client_id=987076912247627826&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Flogin%3Fprovider%3Ddiscord&response_type=code&scope=identify%20email"
			><img src="/discord.svg" alt="Discord logo" /><span>Zaloguj się przez Discorda</span></a
		>
		<a
			class="login-button google"
			href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={'266186020689-9dt4vgv7nasollcmg96mp66idnes48is.apps.googleusercontent.com'}&scope=openid%20email&redirect_uri={encodeURI(
				`https://localhost:3000/login?provider=google`
			)}&state={'test'}"
			><img src="/google.svg" alt="Facebook logo" /><span>Zaloguj się przez Google</span></a
		>
		<a
			class="login-button facebook"
			href="https://www.facebook.com/v14.0/dialog/oauth?client_id={331682405650576}&response_type=code&redirect_uri={encodeURI(
				`https://localhost:3000/login?provider=facebook`
			)}&state={'test'}"
			><img src="/facebook.svg" alt="Facebook logo" /><span>Zaloguj się przez Facebooka</span></a
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
	.login-button {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		text-decoration: none;
		border-radius: 4px;
		height: 40px;
		width: 300px;
		transition: 0.1s;
	}
	.login-button img {
		height: 50%;
		margin-left: 0.7em;
	}
	.login-button span {
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
