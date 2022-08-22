throw new Error("@migration task: Update +page.server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");

import { db } from '$lib/database';
import type { Prisma } from '@prisma/client';
import type { PageServerLoad, Action } from '@sveltejs/kit';
import { data } from './_data';

const school = await db.school.findFirstOrThrow();

export const GET: RequestHandler = (async () => {
	return {
		status: 200,
		body: { data },
	};
}) as RequestHandler;

export const POST: Action = async ({ request, locals }) => {
	if (!locals.user) throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
	return { status: 401 };

	const books = (await request.json()).books as string[];

	const booksCreateData: Prisma.OrderBookCreateWithoutOrderInput[] = books.map((isbn) => ({
		book: {
			connect: {
				isbn,
			},
		},
		condition: 'NEW',
		count: 1,
	}));

	const result = await db.user.update({
		where: {
			id: locals.user.id,
		},
		data: {
			base: {
				update: {
					buying: {
						create: {
							status: 'PENDING',
							seller: {
								connect: {
									id: school.id,
								},
							},
							books: {
								create: booksCreateData,
							},
						},
					},
				},
			},
		},
	});

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
	return {
		status: 201,
	};
};
