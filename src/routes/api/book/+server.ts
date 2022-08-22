import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const isbnList = url.searchParams.get('isbn')?.split(',');

	if (!isbnList) {
		throw error(400, 'Missing isbn list');
	}

	const books = await db.book.findMany({
		where: {
			isbn: {
				in: isbnList,
			},
		},
	});

	return json({ books });
};
