/*
  Warnings:

  - You are about to drop the column `userId` on the `workspace` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `workspace` DROP FOREIGN KEY `Workspace_userId_fkey`;

-- DropIndex
DROP INDEX `Workspace_userId_fkey` ON `workspace`;

-- AlterTable
ALTER TABLE `workspace` DROP COLUMN `userId`;
