import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não reais
// router.get('/', userController.index);
// router.get('/:id', userController.show);

// Reais
router.post('/', loginRequired, userController.store);
router.put('/', userController.update);
router.delete('/', loginRequired, userController.delete);

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
