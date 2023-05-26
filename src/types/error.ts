enum ErrorCode {
  Server = 20001,
  IncorrectPassword = 20002,
  IncorrectEmail = 20003,
  IncorrectPhone = 20004,
  IncorrectVerificationCode = 20005,
}

type Error = {
  code: number;
  message: string;
};

export { ErrorCode };
export type { Error };
