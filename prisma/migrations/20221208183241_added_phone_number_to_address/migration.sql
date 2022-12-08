/*
  Warnings:

  - You are about to drop the column `home_street` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `middle` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "home_street",
DROP COLUMN "middle",
ADD COLUMN     "flat_number" INTEGER,
ADD COLUMN     "middlename" TEXT;
