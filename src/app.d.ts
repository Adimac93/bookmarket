/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		cookies: Record<string, string>;
		session_id?: string;
	}
	// interface Platform {}
	interface Session {
		isLoggedIn: boolean;
	}
	// interface Stuff {}
}
