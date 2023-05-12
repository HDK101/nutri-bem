import * as yup from 'yup'

const createUser = yup.object({
  name: yup.string().trim().min(4, 'Mínimo de quatro caracteres').required('Campo de nome está vazio'),
  login: yup.string().trim().email("Login deve estar no formato de email").required('Campo de login está vazio'),
  password: yup.string().trim().required('Campo de senha está vazio'),
});
export default createUser;