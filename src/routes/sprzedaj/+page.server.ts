import { db } from '$lib/database';
import type { PageServerLoad } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return { status: 401 };
	}

	const user = await db.user.findUnique({
		where: { id: locals.user.id },
		include: { base: { include: { books: { include: { book: true } } } } },
	});

	if (!user) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return { status: 400 };
	}

	return { books: user.base.books };
};
