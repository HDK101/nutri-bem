import Patient from '../models/Patient';
import CRUDController from '../../crud/CRUDController';

const PatientController = CRUDController(Patient, {
  resource: 'patients',
  order: 'name',
  orderType: 'ASC',
});

export default PatientController;
