<script lang="ts">
	const onLoad = () => {
		// @ts-expect-error
		FB.init({
			appId: '331682405650576',
			xfbml: true,
			version: 'v14.0'
		});
		// @ts-expect-error
		FB.getLoginStatus(async function (response) {
			if (response.status === 'connected') {
				// The user is logged in and has authenticated your
				// app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed
				// request, and the time the access token
				// and signed request each expire.
				const uid = response.authResponse.userID;
				const accessToken = response.authResponse.accessToken;
				console.log(response);
				const response_ = await fetch(
					`https://graph.facebook.com/v14.0/${uid}?metadata=1&access_token=${accessToken}`
				);
				console.log(await response_.json());
			} else if (response.status === 'not_authorized') {
				// The user hasn't authorized your application.  They
				// must click the Login button, or you must call FB.login
				// in response to a user gesture, to launch a login dialog.
			} else {
				// The user isn't logged in to Facebook. You can launch a
				// login dialog with a user gesture, but the user may have
				// to log in to Facebook before authorizing your application.
			}
		});
	};
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
	<div id="fb-root" />
	<script
		async
		defer
		crossorigin="anonymous"
		src="https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v14.0"
		nonce="z0gYK5XQ"
		on:load={onLoad}></script>
	<div
		id="g_id_onload"
		data-client_id="266186020689-9dt4vgv7nasollcmg96mp66idnes48is.apps.googleusercontent.com"
		data-login_uri="http://localhost:3000/login/google"
		data-auto_prompt="false"
	/>
</svelte:head>
<div class="wrapper">
	<h1>Zaloguj się</h1>
	<div class="login-buttons-wrapper">
		<a
			class="login-button discord"
			href="https://discord.com/api/oauth2/authorize?client_id=987076912247627826&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Flogin%3Fprovider%3Ddiscord&response_type=code&scope=identify%20email"
			><img src="/discord.svg" alt="Discord logo" /><span>Zaloguj się przez Discorda</span></a
		>
		<a
			class="login-button facebook"
			href="https://www.facebook.com/v14.0/dialog/oauth?client_id={331682405650576}&response_type=code&redirect_uri={encodeURI(
				`https://localhost:3000/login?provider=facebook`
			)}&state={'test'}"
			><img src="/facebook.svg" alt="Facebook logo" /><span>Zaloguj się przez Facebooka</span></a
		>
		<div
			class="g_id_signin"
			data-type="standard"
			data-size="large"
			data-width="300"
			data-theme="outline"
			data-text="sign_in_with"
			data-shape="rectangular"
			data-logo_alignment="left"
		/>
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
	.facebook {
		background-color: #3b5998;
		color: #fff;
	}
</style>
