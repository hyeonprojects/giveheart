/*
  Warnings:

  - The values [KAKAO] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('NORMAL', 'APPLE', 'GOOGLE');
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
