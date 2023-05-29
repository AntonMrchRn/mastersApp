export const validateEmail = (email: string) => {
  const validate =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (validate.test(String(email).toLowerCase())) {
    return true;
  } else {
    return false;
  }
};
