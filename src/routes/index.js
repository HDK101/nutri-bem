import Router from '@koa/router';
import HomeController from '@/app/controllers/HomeController';

import UserController from '../app/controllers/UserController';
import validateForm from '@/app/middlewares/validateForm';
import {object, string} from 'yup';

const router = new Router();

const schema = object({
  name: string().required(),
  password: string().required(),
});

router.get('/', HomeController.index);
router.post('/users', validateForm(schema), UserController.store);

export default router.routes();
