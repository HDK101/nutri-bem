import User from '../models/User';

class HomeController {
  static async index(ctx) {
    if (ctx.session.id) {
      return ctx.redirect('/home');
    }

    return ctx.redirect('/login');
  }

  static async home(ctx) {
    return ctx.redirect('/patients');
  }

  static async login(ctx) {
    if (ctx.session.id) {
      return ctx.redirect('/home');
    }

    return ctx.view('login', {
      hideHeader: true,
    });
  }

  static async session(ctx) {
    const user = await User.findOne({
      where: {
        login: ctx.request.body.login,
        password: ctx.request.body.password,
      },
    });

    if (user !== null) {
      ctx.session = {
        id: user.id,
      };
      ctx.redirect('/home');
    } else {
      ctx.redirect('/login');
    }
  }

  static async logout(ctx) {
    if (ctx.session) {
      ctx.session = null;
      ctx.redirect('/');
    }
  }
}

export default HomeController;
