import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ url, request }) => {
	const data = await request.json();
	if (!data) {
		return { status: 400, body: 'Missing data' };
	}
	const book = await (
		await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=isbn:${data.isbn}&country=pl&key=${process.env.BOOKS_API_KEY}`,
		)
	).json();

	const bookInfo = book.items[0].volumeInfo;
	const title = bookInfo.title;
	const subtitle = bookInfo.subtitle;

	return { status: 200, body: { title, subtitle } };
};
