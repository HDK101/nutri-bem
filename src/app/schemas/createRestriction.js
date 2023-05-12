import * as yup from 'yup';

const createRestriction = yup.object({
  name: yup.string().required('Campo de nome está vazio'),
});

export default createRestriction;
