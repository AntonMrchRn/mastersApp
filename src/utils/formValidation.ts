import * as Yup from 'yup';

const emailErrorMessage =
  'Укажите адрес электронной почты в формате example@gmail.com';
const emailRegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const phoneValidation = {
  phone: Yup.string().length(10, '').required(''),
};

const cancelTaskValidation = {
  cancelTask: Yup.string().required(''),
};
const emailValidation = {
  email: Yup.string()
    .matches(emailRegExp, { message: emailErrorMessage })
    .required(''),
};
const passwordValidation = {
  password: Yup.string().min(6, '').required(''),
};
const signInWithPhoneValidation = {
  ...phoneValidation,
  ...passwordValidation,
  isAgreeWithTerms: Yup.boolean().isTrue(),
};
const signInWithEmailValidation = {
  ...emailValidation,
  ...passwordValidation,
};
const recoveryConfirmationValidation = {
  code: Yup.string().min(6, '').required(''),
  ...passwordValidation,
};

const cancelTaskValidationSchema = Yup.object().shape(cancelTaskValidation);
const phoneValidationSchema = Yup.object().shape(phoneValidation);
const emailValidationSchema = Yup.object().shape(emailValidation);
const signInWithPhoneValidationSchema = Yup.object().shape(
  signInWithPhoneValidation
);
const signInWithEmailValidationSchema = Yup.object().shape(
  signInWithEmailValidation
);
const recoveryConfirmationValidationSchema = Yup.object().shape(
  recoveryConfirmationValidation
);

export {
  emailErrorMessage,
  phoneValidationSchema,
  emailValidationSchema,
  signInWithPhoneValidationSchema,
  signInWithEmailValidationSchema,
  recoveryConfirmationValidationSchema,
  cancelTaskValidationSchema,
};
