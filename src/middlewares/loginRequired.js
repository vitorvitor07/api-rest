import jwt from 'jsonwebtoken';
import User from '../models/User';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  const { autorization } = req.headers;

  if (!autorization) {
    res.status(401).json({
      errors: ['Token requerido'],
    });
  }

  // eslint-disable-next-line no-unused-vars
  const [texto, token] = autorization.split(' ');

  console.log(token);
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    res.status(401).json({
      errors: ['Token inválido'],
    });
  }

  next();
};
