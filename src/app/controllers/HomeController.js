class HomeController {
  static async index(ctx) {
    ctx.session.name = 'Max';
    return ctx.view('home');
  }
}

export default HomeController;
