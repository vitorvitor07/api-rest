import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import ImageController from '../controllers/ImageController';

const router = new Router();

router.post('/', loginRequired,ImageController.store);

export default router;
