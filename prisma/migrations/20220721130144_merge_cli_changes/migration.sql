/*
  Warnings:

  - Added the required column `url` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Subject" ADD VALUE 'EDUCATION_FOR_SAFETY';

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "url" TEXT NOT NULL;
