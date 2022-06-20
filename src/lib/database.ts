import type { Provider } from '$lib/oauth/common';
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
export const sessions: Record<string, string> = {};
export const signups: Record<string, Signup> = {};
export interface Signup {
	id: string;
	provider: Provider;
}

class Sessions {
	private sessions: Record<string, string> = {};
	get(cookie: string): string | undefined {
		return this.sessions[cookie];
	}
	create(id: string) {
		const cookie = crypto.randomUUID();
		this.sessions[cookie] = id;
		return cookie;
	}
	delete(cookie: string) {
		const id = this.sessions[cookie];
		delete this.sessions[cookie];
		return id;
	}
}

export const sessions_class = new Sessions();
