import validateForm from '@/app/middlewares/validateForm';
import Router from '@koa/router';

export default function CRUDRouter(controller, options = { resource, schemas: {} }) {
  const { 
    schemas: {
      create,
      update,
    },
    resource,
  } = options;

  const crudRouter = new Router();
  if (controller.index) crudRouter.get('/', controller.index);
  if (controller.create) crudRouter.get('/create', controller.create);
  if (controller.edit) crudRouter.get('/edit/:id', controller.edit);
  if (controller.show) crudRouter.get('/:id', controller.show);
  if (controller.store) {
    if (create) crudRouter.post('/', validateForm(create, { resource, redirectType: 'create' }), controller.store);
    else crudRouter.post('/', controller.store)
  }
  if (controller.update) {
    if (update) crudRouter.put('/:id', validateForm(update, { resource, redirectType: 'edit' }), controller.update);
    else crudRouter.put('/:id', controller.update);
  }
  if (controller.destroy) crudRouter.del('/:id', controller.destroy);

  return crudRouter;
}
