import { useDispatch, useSelector } from 'react-redux';
import { storageMMKV } from '../../mmkv/storage';
import { login, logOut } from '../../redux/slices/auth/reducer';

export const useCheckLogin = () => {
  const dispatch = useDispatch();
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { isAuth } = useSelector(state => state.auth);

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

  return [checkLogin, isAuth];
};
