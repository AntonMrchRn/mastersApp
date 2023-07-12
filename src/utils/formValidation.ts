import * as Yup from 'yup';

const emailErrorMessage =
  'Укажите адрес электронной почты в формате example@gmail.com';

const emailRegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const correspondingAccountRegExp = /^(301[0-9]*)$/i;
const checkingAccountRegExp = /^((405|406|407)[0-9]*)$/i;

const authPhoneValidation = {
  phone: Yup.string().length(10, '').required(''),
};
const cancelTaskValidation = {
  cancelTask: Yup.string().required(''),
};
const estimateCountValidation = {
  estimateCount: Yup.string()
    .notOneOf(['0'], 'Количество должно быть больше 0')
    .required('Укажите количество услуги / материала'),
};
const estimateAddMaterialValidation = {
  name: Yup.string().required('Укажите название материала'),
  count: Yup.string()
    .notOneOf(['0'], 'Количество должно быть больше 0')
    .required('Укажите количество материала'),
  price: Yup.string().required('Укажите цену за одну единицу измерения'),
  measure: Yup.string().required('Выберите единицу измерения'),
};
const estimateAddServiceValidation = {
  count: Yup.string()
    .notOneOf(['0'], 'Количество должно быть больше 0')
    .required('Укажите количество услуги'),
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
  email: Yup.string().default(undefined),
  ...authPhoneValidation,
  ...passwordValidation,
  isAgreeWithTerms: Yup.boolean().required().default(false).oneOf([true]),
};
const signInWithEmailValidation = {
  phone: Yup.string().default(undefined),
  ...emailValidation,
  ...passwordValidation,
  isAgreeWithTerms: Yup.boolean().required().default(false).oneOf([true]),
};
const recoveryPhoneValidation = {
  email: Yup.string().default(undefined),
  ...authPhoneValidation,
};
const recoveryEmailValidation = {
  phone: Yup.string().default(undefined),
  ...emailValidation,
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
    .required('Укажите 9-значный номер БИК банка в цифровом формате')
    .length(9, 'Укажите 9-значный номер БИК банка в цифровом формате'),
  bankName: Yup.string().required('Укажите полное наименование банка'),
  checkingAccount: Yup.string()
    .required('Укажите 20-значный номер счета в цифровом формате')
    .matches(checkingAccountRegExp, {
      message:
        'Расчетный счет должен начинаться с 405 или 406 или 407 и быть длиной в 20 цифр',
    })
    .length(20, 'Укажите 20-значный номер счета в цифровом формате'),
  correspondingAccount: Yup.string()
    .required('Укажите 20-значный номер счета в цифровом формате')
    .matches(correspondingAccountRegExp, {
      message: 'Корр. счет должен начинаться с 301 и быть длиной в 20 цифр',
    })
    .length(20, 'Укажите 20-значный номер счета в цифровом формате'),
};
const itinValidation = {
  ITIN: Yup.string()
    .required('Укажите 12-значный номер ИНН в цифровом формате')
    .length(12, 'Укажите 12-значный номер ИНН в цифровом формате'),
};
const entityNameValidation = {
  entityName: Yup.string()
    .required('Наименование должно содержать не менее 4 символов')
    .min(4, 'Наименование должно содержать не менее 4 символов'),
};
const rrcValidation = {
  RRC: Yup.string()
    .required('Укажите 9-значный номер КПП в цифровом формате')
    .length(9, 'Укажите 9-значный номер КПП в цифровом формате'),
};

const cancelTaskValidationSchema = Yup.object().shape(cancelTaskValidation);
const estimateCountValidationSchema = Yup.object().shape(
  estimateCountValidation
);
const estimateAddMaterialValidationSchema = Yup.object().shape(
  estimateAddMaterialValidation
);
const estimateAddServiceValidationSchema = Yup.object().shape(
  estimateAddServiceValidation
);

const phoneValidationSchema = Yup.object().shape(phoneValidation);
const emailValidationSchema = Yup.object().shape(emailValidation);
const codeValidationSchema = Yup.object().shape(codeValidation);
const signInWithPhoneValidationSchema = Yup.object().shape(
  signInWithPhoneValidation
);
const signInWithEmailValidationSchema = Yup.object().shape(
  signInWithEmailValidation
);
const recoveryPhoneValidationSchema = Yup.object().shape(
  recoveryPhoneValidation
);
const recoveryEmailValidationSchema = Yup.object().shape(
  recoveryEmailValidation
);
const recoveryConfirmationValidationSchema = Yup.object().shape(
  recoveryConfirmationValidation
);

const personalDataValidationSchema = Yup.object().shape(personalDataValidation);
const bankDetailsValidationSchema = Yup.object().shape(bankDetailsValidation);
const selfEmployedEntityValidationSchema = Yup.object().shape(itinValidation);
const individualEntityValidationSchema = Yup.object().shape({
  ...itinValidation,
  ...entityNameValidation,
});
const companyEntityValidationSchema = Yup.object().shape({
  ...itinValidation,
  ...entityNameValidation,
  ...rrcValidation,
});

export {
  emailErrorMessage,
  codeValidationSchema,
  emailValidationSchema,
  phoneValidationSchema,
  cancelTaskValidationSchema,
  bankDetailsValidationSchema,
  personalDataValidationSchema,
  recoveryPhoneValidationSchema,
  recoveryEmailValidationSchema,
  signInWithPhoneValidationSchema,
  signInWithEmailValidationSchema,
  recoveryConfirmationValidationSchema,
  estimateCountValidationSchema,
  estimateAddMaterialValidationSchema,
  estimateAddServiceValidationSchema,
  selfEmployedEntityValidationSchema,
  individualEntityValidationSchema,
  companyEntityValidationSchema,
};
