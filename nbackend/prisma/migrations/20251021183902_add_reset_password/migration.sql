-- AlterTable
ALTER TABLE `account` ADD COLUMN `id_reset` TEXT NULL,
    ADD COLUMN `id_reset_expiresAt` DATETIME(3) NULL;
