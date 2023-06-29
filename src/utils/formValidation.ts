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
const estimateCountValidation = {
  estimateCount: Yup.string().required('Укажите количество услуги / материала'),
};
const estimateAddMaterialValidation = {
  name: Yup.string().required('Укажите название материала'),
  count: Yup.string().required('Укажите количество материала'),
  price: Yup.string().required('Укажите цену за одну единицу измерения'),
  measure: Yup.string().required('Выберите единицу измерения'),
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
const bankDetailsValidation = {
  bankID: Yup.string()
    .length(9, 'Укажите 9-значный номер БИК банка в цифровом формате')
    .required('Укажите 9-значный номер БИК банка в цифровом формате'),
  bankName: Yup.string().required('Укажите полное наименование банка'),
  checkingAccount: Yup.string()
    .length(20, 'Укажите 20-значный номер счета в цифровом формате')
    .required('Укажите 20-значный номер счета в цифровом формате'),
  correspondingAccount: Yup.string()
    .length(20, 'Укажите 20-значный номер счета в цифровом формате')
    .required('Укажите 20-значный номер счета в цифровом формате'),
};

const cancelTaskValidationSchema = Yup.object().shape(cancelTaskValidation);
const estimateCountValidationSchema = Yup.object().shape(
  estimateCountValidation
);
const estimateAddMaterialValidationSchema = Yup.object().shape(
  estimateAddMaterialValidation
);
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
const bankDetailsValidationSchema = Yup.object().shape(bankDetailsValidation);

export {
  emailErrorMessage,
  codeValidationSchema,
  emailValidationSchema,
  phoneValidationSchema,
  authPhoneValidationSchema,
  cancelTaskValidationSchema,
  bankDetailsValidationSchema,
  personalDataValidationSchema,
  signInWithPhoneValidationSchema,
  signInWithEmailValidationSchema,
  recoveryConfirmationValidationSchema,
  estimateCountValidationSchema,
  estimateAddMaterialValidationSchema,
};
