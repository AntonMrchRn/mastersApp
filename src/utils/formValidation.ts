import * as Yup from 'yup';

const emailErrorMessage =
  'Укажите адрес электронной почты в формате example@gmail.com';
const emailRegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const authPhoneValidation = {
  phone: Yup.string().length(10, '').required(''),
};
const cancelTaskValidation = {
  cancelTask: Yup.string().required(''),
};
const phoneValidation = {
  phone: Yup.string()
    .length(10, 'Введите корректный номер телефона')
    .required('Введите корректный номер телефона'),
};
const emailValidation = {
  email: Yup.string()
    .matches(emailRegExp, { message: emailErrorMessage })
    .required(''),
};
const passwordValidation = {
  password: Yup.string().min(6, '').required(''),
};
const codeValidation = {
  code: Yup.string().min(6, '').required(''),
};
const signInWithPhoneValidation = {
  ...authPhoneValidation,
  ...passwordValidation,
  isAgreeWithTerms: Yup.boolean().isTrue(),
};
const signInWithEmailValidation = {
  ...emailValidation,
  ...passwordValidation,
  isAgreeWithTerms: Yup.boolean().isTrue(),
};
const recoveryConfirmationValidation = {
  ...codeValidation,
  ...passwordValidation,
};
const personalDataValidation = {
  name: Yup.string().required('Укажите имя'),
  sname: Yup.string().required('Укажите фамилию'),
  pname: Yup.string().required('Укажите отчество'),
};

const cancelTaskValidationSchema = Yup.object().shape(cancelTaskValidation);
const phoneValidationSchema = Yup.object().shape(phoneValidation);
const authPhoneValidationSchema = Yup.object().shape(authPhoneValidation);
const emailValidationSchema = Yup.object().shape(emailValidation);
const codeValidationSchema = Yup.object().shape(codeValidation);
const signInWithPhoneValidationSchema = Yup.object().shape(
  signInWithPhoneValidation
);
const signInWithEmailValidationSchema = Yup.object().shape(
  signInWithEmailValidation
);
const recoveryConfirmationValidationSchema = Yup.object().shape(
  recoveryConfirmationValidation
);
const personalDataValidationSchema = Yup.object().shape(personalDataValidation);

export {
  emailErrorMessage,
  codeValidationSchema,
  emailValidationSchema,
  phoneValidationSchema,
  authPhoneValidationSchema,
  cancelTaskValidationSchema,
  personalDataValidationSchema,
  signInWithPhoneValidationSchema,
  signInWithEmailValidationSchema,
  recoveryConfirmationValidationSchema,
};
