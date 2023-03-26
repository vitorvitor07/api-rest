import { Router } from 'express';
import userController from '../controllers/UserController';

const router = new Router();

router.post('/', userController.store);//.sctore ou .create

export default router;

/*
index -> lista todos os usuário -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
PACTH -> Substitui um objeto por outro
PUT -> Atualiza um valor
*/
