import { db, sessions_class } from '$lib/database';
import { Condition } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const isbn = url.searchParams.get('isbn');

	if (!isbn) {
		return { status: 400 };
	}

	const book = await db.book.findUnique({ where: { id: isbn } });

	if (!book) {
		return { status: 400 };
	}

	return {
		status: 200,
		body: { book },
	};
};

export const post: RequestHandler = async ({ locals, url, request }) => {
	const userId = sessions_class.get(locals.cookies.session_id);

	if (!userId) {
		return { status: 401 };
	}

	const isbn = url.searchParams.get('isbn');
	const condition = url.searchParams.get('condition');

	if (!isbn || !condition) {
		return { status: 400 };
	}

	if (!(condition in Condition)) {
		return { status: 403 };
	}

	const result = await db.bookCopy.create({
		data: {
			owner: {
				connect: { id: userId },
			},
			status: 'świeżo dodane',
			book_with_condition: {
				connectOrCreate: {
					where: {
						book_id_condition: {
							book_id: isbn,
							condition: condition as Condition,
						},
					},
					create: {
						book: {
							connect: {
								id: isbn,
							},
						},
						condition: condition as Condition,
					},
				},
			},
		},
	});

	return { status: 200 };
};
