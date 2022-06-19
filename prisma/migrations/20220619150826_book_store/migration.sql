-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'GOOD', 'DAMAGED', 'BAD');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BooksWithCondition" (
    "book_id" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "BookCopy" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "books_with_condition_id" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,

    CONSTRAINT "BookCopy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BooksWithCondition_book_id_condition_key" ON "BooksWithCondition"("book_id", "condition");

-- AddForeignKey
ALTER TABLE "BooksWithCondition" ADD CONSTRAINT "BooksWithCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksWithCondition" ADD CONSTRAINT "BooksWithCondition_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCopy" ADD CONSTRAINT "BookCopy_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCopy" ADD CONSTRAINT "BookCopy_books_with_condition_id_condition_fkey" FOREIGN KEY ("books_with_condition_id", "condition") REFERENCES "BooksWithCondition"("book_id", "condition") ON DELETE RESTRICT ON UPDATE CASCADE;
