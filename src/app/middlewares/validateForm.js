export default function validateForm(schema, options = {}) {
  const {
    type,
    resource,
    redirectType,
  } = options;

  return async (ctx, next) => {
    try {
      await schema.validate(type === 'query' ? ctx.request.query : ctx.request.body, {
        abortEarly: false,
      });
      await next();
    } catch (err) {
      console.log(err);
      const errorsMap = {};

      err.inner.forEach(error => {
        errorsMap[error.path] = error.message;
      })

      ctx.session.formErrors = errorsMap;
      if (redirectType === 'edit') ctx.redirect(`${resource}/edit/${ctx.params.id}`);
      else if (redirectType === 'create') ctx.redirect(`${resource}/create`);
    }
  };
}
