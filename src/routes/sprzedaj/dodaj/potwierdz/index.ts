import { db } from '$lib/database';
import { Condition } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const isbn = url.searchParams.get('isbn');

	if (!isbn) {
		return { status: 400 };
	}

	const book = await db.book.findUnique({ where: { isbn } });

	if (!book) {
		return { status: 400 };
	}

	return {
		status: 200,
		body: { book },
	};
};

export const post: RequestHandler = async ({ locals, url, request }) => {
	if (!locals.user) {
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

	await db.bookForSale.upsert({
		where: {
			condition_isbn_sellerId: {
				condition: condition as Condition,
				sellerId: locals.user.id,
				isbn,
			},
		},
		create: {
			condition: condition as Condition,
			count: 1,
			seller: {
				connect: {
					id: locals.user.id,
				},
			},
			book: {
				connect: {
					isbn,
				},
			},
		},
		update: {
			count: {
				increment: 1,
			},
		},
	});

	return { status: 200 };
};
