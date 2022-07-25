/// <reference types="@sveltejs/kit" />

import type { User } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	declare namespace App {
		interface Locals {
			cookies: Record<string, string>;
			session_id?: string;
		}
		// interface Platform {}
		interface Session {
			isLoggedIn: boolean;
			user: User | null;
		}
		// interface Stuff {}
	}
}
