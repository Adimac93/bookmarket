import { db } from '$lib/database';
import type { PageServerLoad } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user == undefined) {
		const info =
			randomChoice([
				'Zapomniałem, jak ci na imię?',
				'Kto to, kto to?',
				'Hola, hola! Chyba się nie znamy?',
			]) + ' (zaloguj się)';
		return { info };
	}
	const base = await db.base.findUnique({
		where: { id: locals.user.id },
		select: { books: { include: { book: {} } } },
	});

	if (!base) return 'No books';
	return { books: base.books };
};

function randomChoice<T>(choices: T[]): T {
	return choices[Math.floor(Math.random() * choices.length)];
}
