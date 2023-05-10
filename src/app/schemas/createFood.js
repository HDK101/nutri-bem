import * as yup from 'yup'

const createFood = yup.object({
  name: yup.string().required('Campo de nome está vazio'),
  amount: yup.number().integer().positive().typeError('Campo de quantidade deve ser um número').required('Campo de quantidade está vazio'),
});

export default createFood;
