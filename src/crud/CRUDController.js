import {Op} from "sequelize";

function createSearchQuery({ column, value }) {
  if (column && value) {
    return {
      [column]: {
        [Op.like]: `%${value}%`,
      },
    };
  }
  return null;
}

export default function CRUDController(Model, options = {}) {
  const {
    exclude,
    routesOnly,
    resource,
    include,
  } = options;

  if (!resource) throw new Error('"resource" must be set to a string');

  async function index(ctx) {
    const resources = await Model.findAll({
      where: createSearchQuery(ctx.query),
      attributes: {
        exclude,
      },
      include,
    });

    return ctx.view(`resources/${resource}/index`, {
      resources,
    });
  }

  async function edit(ctx) {
    const res = await Model.findByPk(+ctx.params.id, {
      attributes: {
        exclude,
      },
      include,
    });

    if (!res) throw new Error('Not found');

    return ctx.view(`resources/${resource}/edit`, {
      resource: res,
    });
  }

  async function create(ctx) {
    return ctx.view(`resources/${resource}/create`);
  }

  async function store(ctx) {
    await Model.create(ctx.request.body);

    ctx.redirect(`${resource}`);
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
