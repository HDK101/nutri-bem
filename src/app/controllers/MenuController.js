import Menu from '../models/Menu';
import CRUDController from '../../crud/CRUDController';
import Patient from '../models/Patient';

const defaultMenuController = CRUDController(Menu, {
  resource: 'menus',
  include: 'patient',
  order: 'name',
  orderType: 'ASC',
});

const MenuController = {
  ...defaultMenuController,
  async patients(ctx) {
    const patients = await Patient.findAll();

    return ctx.view('resources/menus/createSelectPatient', {
      patients,
    });
  },
  async store(ctx) {
    const { patient } = ctx.request.body;
    const patientInstance = await Patient.findByPk(patient);
    const menu = await Menu.create(ctx.request.body);

    await menu.addPatient(patientInstance);

    ctx.redirect(`menus`);
  },
}

export default MenuController;
