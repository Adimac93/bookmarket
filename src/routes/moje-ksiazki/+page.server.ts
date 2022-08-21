import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	if (locals.user == undefined) {
		const info =
			randomChoice([
				'Zapomniałem, jak ci na imię?',
				'Kto to, kto to?',
				'Hola, hola! Chyba się nie znamy?',
			]) + ' (zaloguj się)';
		return { status: 200, body: { info } };
	}
	const base = await db.base.findUnique({
		where: { id: locals.user.id },
		select: { books: { include: { book: {} } } },
	});

	if (!base) return { status: 200, body: 'No books' };
	return { status: 200, body: { books: base.books } };
};

function randomChoice<T>(choices: T[]): T {
	return choices[Math.floor(Math.random() * choices.length)];
}
