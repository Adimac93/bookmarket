import { db, sessions_class } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	const sessionId = sessions_class.get(locals.cookies.session_id);

	if (!sessionId) {
		return { status: 401 };
	}

	const user = await db.user.findUnique({
		where: { id: sessionId },
		include: { books: { include: { book_with_condition: { include: { book: true } } } } },
	});

	if (!user) {
		return { status: 400 };
	}

	return {
		status: 200,
		body: { books: user.books },
	};
};
