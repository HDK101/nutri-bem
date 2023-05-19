import { Op } from "sequelize";
import Menu from "../models/Menu";
import Food from "../models/Food";
import MenuFood from "../models/MenuFood";
import MenuPatient from "../models/MenuPatient";
import Patient from "../models/Patient";

const MenuPatientController = {
  async index(ctx) {
    const menuId = +ctx.params.menuId;

    const menu = await Menu.findByPk(menuId);

    const patients = await Patient.findAll();

    return ctx.view('resources/menus/patient', {
      patients,
      menu,
    });
  },

  async store(ctx) {
    const menuId = +ctx.params.menuId;
    const patientId = +ctx.params.patientId;

    await MenuPatient.create({
      menu_id: menuId,
      patient_id: patientId,
    });

    ctx.redirect(`/menus`);
  },

  async destroy(ctx) {
    const menuId = +ctx.params.menuId;
    const patientId = +ctx.params.patientId;

    await MenuPatient.destroy({
        where: {
            menu_id: menuId,
            patient_id: patientId,
        }
    })

    ctx.redirect(`/menus`);
  },
};

export default MenuPatientController;
