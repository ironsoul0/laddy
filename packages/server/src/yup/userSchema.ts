import * as yup from "yup";

export const emailNotLongEnough = "Email must be at least 3 characters";
export const passwordNotLongEnough = "Password must be at least 3 characters";
export const invalidEmail = "Invalid email was provided";

export const passwordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const emailValidation = yup
  .string()
  .min(3, emailNotLongEnough)
  .max(255)
  .email(invalidEmail)
  .required();

export const handleValidation = yup
  .string()
  .min(1)
  .required();

export const registerSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  handle: handleValidation
});

export const loginSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation
});
