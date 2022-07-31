/*
  Warnings:

  - You are about to drop the column `is_advanced` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `discord_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facebook_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BookCopy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookInCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookWithCondition` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebookId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAdvanced` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectName` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `User` table without a default value. This is not possible if the table is not empty.

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

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "is_advanced",
DROP COLUMN "subject",
ADD COLUMN     "isAdvanced" BOOLEAN NOT NULL,
ADD COLUMN     "subjectName" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "discord_id",
DROP COLUMN "facebook_id",
DROP COLUMN "google_id",
ADD COLUMN     "discordId" TEXT,
ADD COLUMN     "facebookId" TEXT,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "grade" "Grade" NOT NULL,
ADD COLUMN     "profileId" TEXT NOT NULL,
ADD COLUMN     "schoolId" TEXT NOT NULL;

-- DropTable
DROP TABLE "BookCopy";

-- DropTable
DROP TABLE "BookInCart";

-- DropTable
DROP TABLE "BookWithCondition";

-- DropEnum
DROP TYPE "Subject";

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookInstance" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,

    CONSTRAINT "BookInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "name" TEXT NOT NULL,
    "alias" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_ProfileToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_alias_key" ON "Subject"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToSubject_AB_unique" ON "_ProfileToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToSubject_B_index" ON "_ProfileToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_subjectName_fkey" FOREIGN KEY ("subjectName") REFERENCES "Subject"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookInstance" ADD CONSTRAINT "BookInstance_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookInstance" ADD CONSTRAINT "BookInstance_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToSubject" ADD CONSTRAINT "_ProfileToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToSubject" ADD CONSTRAINT "_ProfileToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("name") ON DELETE CASCADE ON UPDATE CASCADE;
