import { useAppSelector } from '@/store';
import { useGetTaskQuery } from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
import { RoleType, TaskType } from '@/types/task';

export const useTaskMembers = (taskId: number) => {
  const user = useAppSelector(selectAuth).user;
  const { data, isError, error, refetch, isLoading, isSuccess } =
    useGetTaskQuery(taskId);

  const task = data?.tasks?.[0];

  /**
   * участники задачи
   */
  const executors = task?.executors || [];
  const executor = executors.find(executor => executor.ID === user?.userID);
  const curators = task?.curators || [];
  const curator = curators.find(curator => curator.ID === user?.userID);
  const coordinator = task?.coordinator;
  const executorMemberId = executor?.memberID;
  const curatorMemberId = curator?.memberID;
  /**
   * Отказался ли куратор принять задачу
   */
  const isRefusedCurator = !!curator?.isRefuse;
  /**
   * Отказался ли подрядчик принять задачу
   */
  const isRefusedExecutor = !!executor?.isRefuse;
  /**
   * Подрядчик
   */
  const isContractor = !!executor?.hasCurator && !isRefusedExecutor;
  /**
   * Исполнитель
   */
  const isExecutor = !!executor && !executor.hasCurator && !isRefusedExecutor;
  /**
   * Координатор
   */
  const isCoordinator = coordinator?.ID === user?.userID;
  /**
   * Руководитель
   */
  const isSupervisor = user?.roleID === RoleType.SUPERVISOR;
  /**
   * Куратор
   */
  const isCurator =
    curators.some(curator => curator.ID === user?.userID) && !curator?.isRefuse;
  /**
   * Принял ли задачу куратор
   */
  const isConfirmedCurator = isCurator && !!curator?.isConfirm;
  /**
   * Принял ли задачу исполнитель
   */
  const isConfirmedExecutor = isExecutor && !!executor?.isConfirm;
  /**
   * Принял ли задачу подрядчик
   */
  const isConfirmedContractor = isContractor && !!executor?.isConfirm;

  /**
   * Задача с куратором
   */
  const isCuratorAllowedTask = !!task?.isCuratorAllowed;
  /**
   * Задача с участием куратора, который её ещё не принял (или принял, но отказался)
   */
  const isTaskWithUnconfirmedCurator =
    isCuratorAllowedTask && (!isConfirmedCurator || isRefusedCurator);
  /**
   * Является ли куратор приглашённым (координатором или руководителем)
   */
  const isInvitedCurator =
    (((!isConfirmedCurator || isRefusedCurator) &&
      task?.subsetID === TaskType.IT_FIRST_RESPONSE) ||
      (!isConfirmedCurator &&
        !isRefusedCurator &&
        task?.subsetID === TaskType.IT_AUCTION_SALE)) &&
    (curator?.inviterRoleID === RoleType.COORDINATOR ||
      curator?.inviterRoleID === RoleType.SUPERVISOR);
  /**
   * Является ли исполнитель приглашённым (координатором или руководителем)
   */
  const isInvitedExecutor =
    (((!isConfirmedExecutor || (isConfirmedExecutor && isRefusedExecutor)) &&
      task?.subsetID === TaskType.IT_FIRST_RESPONSE) ||
      (!isConfirmedExecutor &&
        !isRefusedExecutor &&
        task?.subsetID === TaskType.IT_AUCTION_SALE)) &&
    (executor?.inviterRoleID === RoleType.COORDINATOR ||
      executor?.inviterRoleID === RoleType.SUPERVISOR);
  /**
   * Отказался ли приглашенный участник от задания с закрытым доступом (отозвал смету)
   */
  const isRefusedInvitedMember =
    !task?.isOpenAccess && (isRefusedCurator || isRefusedExecutor);

  return {
    task,
    error,
    isError,
    refetch,
    isLoading,
    curator,
    curators,
    executor,
    executors,
    isSuccess,
    isCurator,
    isExecutor,
    coordinator,
    isContractor,
    isSupervisor,
    isCoordinator,
    curatorMemberId,
    executorMemberId,
    isInvitedCurator,
    isInvitedExecutor,
    isConfirmedCurator,
    userID: user?.userID,
    isCuratorAllowedTask,
    isConfirmedContractor,
    isRefusedInvitedMember,
    isTaskWithUnconfirmedCurator,
  };
};
