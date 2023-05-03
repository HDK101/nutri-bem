class LoginController {
    static async index(ctx) {
        return ctx.view('login');
    }
}

export default LoginController;