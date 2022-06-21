import type { Provider } from '$lib/oauth/common';
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
export const sessions: Record<string, string> = {};
export const signups: Record<string, Signup> = {};
export interface Signup {
	id: string;
	provider: Provider;
}

class Store<T> {
	private hashMap: Record<string, T> = {};
	get(key: string): T | undefined {
		return this.hashMap[key];
	}
	create(value: T, key?: string) {
		key ??= crypto.randomUUID();
		this.hashMap[key] = value;
		return key;
	}
	delete(key: string) {
		const value = this.hashMap[key];
		delete this.hashMap[key];
		return value;
	}
}

export const sessions_class = new Store<string>();

export const states = new Store<{ redirectURI: string }>();
