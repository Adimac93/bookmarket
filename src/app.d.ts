/// <reference types="@sveltejs/kit" />

import type { User } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	declare namespace App {
		interface Locals {
			user?: {
				id: string;
				sessionID: string;
			};
		}
		// interface Platform {}
		interface Session {
			user?: User;
		}
		// interface Stuff {}
	}
}
