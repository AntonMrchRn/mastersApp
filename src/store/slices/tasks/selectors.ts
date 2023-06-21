import { RootState } from '@/store';

const selectTasks = (state: RootState) => state.tasks;

export { selectTasks };
