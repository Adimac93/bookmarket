import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';
import { data } from './_data';

export const get: RequestHandler = (async () => {
	return {
		status: 200,
		body: { data },
	};
}) as RequestHandler;

export const post: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return { status: 401 };

	const books = (await request.json()).books as string[];

	const result = await db.user.update({
		where: {
			id: locals.user.id,
		},
		data: {
			cart: {
				createMany: {
					data: books.map((book) => ({
						book_id: book,
						condition: 'NEW',
					})),
				},
			},
		},
	});

	return {
		status: 201,
	};
};
