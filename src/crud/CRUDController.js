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

  async function edit(ctx) {
    const res = await Model.findByPk(+ctx.params.id, {
      include: ctx.query.include,
      attributes: {
        exclude,
      },
    });

    if (!res) throw new Error('Not found');

    console.log(res);

    return ctx.view(`resources/${resource}/edit`, {
      resource: res,
    });
  }

  async function create(ctx) {
    return ctx.view(`resources/${resource}/create`);
  }

  async function store(ctx) {
    ctx.body = await Model.create(ctx.request.body);
    ctx.redirect(resource);
  }

  async function update(ctx) {
    const instance = await Model.findByPk(+ctx.params.id, {
      attributes: {
        exclude,
      },
    });
    instance.set(ctx.request.body);
    await instance.save();
    ctx.redirect(`/${resource}/${ctx.params.id}/edit`);
  }

  async function destroy(ctx) {
    const instance = await Model.findByPk(+ctx.params.id, {
      attributes: {
        exclude,
      },
    });
    await instance.destroy();
    ctx.body = instance;
    ctx.redirect(`/${resource}`);
  }

  if (!routesOnly) {
    return {
      index,
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
