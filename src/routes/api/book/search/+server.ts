import { error, json } from '@sveltejs/kit';
import { BOOKS_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url, request }) => {
	const data = await request.json();

	if (!data) {
		throw error(400, 'Missing data');
	}

	const book = await (
		await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=isbn:${data.isbn}&country=pl&key=${BOOKS_API_KEY}`,
		)
	).json();

	const bookInfo = book.items[0].volumeInfo;
	const title = bookInfo.title;
	const subtitle = bookInfo.subtitle;

	return json({ title, subtitle });
};
