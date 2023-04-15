import Router from '@koa/router';
import HomeController from '@/app/controllers/HomeController';

import UserController from '../app/controllers/UserController';
import {object, string} from 'yup';
import CRUDRouter from '../crud/CRUDRouter';

const router = new Router();

const schema = object({
  name: string().required('Campo de nome está vazio').min(10, 'Mínimo de dez caracteres'),
});

const userRouter = CRUDRouter(UserController, {
  schemas: {
    create: schema,
    update: schema,
  },
  resource: 'users',
}).routes();

router.get('/', HomeController.index);
router.use('/users', userRouter);

export default router.routes();
