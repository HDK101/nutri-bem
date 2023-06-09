import { Op } from 'sequelize';
import Patient from '../models/Patient';
import PatientMenus from '../models/PatientMenus';
import Menu from '../models/Menu';

const PatientMenusController = {
  async index(ctx) {
    const patientId = +ctx.params.patientId;
    const patient = await Patient.findByPk(patientId, {
      include: Menu,
    });

    return ctx.view('resources/patients/associate_menus', {
      patient,
      menus: patient.Menus,
    });
  },

  async store(ctx) {
    const patientId = +ctx.params.patientId;
    const menuId = +ctx.params.menuId;

    await PatientMenus.create({
      patient_id: patientId,
      menu_id: menuId,
    });

    ctx.redirect(`/patients/${patientId}/menus`);
  },

  async destroy(ctx) {
    const patientId = +ctx.params.patientId;
    const menuId = +ctx.params.menuId;

    await PatientMenus.destroy({
      where: {
        patient_id: patientId,
        menu_id: menuId,
      },
    });

    ctx.redirect(`/patients/${patientId}/menus`);
  },
};

export default PatientMenusController;
