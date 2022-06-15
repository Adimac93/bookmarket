<form>
	<h1>Zaloguj się</h1>
	<label>Login<input type="text" required pattern="\w+" /></label>
	<label>Hasło<input type="password" required minlength="8" /></label>
	<button>Zaloguj się</button>
</form>

<style>
	form {
		margin: auto;
		width: fit-content;
		font-family: ui-rounded;
	}
	input {
		display: block;
	}
	input[type="text"], input[type="password"] {
		border: 1px solid #555;
		border-radius: 2px;
	}
	input:invalid {
		border-color: red;
	}
</style>
