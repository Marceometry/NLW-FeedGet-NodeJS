/*
  Warnings:

  - You are about to drop the column `userId` on the `feedbacks` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_userId_fkey";

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "userId",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
