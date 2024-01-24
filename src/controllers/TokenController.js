import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
// import User from "../models/User";
import prisma from "../database/client";

class TokenController {
  async store(req, res) {
    try {
      const { email = "", senha = "" } = req.body;

      if (!email || !senha) {
        return res.status(401).json({
          errors: ["Credencias inválidas"],
        });
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({
          errors: ["Credencias inválidas"],
        });
      }

      const { id, senha: userPassword } = user;

      const senhaValida = await bcryptjs.compare(senha, userPassword);

      if (!senhaValida) {
        return res.status(401).json({
          errors: ["Credencias inválidas"],
        });
      }

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({ token });
    } catch (e) {
      console.error(e);
      return res.status(401).json({
        errors: ["Credenciais inválidas"],
      });
    }
  }
}

export default new TokenController();
