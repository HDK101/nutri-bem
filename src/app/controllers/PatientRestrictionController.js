import {Op} from "sequelize";
import Patient from "../models/Patient";
import PatientRestriction from "../models/PatientRestriction";
import Restriction from "../models/Restriction";

const PatientRestrictionController = {
  async index(ctx) {
    const patientId = +ctx.params.patientId;
    const patient = await Patient.findByPk(patientId, {
      include: Restriction,
    });

    const restrictionIds = patient.Restrictions.map(r => r.id);
    
    const restrictions = await Restriction.findAll({
      where: {
        id: {
          [Op.notIn]: restrictionIds,
        },
      },
    });

    return ctx.view('resources/patients/associate', {
      patient,
      restrictions,
      currentRestrictions: patient.Restrictions,
    });
  },

  async store(ctx) {
    const patientId = +ctx.params.patientId;
    const restrictionId = +ctx.params.restrictionId;

    ctx.body = await PatientRestriction.create({
      patient_id: patientId,
      restriction_id: restrictionId,
    });

    ctx.redirect(`/patients/${patientId}/restrictions`);
  },
};

export default PatientRestrictionController;
