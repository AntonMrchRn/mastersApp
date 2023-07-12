export enum TaskType {
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
export enum StatusType {
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
   * Выполнение / Подписание документов
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
export enum OutlayStatusType {
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
export enum TaskTab {
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
export enum RoleType {
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
type TaskSearch = {
  ID?: number;
};

type Measure = {
  text: string;
  name: string;
};

export type { TaskSearch, Measure };
