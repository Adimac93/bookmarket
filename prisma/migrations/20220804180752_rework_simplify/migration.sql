/*
  Warnings:

  - You are about to drop the column `is_advanced` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `discord_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facebook_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BookCopy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookInCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookWithCondition` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebookId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAdvanced` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookCopy" DROP CONSTRAINT "BookCopy_book_id_condition_fkey";

-- DropForeignKey
ALTER TABLE "BookCopy" DROP CONSTRAINT "BookCopy_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "BookInCart" DROP CONSTRAINT "BookInCart_book_id_condition_fkey";

-- DropForeignKey
ALTER TABLE "BookInCart" DROP CONSTRAINT "BookInCart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "BookWithCondition" DROP CONSTRAINT "BookWithCondition_book_id_fkey";

-- DropIndex
DROP INDEX "User_discord_id_key";

-- DropIndex
DROP INDEX "User_facebook_id_key";

-- DropIndex
DROP INDEX "User_google_id_key";

-- DropIndex
DROP INDEX "User_phone_number_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "is_advanced",
ADD COLUMN     "isAdvanced" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "discord_id",
DROP COLUMN "facebook_id",
DROP COLUMN "google_id",
DROP COLUMN "phone_number",
ADD COLUMN     "discordId" TEXT,
ADD COLUMN     "facebookId" TEXT,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "BookCopy";

-- DropTable
DROP TABLE "BookInCart";

-- DropTable
DROP TABLE "BookWithCondition";

-- CreateTable
CREATE TABLE "BookInstance" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,
    "bookId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "BookInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId");

-- AddForeignKey
ALTER TABLE "BookInstance" ADD CONSTRAINT "BookInstance_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookInstance" ADD CONSTRAINT "BookInstance_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
