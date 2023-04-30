import Router from '@koa/router';
import { object, string } from 'yup';
import HomeController from '@/app/controllers/HomeController';

import MenuController from '@/app/controllers/MenuController';
import PatientController from '@/app/controllers/PatientController';

import UserController from '../app/controllers/UserController';
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

const patientRouter = CRUDRouter(PatientController, {
  resource: 'patients',
});

const menuRouter = CRUDRouter(MenuController, {
  resource: 'menus',
});

router.get('/', HomeController.index);
router.use('/users', userRouter);

router.use(patientRouter.routes());
router.use(menuRouter.routes());

export default router.routes();
