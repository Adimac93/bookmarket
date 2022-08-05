import { db } from '$lib/database';
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

	const result = await db.bookInstance.create({
		data: {
			status: 'świeżo dodane',
			condition: condition as Condition,
			owner: { connect: { id: locals.user.id } },
			book: { connect: { id: isbn } },
		},
	});

	return { status: 200 };
};
