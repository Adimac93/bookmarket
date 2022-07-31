import dotenv from 'dotenv';
import { db } from './database';
import subjects from '$lib/assets/subjects.json';
export async function beforeStart() {
	let start = Date.now();
	dotenv.config();
	await loadSubjects();
	console.log(`Setup finished in ${(Date.now() - start) / 1000}s`);
}

async function loadSubjects() {
	const data = Object.entries(subjects).map(([key, value]) => {
		return { name: key, alias: value[0] };
	});
	await db.subject.createMany({ data, skipDuplicates: true });
}
