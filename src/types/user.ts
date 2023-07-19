enum UserEntityType {
  self = 'Самозанятый',
  company = 'Юридическое лицо',
  individual = 'Индивидуальный предприниматель',
}

enum UserRole {
  internalExecutor = 'Внутренний исполнитель',
  externalExecutor = 'Внешний исполнитель',
  supervisor = 'Руководитель',
  aggregator = 'Агрегатор',
  coordinator = 'Координатор',
  client = 'Заказчик',
}

export { UserEntityType, UserRole };
