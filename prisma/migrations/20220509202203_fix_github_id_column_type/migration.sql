/*
  Warnings:

  - A unique constraint covering the columns `[github_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `github_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "github_id",
ADD COLUMN     "github_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_github_id_key" ON "users"("github_id");
