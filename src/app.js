import Koa from 'koa';
import session from 'koa-session';
import koaBody from 'koa-body';
import koaEjs from '@koa/ejs';

import dotenv from 'dotenv';

import { join } from 'node:path';

import sync from './database/sync';
import routes from './routes';

async function start() {
  dotenv.config();

  await sync();

  const app = new Koa();

  koaEjs(app, {
    root: join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true,
  });

  app.keys = ['secret'];

  app
    .use(async (ctx, next) => {
      ctx.formErrors = ctx.session.formErrors;
      ctx.session.formErrors = {};
      await next();
    })
    .use(async (ctx, next) => {
      ctx.view = async (template, data) => ctx.render(template, {
        data,
        session: ctx.session,
        formErrors: ctx.formErrors,
      });
      await next();
    })
    .use(async (err, ctx, next) => {
      ctx.view('internalError');
    })
    .use(koaBody())
    .use(session({
      sameSite: 'strict',
    }, app))
    .use(routes)
    .use((ctx) => ctx.view('404'));

  app.listen(3000);
}

start();
