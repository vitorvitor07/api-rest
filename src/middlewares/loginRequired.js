import jwt from "jsonwebtoken";
import prisma from "../database/client";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Token requerido"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = dados;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário inválido"],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    console.log();
    return res.status(401).json({
      errors: ["Token inválido"],
    });
  }
};
