import User from "../models/User";

export default async function authorize(ctx, next) {
  const { id } = ctx.session;

  const user = await User.findByPk(id);

  if (typeof id === 'undefined' || !user) {
    ctx.redirect('/login');
    return;
  }

  await next();
}
