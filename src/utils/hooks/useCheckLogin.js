import { useDispatch, useSelector } from 'react-redux';
import { storageMMKV } from '../../mmkv/storage';
import { Login, notLogin } from '../../redux/slices/auth/reducer';

export const useCheckLogin = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);

  const checkLogin = () => {
    try {
      const token = storageMMKV.getString('token');
      if (token) {
        dispatch(Login());
      } else {
        dispatch(notLogin());
      }
    } catch (e) {
      console.error("User didn't login", e);
    }
  };

  return [checkLogin, isAuth];
};
