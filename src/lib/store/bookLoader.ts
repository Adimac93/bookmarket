import { Condition, type Grade, type Subject } from '@prisma/client';
import * as cheerio from 'cheerio';
import { db } from '$lib/database';

const decoder = new TextDecoder('iso-8859-2');
import dataSet from '$lib/store/data.json';

export async function generateSet() {
	for (let grade in dataSet) {
		const grades = (dataSet as any)[grade];
		for (let subjects in grades) {
			for (let subjectBook in grades[subjects]) {
				const book = await db.book.create({
					data: {
						...(await getBook(grades[subjects][subjectBook])),
						grade: grade as Grade,
						subject: subjects as Subject
					}
				});
				await registerConditions(book.id);
			}
		}
	}
}

async function registerConditions(book_id: string) {
	await db.bookWithCondition.createMany({
		data: [
			{ condition: Condition.NEW, book_id },
			{ condition: Condition.GOOD, book_id },
			{ condition: Condition.DAMAGED, book_id },
			{ condition: Condition.BAD, book_id }
		]
	});
}

async function getBook(url: string) {
	const response = await fetch(url, {});

	const buffer = await response.arrayBuffer();

	const text = decoder.decode(buffer);

	const $ = cheerio.load(text);

	const image = 'https:' + $('div .col-left4 .full-col img').attr('src');
	const title = $('div .product-info span').text().split('.')[0];

	const author = $('div .author h2')
		.map((i, author) => $(author).text().replace('  ', ' '))
		.toArray()
		.join(', ');

	const description = $('#opis').text().trim();

	return { title, author, description, image };
}
