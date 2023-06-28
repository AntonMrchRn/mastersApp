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
  password: string;
  isAgreeWithTerms: boolean;
} & PhoneValue;

type SignInWithEmailFormValues = {
  password: string;
  isAgreeWithTerms: boolean;
} & EmailValue;

type SignInFormValues = SignInWithPhoneFormValues | SignInWithEmailFormValues;
type RecoveryFormValues = PhoneValue | EmailValue;

type RecoveryConfirmationFormValues = {
  code: string;
  password: string;
};

type PersonalDataValues = {
  name: string;
  sname: string;
  pname: string;
};

export type {
  CodeValue,
  EmailValue,
  PhoneValue,
  SignInFormValues,
  RecoveryFormValues,
  PersonalDataValues,
  SignInWithEmailFormValues,
  SignInWithPhoneFormValues,
  RecoveryConfirmationFormValues,
};
