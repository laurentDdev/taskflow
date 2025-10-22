-- AlterTable
ALTER TABLE `notification` ADD COLUMN `directLink` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'unread',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `workspace_invite` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
