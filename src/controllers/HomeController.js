class HomeController {
  index(req, res) {
    res.status(201).json({ mensagem: 'ok' });
  }
}

export default new HomeController();
