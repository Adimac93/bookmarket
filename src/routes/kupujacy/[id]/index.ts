import { db } from '$lib/database';
import type { RequestHandler } from './__types';
import type { Book, BookForSale, BookInWishlist } from '@prisma/client';
import type { BaseUser } from '..';

export interface ShadowData {
	buyer: BaseUser & {
		wishlist: BookInWishlist[];
	};
	buying: (BookForSale & {
		book: Book;
	})[];
	notBuying: (BookForSale & {
		book: Book;
	})[];
}

export const get: RequestHandler<ShadowData> = async ({ locals, params }) => {
	if (!locals.user) return { status: 401 };

	const buyer = await db.base.findUniqueOrThrow({
		where: {
			id: params.id,
		},
		include: {
			school: true,
			user: true,
			wishlist: true,
		},
	});

	const books = await db.bookForSale.findMany({
		where: {
			sellerId: locals.user.id,
		},
		include: {
			book: true,
		},
	});

	const buying: (BookForSale & { book: Book })[] = [];
	const notBuying: (BookForSale & { book: Book })[] = [];

	books.forEach((book) => {
		if (buyer.wishlist.some((bookInWishlist) => bookInWishlist.isbn === book.isbn)) {
			buying.push(book);
		} else {
			notBuying.push(book);
		}
	});

	return {
		body: {
			buyer,
			buying,
			notBuying,
		} as ShadowData,
	};
};
