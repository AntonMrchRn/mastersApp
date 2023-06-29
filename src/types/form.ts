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

export type {
  CodeValue,
  EmailValue,
  PhoneValue,
  SignInFormValues,
  RecoveryFormValues,
  BankDetailsFormValues,
  PersonalDataFormValues,
  SignInWithEmailFormValues,
  SignInWithPhoneFormValues,
  RecoveryConfirmationFormValues,
};
