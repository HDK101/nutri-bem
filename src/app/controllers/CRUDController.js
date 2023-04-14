/* eslint-disable class-methods-use-this */

export default function CRUDController(Model, options = {}) {
  const { 
    exclude, 
    routesOnly,
    resource,
  } = options;

  if (!resource) throw new Error('"resource" must be set to a string');

  async function index(ctx) {
      const resources = await Model.findAll({
        attributes: {
          exclude,
        },
        include: ctx.query.include,
      });

      return ctx.view(`resources/${resource}/index`, {
        resources,
      });
  }

  async function show(ctx) {
      const resource = await Model.findByPk(+ctx.params.id, {
        include: ctx.query.include,
        attributes: {
          exclude,
        },
      });
      ctx.view(`resources/${resource}/show`, {
        resource,
      });
  }

  async function create(ctx) {
      console.log('waltar');
      await Model.create({
        name: 'Walter',
      });
      return ctx.view(`resources/${resource}/create`);
  }

  async function store(ctx) {
    ctx.body = await Model.create(ctx.request.body);
    ctx.redirect(resource);
  }

  async function edit(ctx) {
    ctx.view(`resources/${resource}/edit`);
  }

  async function update(ctx) {
    const instance = await Model.findByPk(+ctx.params.id, {
      attributes: {
        exclude,
      },
    });
    instance.set(ctx.request.body);
    await instance.save();
    ctx.body = instance;
    ctx.redirect(`${resource}/edit/${ctx.params.id}`);
  }

  async function destroy(ctx) {
    const instance = await Model.findByPk(+ctx.params.id, {
      attributes: {
        exclude,
      },
    });
    await instance.destroy();
    ctx.body = instance;
    ctx.redirect(`${resource}/edit/${ctx.params.id}`);
  }

  if (!routesOnly) {
    return {
      index,
      show,
      create,
      store,
      edit,
      update,
      destroy,
    };
  }

  const controller = {};

  if (routesOnly.includes('index')) {
    controller.index = index;
  }

  if (routesOnly.includes('show')) {
    controller.show = show;
  }

  if (routesOnly.includes('store')) {
    controller.store = store;
  }

  if (routesOnly.includes('update')) {
    controller.update = update;
  }

  if (routesOnly.includes('destroy')) {
    controller.destroy = destroy;
  }

  return controller;
}
