-- AlterTable
ALTER TABLE `aluno` ALTER COLUMN `nome` DROP DEFAULT,
    ALTER COLUMN `sobrenome` DROP DEFAULT,
    ALTER COLUMN `email` DROP DEFAULT,
    ALTER COLUMN `peso` DROP DEFAULT,
    ALTER COLUMN `altura` DROP DEFAULT;

-- CreateTable
CREATE TABLE `fotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalname` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `fotos_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
