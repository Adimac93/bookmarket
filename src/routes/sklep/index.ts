import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const books = await db.book.findMany();
	return {
		status: 200,
		body: { books }
	};
};
