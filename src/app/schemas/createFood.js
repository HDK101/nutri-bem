import * as yup from 'yup';

const createFood = yup.object({
  name: yup.string().required('Campo de nome está vazio'),
});

export default createFood;
