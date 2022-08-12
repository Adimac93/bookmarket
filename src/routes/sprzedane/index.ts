import { db } from '$lib/database';
import type { Base, Book, Order, OrderBook, School, User } from '@prisma/client';
import type { RequestHandler } from './__types';

export const get: RequestHandler<{
	orders: (Order & {
		books: (OrderBook & {
			book: Book;
		})[];
		buyer: Base & {
			user: User | null;
			school: School | null;
		};
	})[];
}> = async ({ locals }) => {
	if (!locals.user) return { status: 401 };

	const orders = await db.order.findMany({
		where: {
			sellerId: locals.user.id,
		},
		include: {
			books: {
				include: {
					book: true,
				},
			},
			buyer: {
				include: {
					user: true,
					school: true,
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
