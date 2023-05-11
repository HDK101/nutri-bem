import * as yup from 'yup'

const createMenu = yup.object({
  name: yup.string().required('Campo de nome está vazio'),
  time: yup.string().trim().matches("/\d+:\d+/").typeError("Tempo deve estar no formato HH:MM").required('Campo de tempo está vazio'),
});

export default createMenu;