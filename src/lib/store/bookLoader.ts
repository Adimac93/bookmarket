import type { Grade, Subject } from '@prisma/client';
import * as cheerio from 'cheerio';
import { db } from '$lib/database';

const decoder = new TextDecoder('iso-8859-2');
import dataSet from '$lib/store/data.json';

export async function generateSet() {
	for (let grade in dataSet) {
		const grades = (dataSet as any)[grade];
		for (let subjects in grades) {
			for (let subjectBook in grades[subjects]) {
				const book = await getBook(grades[subjects][subjectBook]);
				await db.book.upsert({
					where: { id: book.id },
					create: {
						...book,
						grade: grade as Grade,
						subject: subjects as Subject,
					},
					update: { price: book.price },
				});
			}
		}
	}
}

async function getBook(url: string) {
	const response = await fetch(url);

	const buffer = await response.arrayBuffer();

	const text = decoder.decode(buffer);

	const $ = cheerio.load(text);

	const imageURL = $('div .col-left4 .full-col a').attr('href')?.toString().split('/') || [];

	const image = imageURL.slice(5).join('/');
	const id = imageURL.at(-1)?.slice(0, 13);
	const title = $('div .product-info span').text().split('.')[0];
	const price = parseInt($('.our-price strong #updateable_price-zl').text());
	const author = $('div .author h2')
		.map((i, author) => $(author).text().replace('  ', ' '))
		.toArray()
		.join(', ');

	return { title, author, image, id, price };
}
