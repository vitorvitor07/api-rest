-- DropForeignKey
ALTER TABLE `fotos` DROP FOREIGN KEY `fotos_alunoId_fkey`;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `fotos_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `aluno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
