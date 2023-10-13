import { useEffect } from 'react';
import EventSourceAndroid, { OnMessageHandler } from 'react-native-oksse';
import EventSourceIOS, {
  EventSourceListener,
  EventType,
} from 'react-native-sse';

import { configApp } from '@/constants/platform';
import { storageMMKV } from '@/mmkv/storage';
import { axiosInstance } from '@/services/axios/axiosInstance';
import { host } from '@/services/axios/config';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import { getComments } from '@/store/slices/myTasks/asyncActions';
import { clearComments, setComment } from '@/store/slices/myTasks/reducer';

type CustomEvent = 'comments';

let sseIOS: EventSourceIOS<CustomEvent> | undefined;
let sseAndroid: EventSourceAndroid<CustomEvent> | undefined;
let timeout: ReturnType<typeof setTimeout>;

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
    const customEventHandler: OnMessageHandler = message => {
      if (message.event === 'open') {
        timeout && clearInterval(timeout);
        console.log('Open SSE connection.');
      } else if (message.event === 'comments') {
        try {
          const res = JSON.parse(message.data || '');
          if (res && res?.authorTypeID !== 3) {
            dispatch(setComment({ ...res, isMine: res.userID === userID }));
          }
        } catch (err) {
          console.log('🚀 ~ file: useTaskSSE.tsx:30 ~ err:', err);
        }
      } else if (message.event === 'error') {
        console.log('Connection error:');
        hadnleGetComments();
      }
    };
    (async () => {
      const res = await axiosInstance.get(
        `${host}postman/subscribe?taskID=${taskId}`,
      );
      if (configApp.ios) {
        const ress = new EventSourceIOS<CustomEvent>(res.data, {
          headers: { ['M-Token']: storageMMKV.getString('token') },
        });
        sseIOS = ress;
        const listener: EventSourceListener<
          EventType | CustomEvent
        > = event => {
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
        sseIOS.addEventListener('open', listener);
        sseIOS.addEventListener('comments', listener);
        sseIOS.addEventListener('error', listener);
      }
      if (configApp.android) {
        const eventSourceAndroid = new EventSourceAndroid<CustomEvent>(
          res.data,
          {
            headers: { ['M-Token']: storageMMKV.getString('token') as string },
          },
        );
        sseAndroid = eventSourceAndroid;

        sseAndroid.onmessage = customEventHandler;
        sseAndroid.addEventListener('comments', customEventHandler);
      }
    })();
    return () => {
      if (configApp.ios && sseIOS) {
        sseIOS.removeAllEventListeners();
        sseIOS.close();
        sseIOS = undefined;
      }
      dispatch(clearComments());
      timeout && clearInterval(timeout);
    };
  }, []);
  return null;
};
