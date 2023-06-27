export enum TaskType {
  IT_AUCTION_SALE = 1,
  IT_FIRST_RESPONCE = 2,
  IT_INTERNAL_EXECUTIVES = 3,
  COMMON_AUCTION_SALE = 4,
  COMMON_FIRST_RESPONCE = 5,
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
   * Подготовка
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
  DESCRIPTION = 'Описание',
  ESTIMATE = 'Смета',
  COMMENTS = 'Комментарии',
  REPORT = 'Отчет',
  HISTORY = 'История',
}
export enum RoleType {
  INTERNAL_EXECUTOR = 1,
  EXTERNAL_EXECUTOR = 2,
  SUPERVISOR = 3,
  AGGREGATOR = 4,
  COORDINATOR = 5,
  CLIENT = 6,
}
type TaskSearch = {
  ID?: number;
};
type HandleUpload = {
  formData: FormData;
  files: {
    name: string;
    size: number;
  }[];
  date: string;
};

export type { TaskSearch, HandleUpload };
