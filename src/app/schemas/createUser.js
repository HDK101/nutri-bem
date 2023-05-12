import * as yup from 'yup'

const createUser = yup.object({
  name: yup.string().trim().required('Campo de nome está vazio').min(4, 'Mínimo de quatro caracteres'),
  login: yup.string().trim().required('Campo de login está vazio').email("Login deve estar no formato de email"),
  password: yup.string().trim().required('Campo de senha está vazio'),
});
export default createUser;