import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

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
