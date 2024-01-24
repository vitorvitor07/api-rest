/*
  Warnings:

  - You are about to drop the column `birthday` on the `aluno` table. All the data in the column will be lost.
  - Added the required column `dataNascimento` to the `aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aluno` DROP COLUMN `birthday`,
    ADD COLUMN `dataNascimento` DATETIME(3) NOT NULL;
