<script lang="ts">
	const onLoad = () =>
	// @ts-expect-error
		FB.init({
			appId: '331682405650576',
			xfbml: true,
			version: 'v14.0'
		});
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
	data-login_uri="http://localhost:3000/login?provider=google"
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
<a href="https://www.facebook.com/v14.0/dialog/oauth?client_id=331682405650576&redirect_uri=https://localhost:3000/login?provider=facebook&state=test">Kontynuuj przy użyciu Facebooka</a>