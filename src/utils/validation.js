import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Nombre es requerido'),
  lastname: yup.string().required('Apellido es requerido'), 
  phone: yup.string()
    .required('Teléfono es requerido')
    .matches(/^[0-9]+$/, 'Teléfono solo debe contener números')
    .min(10, 'Teléfono debe tener al menos 10 dígitos'), 
  age: yup.number().required('Edad es requerida'), 
  email: yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
  size: yup.number().min(0.01).required('Talla es requerida'), 
  weight: yup.number().min(0.01).required('Peso es requerido'), 
});

export default schema;