import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return { status: 401 };
	}

	const user = await db.user.findUnique({
		where: { id: locals.user.id },
		include: { base: { include: { books: { include: { book: true } } } } },
	});

	if (!user) {
		return { status: 400 };
	}

	return {
		status: 200,
		body: { books: user.base.books },
	};
};
