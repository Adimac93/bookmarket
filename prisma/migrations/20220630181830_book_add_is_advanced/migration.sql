/*
  Warnings:

  - Added the required column `is_advanced` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "is_advanced" BOOLEAN NOT NULL;
