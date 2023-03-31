import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    res.status(201).json('index');
  }
}

export default new HomeController();
