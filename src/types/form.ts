type PhoneValue = {
  phone: string;
};

type EmailValue = {
  email: string;
};

type CodeValue = {
  code: string;
};

type SignInWithPhoneFormValues = {
  email?: string;
  password: string;
  isAgreeWithTerms: boolean;
} & PhoneValue;

type SignInWithEmailFormValues = {
  phone?: string;
  password: string;
  isAgreeWithTerms: boolean;
} & EmailValue;

type RecoveryPhoneFormValues = { email?: string } & PhoneValue;
type RecoveryEmailFormValues = { phone?: string } & EmailValue;

type SignInFormValues = SignInWithPhoneFormValues | SignInWithEmailFormValues;
type RecoveryFormValues = RecoveryPhoneFormValues | RecoveryEmailFormValues;

type RecoveryConfirmationFormValues = {
  code: string;
  password: string;
};

type PersonalDataFormValues = {
  name: string;
  sname: string;
  pname: string;
};

type BankDetailsFormValues = {
  bankID: string;
  bankName: string;
  checkingAccount: string;
  correspondingAccount: string;
};

type SelfEntityFormValues = {
  ITIN: string;
  RRC?: string;
  entityName?: string;
  isNDSPayer?: boolean;
};

type IndividualEntityFormValues = {
  ITIN: string;
  entityName: string;
  isNDSPayer: boolean;
  RRC?: string;
};

type CompanyEntityFormValues = {
  ITIN: string;
  entityName: string;
  isNDSPayer: boolean;
  RRC: string;
};

type EntityNameFormValues = {
  entityName: string;
  ITIN?: string;
  isNDSPayer?: boolean;
  RRC?: string;
};

type EntityTypeFormValues =
  | IndividualEntityFormValues
  | CompanyEntityFormValues
  | SelfEntityFormValues
  | EntityNameFormValues;

type SpecialityFormValue = { speciality: string };

export type {
  CodeValue,
  EmailValue,
  PhoneValue,
  SignInFormValues,
  RecoveryFormValues,
  SpecialityFormValue,
  EntityTypeFormValues,
  BankDetailsFormValues,
  PersonalDataFormValues,
  SignInWithEmailFormValues,
  SignInWithPhoneFormValues,
  RecoveryConfirmationFormValues,
};
