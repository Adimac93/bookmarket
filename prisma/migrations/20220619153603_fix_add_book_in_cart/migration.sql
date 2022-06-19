/*
  Warnings:

  - You are about to drop the column `books_with_condition_id` on the `BookCopy` table. All the data in the column will be lost.
  - You are about to drop the `BooksWithCondition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `book_id` to the `BookCopy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookCopy" DROP CONSTRAINT "BookCopy_books_with_condition_id_condition_fkey";

-- DropForeignKey
ALTER TABLE "BooksWithCondition" DROP CONSTRAINT "BooksWithCondition_book_id_fkey";

-- DropForeignKey
ALTER TABLE "BooksWithCondition" DROP CONSTRAINT "BooksWithCondition_userId_fkey";

-- AlterTable
ALTER TABLE "BookCopy" DROP COLUMN "books_with_condition_id",
ADD COLUMN     "book_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "BooksWithCondition";

-- CreateTable
CREATE TABLE "BookWithCondition" (
    "book_id" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,

    CONSTRAINT "BookWithCondition_pkey" PRIMARY KEY ("book_id","condition")
);

-- CreateTable
CREATE TABLE "BookInCart" (
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "condition" "Condition" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookInCart_book_id_user_id_key" ON "BookInCart"("book_id", "user_id");

-- AddForeignKey
ALTER TABLE "BookWithCondition" ADD CONSTRAINT "BookWithCondition_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookInCart" ADD CONSTRAINT "BookInCart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookInCart" ADD CONSTRAINT "BookInCart_book_id_condition_fkey" FOREIGN KEY ("book_id", "condition") REFERENCES "BookWithCondition"("book_id", "condition") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCopy" ADD CONSTRAINT "BookCopy_book_id_condition_fkey" FOREIGN KEY ("book_id", "condition") REFERENCES "BookWithCondition"("book_id", "condition") ON DELETE RESTRICT ON UPDATE CASCADE;
