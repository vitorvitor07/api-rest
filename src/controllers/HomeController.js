import Aluno from '../models/Aluno'

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'vitor',
      sobrenome: 'Silva',
      email: 'vitor@gmail.com',
      idade: 3,
      peso: 80.1,
      altura: 1.85
    });

    res.status(201).json(novoAluno);
  }
}

export default new HomeController();
