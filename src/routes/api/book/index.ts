import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const isbnList = url.searchParams.get('isbn')?.split(',');

	if (!isbnList) return { status: 400 };

	const result = await db.book.findMany({
		where: {
			id: {
				in: isbnList,
			},
		},
	});

	return {
		status: 200,
		body: {
			books: result,
		},
	};
};
