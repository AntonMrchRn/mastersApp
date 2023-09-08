enum TaskType {
  /**
   * IT- ЛОТЫ
   */
  IT_AUCTION_SALE = 1,
  /**
   * IT- Первый отклик
   */
  IT_FIRST_RESPONSE = 2,
  /**
   * IT- Внутренние исполнители
   */
  IT_INTERNAL_EXECUTIVES = 3,
  /**
   * Общие- ЛОТЫ
   */
  COMMON_AUCTION_SALE = 4,
  /**
   * Общие- Первый отклик
   */
  COMMON_FIRST_RESPONSE = 5,
}

enum StatusType {
  /**
   * Подготовка
   */
  PENDING = 1,
  /**
   * Опубликовано
   */
  ACTIVE = 2,
  /**
   * Согласование смет
   */
  MATCHING = 3,
  /**
   * Выполнение / Подписание документов (не используется!!!)
   */
  SIGNING = 4,
  /**
   * Сдача работ
   */
  SUMMARIZING = 5,
  /**
   * Выполнено
   */
  COMPLETED = 6,
  /**
   * Отменено исполнителем
   */
  CANCELLED_BY_EXECUTOR = 7,
  /**
   * Отменено заказчиком
   */
  CANCELLED_BY_CUSTOMER = 8,
  /**
   * Оплачено
   */
  PAID = 9,
  /**
   * Возвращено на доработку
   */
  RETURNED = 10,
  /**
   * В работе
   */
  WORK = 11,
  /**
   * Закрыто
   */
  CLOSED = 12,
}
enum OutlayStatusType {
  /**
   * Подготовка (смета не согласована)
   */
  PENDING = 1,
  /**
   * Согласование
   */
  MATCHING = 2,
  /**
   * Согласовано
   */
  READY = 3,
  /**
   * Отказано
   */
  CANCELLED = 4,
  /**
   * Возвращено на доработку
   */
  RETURNED = 5,
  /**
   * В процессе оплаты
   */
  IN_PAYMENT = 6,
  /**
   * Оплачена
   */
  PAID = 7,
}
enum TaskTab {
  /**
   * Описание
   */
  DESCRIPTION = 'Описание',
  /**
   * Смета
   */
  ESTIMATE = 'Смета',
  /**
   * Комментарии
   */
  COMMENTS = 'Комментарии',
  /**
   * Отчет
   */
  REPORT = 'Отчет',
  /**
   * История
   */
  HISTORY = 'История',
}
enum RoleType {
  /**
   * Внутренний исполнитель
   */
  INTERNAL_EXECUTOR = 1,
  /**
   * Внешний исполнитель
   */
  EXTERNAL_EXECUTOR = 2,
  /**
   * Руководитель
   */
  SUPERVISOR = 3,
  /**
   * Агрегатор
   */
  AGGREGATOR = 4,
  /**
   * Координатор
   */
  COORDINATOR = 5,
  /**
   * Заказчик
   */
  CLIENT = 6,
}

enum EstimateTab {
  TASK_ESTIMATE = 'Смета задачи',
  MY_SUGGESTION = 'Мое предложение',
}

enum ContractorStatus {
  /**
   * Подрядчик недоступен для приглашения куратором
   */
  NOT_AVAILABLE = 1,
  /**
   * Подрядчик доступен для приглашения куратором
   */
  AVAILABLE = 2,
  /**
   * Подрядчик уже приглашен куратором
   */
  ALREADY_INVITED = 3,
}

enum OutlayConfirmStatus {
  /**
   * Последние изменения по смете подтверждены исполнителем
   */
  ESTIMATE_CONFIRMED_BY_CONTRACTOR = 1,
  /**
   * Последние изменения по смете подтверждены координатором
   */
  ESTIMATE_CONFIRMED_BY_COORDINATOR = 2,
  /**
   * Последние изменения по смете подтверждены обеими сторонами
   */
  ESTIMATE_CONFIRMED_BY_BOTH = 3,
}

enum TaskSetType {
  IT_SERVICES = 1,
  COMMON = 2,
}

type TaskSearch = {
  ID?: number;
};

export {
  TaskTab,
  RoleType,
  TaskType,
  StatusType,
  TaskSetType,
  EstimateTab,
  OutlayStatusType,
  ContractorStatus,
  OutlayConfirmStatus,
};
export type { TaskSearch };
