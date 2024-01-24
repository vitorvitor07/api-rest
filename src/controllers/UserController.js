import bcryptjs from "bcryptjs";
import prisma from "../database/client";

class UserController {
  async store(req, res) {
    try {
      const { email, nome, senha } = req.body;

      if (!email || !nome || !senha) {
        const invalidFilds = [];
        if (!email) invalidFilds.push("email");
        if (!nome) invalidFilds.push("nome");
        if (!senha) invalidFilds.push("senha");

        return res.status(400).json({
          error: [`Campos invalidos: ${invalidFilds.join(", ")}`],
        });
      }

      if (senha.length > 24 || senha.length < 6) {
        return res
          .status(400)
          .json({ error: ["A senha deve conter entre 6 e 24 caracteres"] });
      }

      const userExiste = await prisma.user.findUnique({
        where: { email },
      });

      if (userExiste) {
        return res.status(400).json({ error: ["Usuário já existe"] });
      }

      const senhaHash = await bcryptjs.hash(senha, 8);

      const novoUser = await prisma.user.create({
        data: { email, nome, senha: senhaHash },
      });

      return res.status(201).json({
        msg: "Usuário criado",
        usuario: { email: novoUser.email, nome: novoUser.nome },
      });
    } catch (e) {
      return res.status(400).json({
        errors: [e], // e.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: { email: true, nome: true },
      });

      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json(null);
    }
  }

  // async show(req, res) {
  //   try {
  //     const user = await User.findByPk(req.params.id); // Primary Key

  //     return res.status(200).json(user);
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: e.errors.map((erro) => erro.message),
  //     });
  //   }
  // }

  async update(req, res) {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.userId } });
      const { id } = user;
      const { nome, email } = req.body;
      const data = {};

      Object.keys({ id, nome, email }).forEach((key) => {
        if (req.body[key]) data[key] = req.body[key];
      });

      const dadosAtualizados = await prisma.user.update({
        where: { id },
        data,
        select: { nome: true, email: true, updatedAt: true },
      });

      return res.status(200).json(dadosAtualizados);
    } catch (e) {
      return res.status(500).json({
        errors: ["Erro interno do servidor"],
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          msg: "Id não encontrado",
          errors: ["Missing ID."],
        });
      }
      const userDeletado = await prisma.user.delete({
        where: { id: req.userId },
      }); // Primary Key

      if (!userDeletado) {
        return res.status(400).json({
          errors: ["Usuário inexistente"],
        });
      }

      return res.status(200).json({ userDeletado });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        errors: "Erro interno do servidor",
      });
    }
  }
}

export default new UserController();
