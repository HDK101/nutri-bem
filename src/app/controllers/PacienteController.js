import Paciente from '../models/Paciente';
import PacienteService from '../services/User/PacienteService';
import CRUDController from '../../crud/CRUDController';

const PacienteController = CRUDController(Paciente, {
  resource: 'pacientes'
});

export default PacienteController;
