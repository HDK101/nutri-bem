import Patient from '../models/Patient';
import CRUDController from '../../crud/CRUDController';

const PatientController = CRUDController(Patient, {
  resource: 'patients',
});

export default PatientController;
