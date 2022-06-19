import { Grade, Subject } from '@prisma/client';
import * as cheerio from 'cheerio';
import { db } from '$lib/database';

const decoder = new TextDecoder('iso-8859-2');
import data from '$lib/store/data.json';

export async function generateSet(grade: string) {
	for (let i in (data as any)[grade]) {
		const book = await getBook((data as any)[grade][i]);
		await db.book.create({ data: { ...book } });
	}
}

async function getBook(url: string) {
	const response = await fetch(url);

	const buffer = await response.arrayBuffer();

	const text = decoder.decode(buffer);

	const $ = cheerio.load(text);

	const image = 'https:' + $('div .col-left4 .full-col img').attr('src');
	const title = $('div .product-info span').text();

	const author = $('div .author h2')
		.map((i, author) => $(author).text().replace('  ', ' '))
		.toArray()
		.join(', ');

	const path = $('div #path').text().split('\n');

	const gradeConvert = {
		1: Grade.FIRST,
		2: Grade.SECOND,
		3: Grade.THIRD,
		4: Grade.FOURTH
	} as { [K: string]: Grade };

	const grade: Grade = gradeConvert[path[4][6]];

	const subjectConvert = {
		matematyka: Subject.MATH,
		'język polski': Subject.POLISH,
		angielski: Subject.ENGLISH,
		historia: Subject.HISTORY,
		chemia: Subject.CHEMISTRY,
		'wiedza o społeczeństwie': Subject.CIVICS,
		'język rosyjski': Subject.RUSSIAN,
		'język niemiecki': Subject.GERMAN,
		geografia: Subject.GEOGRAPHY,
		informatyka: Subject.COMPUTER_SCIENCE,
		fizyka: Subject.PHYSICS,
		biologia: Subject.BIOLOGY,
		przedsiębiorczość: Subject.ENTREPRENEURSHIP
	} as { [K: string]: Subject };
	const subject: Subject = subjectConvert[path[5].toLowerCase().trim()];

	const description = $('#opis').text();

	console.log(`Title: ${title}`);
	console.log(`Authors: ${author}`);
	console.log(`Grade: ${grade}`);
	console.log(`Subject: ${subject}`);
	console.log(`image: ${image}`);
	console.log('');
	//console.log(`Description: ${description}`);
	return { title, author, description, grade, subject, image };
}
