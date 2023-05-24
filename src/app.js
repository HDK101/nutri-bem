/* eslint-disable linebreak-style */
import Koa from 'koa';
import session from 'koa-session';
import koaBody from 'koa-body';
import koaEjs from '@koa/ejs';

import dotenv from 'dotenv';

import { join } from 'node:path';

import serve from 'koa-static';
import mount from 'koa-mount';
import { sync, association } from './database';
import routes from './routes';

async function start() {
  dotenv.config();

  await association();
  await sync();

  const app = new Koa();
  koaEjs(app, {
    root: join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: false,
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
        ctx,
      });
      await next();
    })
    .use(koaBody())
    .use(session({
      sameSite: 'strict',
    }, app))
    .use(mount('/public', serve('./public')))
    .use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        console.log(err);
        return ctx.view('internalError');
      }
    })
    .use(routes)
    .use((ctx) => ctx.view('404'));

  app.listen(3000);
}

start();
