import { db } from '$lib/database';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import { data } from './_data';

const school = await db.school.findFirstOrThrow();

export const get: RequestHandler = (async () => {
	return {
		status: 200,
		body: { data },
	};
}) as RequestHandler;

export const post: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return { status: 401 };

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

	return {
		status: 201,
	};
};
