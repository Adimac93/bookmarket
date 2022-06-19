/*
  Warnings:

  - Added the required column `grade` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');

-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('MATH', 'ENGLISH', 'POLISH', 'GERMAN', 'RUSSIAN', 'HISTORY', 'CIVICS', 'CHEMISTRY', 'BIOLOGY', 'GEOGRAPHY', 'PHYSICS', 'COMPUTER_SCIENCE', 'ENTREPRENEURSHIP');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "grade" "Grade" NOT NULL,
ADD COLUMN     "subject" "Subject" NOT NULL;
