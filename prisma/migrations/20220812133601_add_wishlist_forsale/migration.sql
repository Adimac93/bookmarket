/*
  Warnings:

  - You are about to drop the `UserBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_isbn_fkey";

-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_ownerId_fkey";

-- DropTable
DROP TABLE "UserBook";

-- CreateTable
CREATE TABLE "BookInWishlist" (
    "condition" "Condition",
    "count" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BookForSale" (
    "condition" "Condition" NOT NULL,
    "count" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookInWishlist_isbn_buyerId_key" ON "BookInWishlist"("isbn", "buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "BookForSale_condition_isbn_sellerId_key" ON "BookForSale"("condition", "isbn", "sellerId");

-- AddForeignKey
ALTER TABLE "BookInWishlist" ADD CONSTRAINT "BookInWishlist_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookInWishlist" ADD CONSTRAINT "BookInWishlist_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "Book"("isbn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookForSale" ADD CONSTRAINT "BookForSale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookForSale" ADD CONSTRAINT "BookForSale_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "Book"("isbn") ON DELETE RESTRICT ON UPDATE CASCADE;
