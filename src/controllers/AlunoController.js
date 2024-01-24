import prisma from "../database/client";

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await prisma.aluno.findMany({
        include: {
          fotos: {
            orderBy: { id: "desc" },
            select: { id: true, filename: true },
          },
        },
        orderBy: { id: "desc" },
      });

      if (!alunos) {
        return res.status(400).json({ errors: ["Alunos não encontrados"] });
      }

      return res.status(200).json(alunos);
    } catch (e) {
      return res.status(500).json({ errors: ["Erro interno do servidor"] });
    }
  }

  async store(req, res) {
    try {
      const { nome, sobrenome, email, peso, dataNascimento, altura } = req.body;

      if (
        !nome ||
        !sobrenome ||
        !email ||
        !peso ||
        !dataNascimento ||
        !altura
      ) {
        return res.status(400).json({
          errors: ["Dados inválidos"],
        });
      }

      try {
        // eslint-disable-next-line no-unused-vars
        const date = new Date(dataNascimento);
      } catch (error) {
        return res.status(400).json({
          errors: ["Formato de data inválido"],
        });
      }

      const alunoExiste = await prisma.aluno.findUnique({ where: { email } });

      if (alunoExiste) {
        return res.status(400).json({
          errors: ["Aluno já existente"],
        });
      }

      const aluno = await prisma.aluno.create({
        data: {
          nome,
          sobrenome,
          email,
          peso,
          dataNascimento,
          altura,
        },
      });

      return res.status(201).json(aluno);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ errors: ["Erro interno do servidor"] });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ["Id não encontrado"] });

      const aluno = await prisma.aluno.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          fotos: {
            orderBy: { id: "desc" },
            select: { id: true, filename: true },
          },
        },
      });

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não encontrado"] });
      }

      return res.status(200).json(aluno);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: "Erro interno do servidor" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const { nome, sobrenome, email, peso, dataNascimento, altura } = req.body;

      if (!id) {
        return res.status(400).json({ errors: ["Id não encontrado"] });
      }

      const aluno = await prisma.aluno.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não encontrado"] });
      }

      const data = {};

      Object.keys({
        nome,
        sobrenome,
        email,
        peso,
        dataNascimento,
        altura,
      }).forEach((key) => {
        if (req.body[key]) data[key] = req.body[key];
      });

      const alunoAtualizado = await prisma.aluno.update({
        where: { id: parseInt(id, 10) },
        data,
      });

      return res.status(200).json({ alunoAtualizado });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ errors: ["Erro interno do servidor"] });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["Id não encontrado"] });
      }

      const aluno = await prisma.aluno.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não encontrado"] });
      }

      await prisma.aluno.delete({ where: { id: parseInt(id, 10) } });

      return res.status(200).json({ msg: "Aluno deletado" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: "Erro interno do servidor" });
    }
  }
}

export default new AlunoController();
