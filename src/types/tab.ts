enum AuthTab {
  Phone = 'Телефон',
  Email = 'Email',
}

const authTabByIndex: { [index: number]: AuthTab } = {
  0: AuthTab.Phone,
  1: AuthTab.Email,
};

enum ProfileTab {
  Common = 'Общее',
  Payment = 'Оплата',
  Activity = 'Деятельность',
  Account = 'Аккаунт',
}

export { AuthTab, authTabByIndex, ProfileTab };
