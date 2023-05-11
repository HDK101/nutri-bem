import User from "../models/User";

class HomeController {
  static async index(ctx) {
    return ctx.view('home');
  }

  static async login(ctx) {
    return ctx.view('login');
  }

  static async session(ctx) {
    const user = await User.findOne({
      where: {
        login: ctx.request.body.login,
        password: ctx.request.body.password
      }
    });

    if (user !== null) {
      ctx.session = {
        login: ctx.request.body.login,
        password: ctx.request.body.password
      }
      ctx.redirect('/home')
    } else {
      ctx.redirect('/');
    }
  }
}

export default HomeController;
