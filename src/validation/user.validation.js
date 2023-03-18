import * as yup from "yup";

export const userValidation = yup.object({
  name: yup.string().required(),
  phone: yup.string().min(11).optional(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});
