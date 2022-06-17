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
				console.log(response)
				const response_ = await fetch(`https://graph.facebook.com/v14.0/${uid}?metadata=1&access_token=${accessToken}`);
				console.log(await response_.json())
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
		nonce="Xu1R86cK"
		on:load={onLoad}></script>
</svelte:head>
<h1>Zaloguj się</h1>
<div
	id="g_id_onload"
	data-client_id="266186020689-9dt4vgv7nasollcmg96mp66idnes48is.apps.googleusercontent.com"
	data-login_uri="http://localhost:3000/login/google"
	data-auto_prompt="false"
/>
<div
	class="g_id_signin"
	data-type="standard"
	data-size="large"
	data-theme="outline"
	data-text="sign_in_with"
	data-shape="rectangular"
	data-logo_alignment="left"
/>
<div
	class="fb-login-button"
	data-width=""
	data-size="large"
	data-button-type="continue_with"
	data-layout="default"
	data-auto-logout-link="false"
	data-use-continue-as="false"
/>
<a href="https://discord.com/api/oauth2/authorize?client_id=987076912247627826&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Flogin%3Fprovider%3Ddiscord&response_type=code&scope=identify%20email">Log in with discord</a>