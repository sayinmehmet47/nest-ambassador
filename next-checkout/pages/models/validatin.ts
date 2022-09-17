import * as yup from 'yup';

export const schema = yup
  .object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    country: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required(),
    code: yup.string().required(),
  })
  .required();
