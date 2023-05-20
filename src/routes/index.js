import Router from '@koa/router';
import { object, string } from 'yup';
import HomeController from '@/app/controllers/HomeController';
import MenuController from '@/app/controllers/MenuController';
import FoodController from '@/app/controllers/FoodController';
import PatientController from '@/app/controllers/PatientController';
import RestrictionController from '@/app/controllers/RestrictionController';
import createPatient from '@/app/schemas/createPatient';
import PatientRestrictionController from '@/app/controllers/PatientRestrictionController';
import createFood from '@/app/schemas/createFood';
import createRestriction from '@/app/schemas/createRestriction';
import FoodRestrictionController from '@/app/controllers/FoodRestrictionController';
import CRUDRouter from '../crud/CRUDRouter';
import UserController from '../app/controllers/UserController';
import MenuFoodController from '@/app/controllers/MenuFoodController';
import createUser from '@/app/schemas/createUser';
import MenuPatientController from '@/app/controllers/MenuPatientController';

const router = new Router();

const userRouter = CRUDRouter(UserController, {
  schemas: {
    create: createUser,
    update: createUser,
  },
  resource: 'users',
}).routes();

const patientRouter = CRUDRouter(PatientController, {
  schemas: {
    create: createPatient,
    update: createPatient,
  },
  resource: 'patients',
});

router.get('/patients/:patientId/restrictions', PatientRestrictionController.index);
router.post('/patients/:patientId/restrictions/:restrictionId', PatientRestrictionController.store);
router.post('/patients/:patientId/restrictions/:restrictionId/delete', PatientRestrictionController.destroy);

const menuRouter = CRUDRouter(MenuController, {
  resource: 'menus',
});

const foodRouter = CRUDRouter(FoodController, {
  resource: 'foods',
  schemas: {
    create: createFood,
    update: createFood,
  },
});

router.get('/foods/:foodId/restrictions', FoodRestrictionController.index);
router.post('/foods/:foodId/restrictions/:restrictionId', FoodRestrictionController.store);
router.post('/foods/:foodId/restrictions/:restrictionId/delete', FoodRestrictionController.destroy);

const restrictionRouter = CRUDRouter(RestrictionController, {
  resource: 'restrictions',
  schemas: {
    create: createRestriction,
    update: createRestriction,
  },
});

router.get('/', HomeController.login);
router.get('/home', HomeController.index);
router.post('/session', HomeController.session);
router.post('/logout', HomeController.logout);
router.use('/users', userRouter);
router.use('/patients', patientRouter.routes());

router.use('/menus', menuRouter.routes());
router.get('/menus/:menuId/patient', MenuPatientController.index);
router.post('/menus/:menuId/patient/:patientId', MenuPatientController.store);
router.get('/menus/:menuId/foods', MenuFoodController.index);
router.get('/menus/:menuId/foods/:foodId/amount', MenuFoodController.amount);
router.post('/menus/:menuId/foods/:foodId', MenuFoodController.store);
router.post('/menus/:menuId/foods/:foodId/delete', MenuFoodController.destroy);

router.use('/foods', foodRouter.routes());
router.use('/restrictions', restrictionRouter.routes());

export default router.routes();
