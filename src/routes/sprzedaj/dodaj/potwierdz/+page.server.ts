import { db } from '$lib/database';
import { Condition } from '@prisma/client';
import type { PageServerLoad, Action } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const isbn = url.searchParams.get('isbn');

	if (!isbn) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return { status: 400 };
	}

	const book = await db.book.findUnique({ where: { isbn } });

	if (!book) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return { status: 400 };
	}

	return { book };
};

export const POST: Action = async ({ locals, url, request }) => {
	if (!locals.user) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return { status: 401 };
	}

	const isbn = url.searchParams.get('isbn');
	const condition = url.searchParams.get('condition');

	if (!isbn || !condition) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return { status: 400 };
	}

	if (!(condition in Condition)) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return { status: 403 };
	}

	await db.userBook.upsert({
		where: {
			condition_isbn_ownerId: {
				condition: condition as Condition,
				ownerId: locals.user.id,
				isbn,
			},
		},
		create: {
			condition: condition as Condition,
			count: 1,
			owner: {
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

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
	return { status: 200 };
};
