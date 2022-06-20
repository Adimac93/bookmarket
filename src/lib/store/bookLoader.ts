import type { Grade, Subject } from '@prisma/client';
import * as cheerio from 'cheerio';
import { db } from '$lib/database';

const decoder = new TextDecoder('iso-8859-2');
import data from '$lib/store/data.json';

export async function generateSet() {
	for (let grade in data) {
		for (let subjects in (data as any)[grade]) {
			for (let subject in (data as any)[grade][subjects]) {
				const book = await getBook((data as any)[grade][subjects][subject]);
				await db.book.create({
					data: {
						...book,
						grade: grade as Grade,
						subject: subjects as Subject
					}
				});
			}
		}
	}
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
