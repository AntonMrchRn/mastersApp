import { RootState } from '@/store';

const selectUser = (state: RootState) => state.user;

export { selectUser };
