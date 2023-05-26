import { RootState } from '../../store';

const selectAuth = (state: RootState) => state.auth;

export { selectAuth };
