import { UniqueConstraintError, ValidationError as SequelizeValidationError } from "sequelize";
import { ValidationError as YupValidationError } from "yup";

export function rawValidateForm(schema, options = {}) {
  const {
    redirectTo,
  } = options;

  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body, {
        abortEarly: false,
      });
      await next();
    } catch (err) {
      const errorsMap = {};

      console.log(err);

      if (err instanceof YupValidationError) {
        err.inner.forEach((error) => {
          errorsMap[error.path] = error.message;
        });

        ctx.session.formErrors = errorsMap;
        ctx.redirect(redirectTo);
      } else if (err instanceof UniqueConstraintError) {
        err.errors.forEach((error) => {
          errorsMap[error.path] = "Já está sendo utilizado";
        });
        ctx.session.formErrors = errorsMap;
        ctx.redirect(redirectTo);
      } else if (err instanceof SequelizeValidationError) {
        err.errors.forEach((error) => {
          errorsMap[error.path] = error.message;
        });

        ctx.session.formErrors = errorsMap;
        ctx.redirect(redirectTo);
      } else {
        await next();
      }
    }
  };
}

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
      const errorsMap = {};

      console.log(err);

      if (err instanceof YupValidationError) {
        err.inner.forEach((error) => {
          errorsMap[error.path] = error.message;
        });

        ctx.session.formErrors = errorsMap;
        if (redirectType === 'edit') ctx.redirect(`/${resource}/${ctx.params.id}/edit`);
        else if (redirectType === 'create') ctx.redirect(`/${resource}/create`);
      } else if (err instanceof UniqueConstraintError) {
        err.errors.forEach((error) => {
          errorsMap[error.path] = "Já está sendo utilizado";
        });
        ctx.session.formErrors = errorsMap;
        if (redirectType === 'edit') ctx.redirect(`/${resource}/${ctx.params.id}/edit`);
        else if (redirectType === 'create') ctx.redirect(`/${resource}/create`);
      } else if (err instanceof SequelizeValidationError) {
        err.errors.forEach((error) => {
          errorsMap[error.path] = error.message;
        });

        ctx.session.formErrors = errorsMap;
        if (redirectType === 'edit') ctx.redirect(`/${resource}/${ctx.params.id}/edit`);
        else if (redirectType === 'create') ctx.redirect(`/${resource}/create`);
      } else {
        await next();
      }
    }
  };
}
