import * as yup from 'yup';

const createPatient = yup.object({
  name: yup.string().required('Campo de nome está vazio'),
  document: yup.string().required('Campo de nome está vazio').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Não está no formato de CPF'),
  height: yup.number().integer().positive().typeError('Campo de altura deve ser um número').required('Campo de altura está vazio'),
  weight: yup.number().integer().positive().typeError('Campo de peso deve ser um número').required('Campo de peso está vazio'),
  birthdate: yup.string().required('Campo de data de nascimento está vazio'),
  sex: yup.string('Campo de sexo deve ser uma string').oneOf(['M', 'F'], 'Valor deve ser Feminino(F) ou Masculino(M)').required('Campo de sexo está vazio'),
  historic: yup.string('Campo de histórico deve ser uma string'),
});

export default createPatient;
