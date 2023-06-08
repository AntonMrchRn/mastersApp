enum AuthTab {
  Phone = 'Телефон',
  Email = 'Email',
}

const authTabByIndex: { [index: number]: AuthTab } = {
  0: AuthTab.Phone,
  1: AuthTab.Email,
};

export { AuthTab, authTabByIndex };
