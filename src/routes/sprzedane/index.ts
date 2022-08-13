import { db } from '$lib/database';
import type {
	Base,
	Book,
	BookForSale,
	Order,
	OrderBook,
	Prisma,
	School,
	User,
} from '@prisma/client';
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

export const post: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) return { status: 401 };

	const data: ShadowPostData = await request.json();

	const mapped: Prisma.OrderBookCreateWithoutOrderInput[] = data.books.map(
		({ condition, count, isbn }) => ({
			book: {
				connect: {
					isbn,
				},
			},
			condition,
			count,
		}),
	);

	await db.$transaction([
		db.order.create({
			data: {
				status: 'PENDING',
				buyer: {
					connect: {
						id: data.buyerId,
					},
				},
				seller: {
					connect: {
						id: locals.user.id,
					},
				},
				books: {
					create: mapped,
				},
			},
		}),
		// TODO: update count instead of deleting
		db.bookForSale.deleteMany({
			where: {
				sellerId: locals.user.id,
				OR: data.books.map(({ condition, isbn }) => ({
					condition,
					isbn,
				})),
			},
		}),
	]);

	return {
		status: 201,
	};
};

export interface ShadowPostData {
	buyerId: string;
	books: Omit<BookForSale, 'sellerId'>[];
}
