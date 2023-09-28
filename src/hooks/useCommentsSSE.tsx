import { useEffect } from 'react';
import EventSource, { EventSourceListener, EventType } from 'react-native-sse';

import { storageMMKV } from '@/mmkv/storage';
import { axiosInstance } from '@/services/axios/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import { getComments } from '@/store/slices/myTasks/asyncActions';
import { clearComments, setComment } from '@/store/slices/myTasks/reducer';

type CustomEvent = 'comments';
let sse: EventSource<CustomEvent>;
let timeout: NodeJS.Timer;
export const useCommentsSSE = (taskId: string) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuth);
  const userID = user?.userID;

  const hadnleGetComments = () => {
    const time = setInterval(
      () =>
        dispatch(
          getComments({ idCard: taskId, numberOfPosts: 999, sort: 'desc' }),
        ),
      4000,
    );
    timeout = time;
  };

  useEffect(() => {
    dispatch(getComments({ idCard: taskId, numberOfPosts: 999, sort: 'desc' }));
    (async () => {
      const res = await axiosInstance.get(
        `https://sandbox8.apteka-aprel.ru/api/postman/subscribe?taskID=${taskId}`,
      );
      const ress = new EventSource<CustomEvent>(res.data, {
        headers: { ['M-Token']: storageMMKV.getString('token') },
      });
      sse = ress;
      const listener: EventSourceListener<EventType | CustomEvent> = event => {
        if (event.type === 'open') {
          timeout && clearInterval(timeout);
          console.log('Open SSE connection.');
        } else if (event.type === 'comments') {
          try {
            const res = JSON.parse(event.data || '');
            if (res && res?.authorTypeID !== 3) {
              dispatch(setComment({ ...res, isMine: res.userID === userID }));
            }
          } catch (err) {
            console.log('🚀 ~ file: useTaskSSE.tsx:30 ~ err:', err);
          }
        } else if (event.type === 'error') {
          console.log('Connection error:');
          hadnleGetComments();
        } else if (event.type === 'exception') {
          console.log('Error:', event.message, event.error);
        }
      };
      sse.addEventListener('open', listener);
      sse.addEventListener('comments', listener);
      sse.addEventListener('error', listener);
    })();
    return () => {
      sse.removeAllEventListeners();
      sse.close();
      dispatch(clearComments());
      timeout && clearInterval(timeout);
    };
  }, []);
  return null;
};
