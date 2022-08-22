import type { PageServerLoad } from '@sveltejs/kit';
import { db } from '$lib/database';

export const load: PageServerLoad = async () => {
	const books = await db.book.findMany();
	return { books };
};
