export default async function authorize(ctx, next) {
  const { id } = ctx.session;

  if (typeof id === 'undefined') return ctx.view('unauthorized', {
    hideHeader: true,
  });

  await next();
}
