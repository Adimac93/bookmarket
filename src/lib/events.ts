import dotenv from 'dotenv';
export async function beforeStart() {
	let start = Date.now();
	dotenv.config();
}
