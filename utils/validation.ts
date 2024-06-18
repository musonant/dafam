import * as Yup from "yup";

export const yupSchemas = {
  name: Yup.string()
    .trim()
    .min(2, `This name is too short`)
    .max(50, "This name is too long")
    .required("Please enter a name"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("A valid email is required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .matches(/(?=.*[!@#$&*])/, "Password should contain a special character")
    .required("A valid password is required"),
};
