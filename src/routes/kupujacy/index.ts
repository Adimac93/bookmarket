import { db } from '$lib/database';
import type { BookForSale, Prisma, School, User } from '@prisma/client';
import type { KsiążkiSzkoły } from '../zapisane/_data';
import type { RequestHandler } from './__types';

export type BaseUser =
	| { user: User; school?: null | undefined }
	| { user?: null | undefined; school: School };

export interface ShadowData {
	offers: (BaseUser & {
		count: number;
	})[];
}

export const get: RequestHandler<ShadowData> = async ({ locals }) => {
	if (!locals.user) return { status: 401 };

	const userBooksForSale = await db.bookForSale.findMany({
		where: {
			sellerId: locals.user.id,
		},
	});

	const school = await db.school.findFirstOrThrow();

	const schema = school.schema as any as KsiążkiSzkoły;

	const schoolBuyingBooks = await getBooksFromSchema(schema);

	const filteredBooks = userBooksForSale.filter((book) =>
		schoolBuyingBooks.some((isbn) => isbn === book.isbn),
	);

	const isbnList = userBooksForSale.map(({ isbn }) => isbn);

	return {
		body: {
			offers: [
				{
					school,
					count: filteredBooks.length,
				},
			],
			schoolBuyingBooks,
		},
	};
};

const getBooksFromSchema = async (schema: KsiążkiSzkoły) => [
	...schema.książki.wymagane,
	...schema.książki.opcjonalne,
	...schema.języki.map((e) => [...e.książki.wymagane, ...e.książki.opcjonalne]).flat(),
	...schema.profile.map((e) => [...e.książki.wymagane, ...e.książki.opcjonalne]).flat(),
];
