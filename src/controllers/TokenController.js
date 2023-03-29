import User from '../models/User';
// eslint-disable-next-line import/order
import jwt from 'jsonwebtoken';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        res.status(401).json({
          errors: ['Credencias inválidas'],
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(401).json({
          errors: ['Usuário inexistente'],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        res.status(401).json({
          errors: ['Credencias inválidas'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      res.status(200).json({ token });
    } catch (e) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }
  }
}

export default new TokenController();
