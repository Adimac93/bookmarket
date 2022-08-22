import { db } from '$lib/database';
import type { Book, Order, OrderBook } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{
	orders: (Order & {
		books: (OrderBook & {
			book: Book;
		})[];
	})[];
}> = async ({ locals }) => {
	if (!locals.user) throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
	return { status: 401 };

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

	return { orders };
};
