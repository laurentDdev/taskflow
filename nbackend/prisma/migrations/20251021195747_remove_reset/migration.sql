/*
  Warnings:

  - You are about to drop the column `id_reset` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `id_reset_expiresAt` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `id_reset`,
    DROP COLUMN `id_reset_expiresAt`;
