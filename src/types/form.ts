type PhoneValue = {
  phone: string;
};

type EmailValue = {
  email: string;
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

export type {
  EmailValue,
  PhoneValue,
  SignInFormValues,
  RecoveryFormValues,
  SignInWithEmailFormValues,
  SignInWithPhoneFormValues,
  RecoveryConfirmationFormValues,
};
