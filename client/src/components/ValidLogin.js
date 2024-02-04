import * as yup from "yup";

export default async function ValidLogin(input) {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(5, { name: "Please provide a valid name" })
      .required({ name: "Name is required" }),
    password: yup
      .string()
      .min(5, { password: "Password is too short" })
      .required({ password: "Password is required" }),
  });

  return new Promise((resolve, reject) => {
    validationSchema
      .validate(input, { abortEarly: false })
      .then((data) => {
        resolve(data);
      })
      .catch((validationError) => {
        validationError.errors = validationError.errors.filter(
          (error) =>
            !(
              (error.password === "Password is too short" &&
                validationError.errors.some(
                  (e) => e.password === "Password is required",
                )) ||
              (error.name === "Please provide a valid name" &&
                validationError.errors.some(
                  (e) => e.name === "Name is required",
                ))
            ),
        );

        reject(validationError.errors);
      });
  });
}
