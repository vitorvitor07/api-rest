import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.status(201).json({ msg: 'Usuário criado', usuario: { id, nome, email } });
    } catch (e) {
      return res.status(400).json({
        errors: ['Erro'], // e.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });

      return res.status(200).json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id); // Primary Key

      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((erro) => erro.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          errors: ['Id não encontrado'],
        });
      }
      const user = await User.findByPk(req.userId); // Primary Key

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário inexistente'],
        });
      }
      const dadosAtualizados = await user.update(req.body);
      const { id, nome, email } = dadosAtualizados;

      return res.status(200).json({ msg: 'usuário atualizado', usuario: { id, nome, email } });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          msg: 'Id não encontrado',
          errors: ['Missing ID.'],
        });
      }
      const user = await User.findByPk(req.userId); // Primary Key

      if (!user) {
        return res.status(400).json({
          msg: 'Usuário inexistente',
          errors: ['Missing user.'],
        });
      }
      const userDeletado = await user.destroy();

      return res.status(200).json({
        msg: 'Usuário deletado',
        usuario: userDeletado,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new UserController();
