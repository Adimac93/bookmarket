import type { Provider } from '$lib/oauth/common';
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
export const sessions: Record<string, string> = {};
export const signups: Record<string, Signup> = {};
export interface Signup {
	id: string;
	provider: Provider;
}
