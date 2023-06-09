import Router from '@koa/router';
import { object, string } from 'yup';
import HomeController from '@/app/controllers/HomeController';
import MenuController from '@/app/controllers/MenuController';
import FoodController from '@/app/controllers/FoodController';
import PatientController from '@/app/controllers/PatientController';
import RestrictionController from '@/app/controllers/RestrictionController';
import createPatient from '@/app/schemas/createPatient';
import PatientRestrictionController from '@/app/controllers/PatientRestrictionController';
import PatientMenusController from '@/app/controllers/PatientMenusController';
import createFood from '@/app/schemas/createFood';
import createRestriction from '@/app/schemas/createRestriction';
import FoodRestrictionController from '@/app/controllers/FoodRestrictionController';
import CRUDRouter from '../crud/CRUDRouter';
import UserController from '../app/controllers/UserController';
import MenuFoodController from '@/app/controllers/MenuFoodController';
import createUser from '@/app/schemas/createUser';
import MenuPatientController from '@/app/controllers/MenuPatientController';
import authorize from '@/app/middlewares/authorize';
import createMenu from '@/app/schemas/createMenu';
import RegisterController from '@/app/controllers/RegisterController';
import validateForm, { rawValidateForm } from '@/crud/validateForm';
import InfinityController from '@/app/controllers/InfinityController';

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

const menuRouter = CRUDRouter(MenuController, {
  resource: 'menus',
  schemas: {
    create: createMenu,
    update: createMenu,
  },
});

const foodRouter = CRUDRouter(FoodController, {
  resource: 'foods',
  schemas: {
    create: createFood,
    update: createFood,
  },
});

const restrictionRouter = CRUDRouter(RestrictionController, {
  resource: 'restrictions',
  schemas: {
    create: createRestriction,
    update: createRestriction,
  },
});

router.get('/', HomeController.index);
router.get('/login', HomeController.login);
router.post('/session', HomeController.session);

router.get('/infinity1', InfinityController.infinity1);
router.get('/infinity2', InfinityController.infinity2);
router.get('/infinity3', InfinityController.infinity3);

// router.use('/users', userRouter);

router.get('/register', RegisterController.create);
router.post('/register', rawValidateForm(createUser, { redirectTo: '/register' }), RegisterController.store);

router.use(authorize);
router.get('/my-account', RegisterController.edit);
router.post('/my-account', rawValidateForm(createUser, { redirectTo: '/my-account' }), RegisterController.update);
router.get('/home', HomeController.home);
router.post('/logout', HomeController.logout);
router.use('/patients', patientRouter.routes());

router.get('/foods/:foodId/restrictions', FoodRestrictionController.index);
router.post('/foods/:foodId/restrictions/:restrictionId', FoodRestrictionController.store);
router.post('/foods/:foodId/restrictions/:restrictionId/delete', FoodRestrictionController.destroy);

router.get('/patients/:patientId/restrictions', PatientRestrictionController.index);
router.post('/patients/:patientId/restrictions/:restrictionId', PatientRestrictionController.store);
router.post('/patients/:patientId/restrictions/:restrictionId/delete', PatientRestrictionController.destroy);
router.post('/patients/:patientId/menus/:menuId/delete', PatientMenusController.destroy);
router.get('/patients/:patientId/menus', PatientMenusController.index);

router.use('/menus', menuRouter.routes());
router.get('/menus/patients', MenuController.patients);
router.get('/menus/:menuId/patient', MenuPatientController.index);
router.post('/menus/:menuId/patient/:patientId', MenuPatientController.store);
router.get('/menus/:menuId/foods', MenuFoodController.index);
router.get('/menus/:menuId/foods/:foodId/amount', MenuFoodController.amount);
router.post('/menus/:menuId/foods/:foodId', MenuFoodController.store);
router.post('/menus/:menuId/foods/:foodId/delete', MenuFoodController.destroy);

router.use('/foods', foodRouter.routes());
router.use('/restrictions', restrictionRouter.routes());

export default router.routes();
