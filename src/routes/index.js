import Router from '@koa/router';
import HomeController from '@/app/controllers/HomeController';

import UserController from '../app/controllers/UserController';
import validateForm from '@/app/middlewares/validateForm';
import {object, string} from 'yup';
import CRUDRouter from './CRUDRouter';

const router = new Router();

const schema = object({
  name: string().required(),
});

const userRouter = CRUDRouter(UserController, {
  schemas: {
    create: schema,
  },
  resource: 'users',
}).routes();

router.get('/', HomeController.index);
router.use('/users', userRouter);

export default router.routes();
