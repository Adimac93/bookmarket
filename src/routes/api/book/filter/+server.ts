import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { Grade, Subject } from '@prisma/client';
import { db } from '$lib/database';

export const GET: RequestHandler = async ({ url }) => {
	const isbn = url.searchParams.get('isbn');
	const title = url.searchParams.get('title');
	const authors = url.searchParams.get('authors');
	const grade = url.searchParams.get('grade')?.toUpperCase();
	const subject = url.searchParams.get('subject')?.toUpperCase();

	const books = await db.book.findMany({
		where: {
			AND: [
				{ isbn: isbn ?? undefined },
				{ title: title ? { contains: title, mode: 'insensitive' } : undefined },
				{ author: authors ? { contains: authors, mode: 'insensitive' } : undefined },
				{ grade: (grade ?? '') in Grade ? (grade as Grade) : undefined },
				{ subject: (subject ?? '') in Subject ? (subject as Subject) : undefined },
			],
		},
	});

	return json({ books });
};
