import { db } from '$lib/database';
import type { Book, Order, OrderBook } from '@prisma/client';
import type { RequestHandler } from './__types';

export const GET: RequestHandler<{
	orders: (Order & {
		books: (OrderBook & {
			book: Book;
		})[];
	})[];
}> = async ({ locals }) => {
	if (!locals.user) return { status: 401 };

	const orders = await db.order.findMany({
		where: {
			buyerId: locals.user.id,
		},
		include: {
			books: {
				include: {
					book: true,
				},
			},
		},
		orderBy: {
			created: 'desc',
		},
	});

	return {
		status: 200,
		body: { orders },
	};
};
