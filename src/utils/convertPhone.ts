export const convertPhone = (phone: number) =>
  String(phone)
    .replace(/\D+/g, '')
    .replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3-$4-$5');
