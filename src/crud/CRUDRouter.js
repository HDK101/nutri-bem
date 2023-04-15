import validateForm from './validateForm';
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
  if (controller.edit) crudRouter.get('/:id/edit', controller.edit);
  if (controller.store) {
    if (create) crudRouter.post('/', validateForm(create, { resource, redirectType: 'create' }), controller.store);
    else crudRouter.post('/', controller.store)
  }
  if (controller.update) {
    if (update) crudRouter.post('/:id/update', validateForm(update, { resource, redirectType: 'edit' }), controller.update);
    else crudRouter.post('/:id/update', controller.update);
  }
  if (controller.destroy) crudRouter.post('/:id/delete', controller.destroy);

  return crudRouter;
}
