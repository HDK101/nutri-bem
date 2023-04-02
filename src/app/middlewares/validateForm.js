export default function validateForm(schema, type = 'body') {
  return async (ctx, next) => {
    try {
      await schema.validate(type === 'query' ? ctx.request.query : ctx.request.body, {
        abortEarly: false,
      });
      await next();
    } catch (err) {
      console.log(err);
      ctx.session.formErrors = err.inner.map(error => ({
        message: error.message,
        path: error.path,
      }));
      ctx.redirect('/');
    }
  };
}
