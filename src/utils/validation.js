import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,10}$/,
  //   "Password must contain at least one uppercase and one lowercase letter"
  // ),
});

export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("Name is required")
    .min(3, "Name minlength 3")
    .max(20, "Name max length"),
  lastName: Yup.string()
    .required("Name is required")
    .min(3, "Name minlength 3")
    .max(20, "Name max length"),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,10}$/,
  //   "Password must contain at least one uppercase and one lowercase letter"
  // ),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^01[0125][0-9]{8}$/,
      "Please enter a valid Egyptian mobile phone number"
    ),
  rePassword: Yup.string()
    .required("rePassword is required")
    .oneOf([Yup.ref("password")], "Password dose not  match !!"),
});
export const validationSchemaUserData = Yup.object({
  firstName: Yup.string()
    .min(3, "fname minlength 3")
    .max(10, "fname max length"),
  lastName: Yup.string()

    .min(3, "lname minlength 3")
    .max(10, "lname max length"),
  email: Yup.string().email(),

  phone: Yup.string().matches(
    /^01[0125][0-9]{8}$/,
    "Please enter a valid Egyptian mobile phone number"
  ),
  image: Yup.mixed().test(
    "fileType",
    "Image must be a valid image file",
    (value) => {
      if (!value) return true;

      const acceptedFormats = ["image/jpeg", "image/png", "image/gif"];
      return acceptedFormats.includes(value.type);
    }
  ),
});
export const validationSchemaPassword = Yup.object({
  oldPassword: Yup.string().required("old Password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,10}$/,
  //   "Password must contain at least one uppercase and one lowercase letter"
  //   )
  newPassword: Yup.string().required("New Password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,10}$/,
  //   "Password must contain at least one uppercase and one lowercase letter"
  //   )
  rePassword: Yup.string()
    .required("Confirming Password is required")
    .oneOf([Yup.ref("newPassword")], "password dose not  match"),
});
