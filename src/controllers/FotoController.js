import multer from "multer";
import prisma from "../database/client";
import multerConfig from "../config/multerConfig";

const upload = multer(multerConfig).single("image");

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      try {
        if (!req.file) {
          return res.status(400).json({
            error: ["Arquivo não encontrado"],
          });
        }

        if (error) {
          return res.status(400).json({
            error: [error.code],
          });
        }

        const { originalname, filename } = req.file;

        const alunoId = parseInt(req.body.alunoId, 10);

        if (!alunoId) return res.status(400).json({ errors: ["Id requerido"] });

        const alunoExiste = await prisma.aluno.findUnique({
          where: { id: alunoId },
        });

        if (!alunoExiste) {
          return res.status(400).json({ errors: ["Aluno não encontrado"] });
        }

        const foto = await prisma.foto.create({
          data: { filename, originalname, alunoId },
        });

        return res.json(foto);
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: ["Erro interno no servidor"] });
      }
    });
  }
}

export default new FotoController();
