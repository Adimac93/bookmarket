import { db } from '$lib/database';
import type { Condition } from '@prisma/client';

export async function ownBook(book_id: string, condition: Condition, owner_id: string) {
	await db.bookWithCondition.update({
		where: {
			book_id_condition: {
				condition,
				book_id
			}
		},
		data: {
			copies: { create: { status: 'unverified', owner_id } }
		}
	});
}

export async function addBookToCart(book_id: string, user_id: string) {
	await db.user.update({
		data: {
			cart: {
				set: { book_id_user_id: { book_id, user_id } }
			}
		},
		where: { id: user_id }
	});
}
