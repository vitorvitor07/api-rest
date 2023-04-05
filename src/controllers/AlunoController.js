import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll();

      if (!alunos) {
        return res.status(400).json({ errors: ['Alunos não encontrado'] });
      }

      return res.status(200).json({ alunos });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.status(201).json({ aluno });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['Id não encontrado'] });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }

      return res.status(200).json({ aluno });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['Id não encontrado'] });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.status(200).json({ alunoAtualizado });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['Id não encontrado'] });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }

      await aluno.destroy();

      return res.status(200).json({ msg: 'Aluno deletado' });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new AlunoController();
