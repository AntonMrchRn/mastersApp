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
