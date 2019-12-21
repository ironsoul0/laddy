import * as yup from "yup";

export const emailNotLongEnough = "Email must be at least 3 characters";
export const passwordNotLongEnough = "Password must be at least 3 characters";
export const invalidEmail = "Invalid email was provided";

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation,
  handle: yup.string().required()
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidEmail)
    .max(255, invalidEmail)
    .email(invalidEmail)
    .required(),
  password: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255)
    .required()
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation
});
