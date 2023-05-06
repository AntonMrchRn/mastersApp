import { useDispatch } from 'react-redux';
import { storageMMKV } from '../../mmkv/storage';
import { login, logOut } from '../../redux/slices/auth/reducer';
import { useAppSelector } from './useRedux';

export const useCheckLogin = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAppSelector(state => state.auth);

  const checkLogin = () => {
    try {
      const token = storageMMKV.getString('token');

      if (token) {
        dispatch(login());
      } else {
        dispatch(logOut());
      }
    } catch (e) {
      console.error("User didn't login", e);
    }
  };

  return { checkLogin, isAuth };
};
