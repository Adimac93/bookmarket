import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/database';

export const GET: RequestHandler = async () => {
	const books = await db.book.findMany();
	return {
		status: 200,
		body: { books },
	};
};
