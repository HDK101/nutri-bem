import User from "../models/User";

const RegisterController = {
  async store(ctx) {
    await User.create(ctx.request.body);

    ctx.redirect('/login?created=true');
  },

  async create(ctx) {
    return ctx.view('resources/users/create');
  },

  async edit(ctx) {
    const user = await User.findByPk(ctx.session.id);
    return ctx.view('resources/users/edit', {
      user,
      created: typeof ctx.query.created !== 'undefined',
    });
  },

  async update(ctx) {
    const instance = await User.findByPk(ctx.session.id);
    instance.set(ctx.request.body);
    await instance.save();
    ctx.redirect('/my-account?created=true');
  },
};

export default RegisterController;
