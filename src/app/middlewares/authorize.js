export default async function authorize(ctx, next) {
  const { id } = ctx.session;

  if (typeof id === 'undefined') return ctx.view('unauthorized');

  await next();
}
