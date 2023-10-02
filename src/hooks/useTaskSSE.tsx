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
import { useAppDispatch } from '@/store';
import { tasksAPI } from '@/store/api/tasks';

type CustomEvent = 'tasks' | 'refresh';

let sseIOS: EventSourceIOS<CustomEvent> | undefined;
let sseAndroid: EventSourceAndroid<CustomEvent> | undefined;

export const useTaskSSE = ({
  taskId,
  refresh,
}: {
  taskId: number;
  refresh: () => void;
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const customEventHandler: OnMessageHandler = message => {
      if (message.event === 'open') {
        console.log('Open SSE connection.');
      } else if (message.event === 'refresh') {
        refresh();
      } else if (message.event === 'tasks') {
        try {
          const res = JSON.parse(message.data || '');
          if (res) {
            dispatch(
              tasksAPI.util.updateQueryData('getTask', taskId, resp => {
                resp.tasks = [{ ...resp.tasks[0], ...res }];
              }),
            );
          }
        } catch (err) {
          console.log('🚀 ~ file: useTaskSSE.tsx:30 ~ err:', err);
        }
      } else if (message.event === 'error') {
        console.log('Connection error:');
      }
    };
    (async () => {
      const res = await axiosInstance.get(
        `${host}postman/subscribe?taskID=${taskId}`,
      );

      if (configApp.ios) {
        const eventSourceIOS = new EventSourceIOS<CustomEvent>(res.data, {
          headers: { ['M-Token']: storageMMKV.getString('token') },
        });
        sseIOS = eventSourceIOS;
        const listenerIOS: EventSourceListener<
          EventType | CustomEvent
        > = event => {
          if (event.type === 'open') {
            console.log('Open SSE connection.');
          } else if (event.type === 'refresh') {
            refresh();
          } else if (event.type === 'tasks') {
            try {
              const res = JSON.parse(event.data || '');
              if (res) {
                dispatch(
                  tasksAPI.util.updateQueryData('getTask', taskId, resp => {
                    resp.tasks = [{ ...resp.tasks[0], ...res }];
                  }),
                );
              }
            } catch (err) {
              console.log('🚀 ~ file: useTaskSSE.tsx:30 ~ err:', err);
            }
          } else if (event.type === 'error') {
            console.log('Connection error:');
          } else if (event.type === 'exception') {
            console.log('Error:', event.message, event.error);
          }
        };
        sseIOS.addEventListener('open', listenerIOS);
        sseIOS.addEventListener('tasks', listenerIOS);
        sseIOS.addEventListener('refresh', listenerIOS);
        sseIOS.addEventListener('error', listenerIOS);
      }
      if (configApp.android) {
        const eventSourceAndroid = new EventSourceAndroid<CustomEvent>(
          res.data,
          {
            headers: { ['M-Token']: storageMMKV.getString('token') as string },
          },
        );
        sseAndroid = eventSourceAndroid;

        // sseAndroid.addEventListener('tasks', customEventHandler);
        sseAndroid.addEventListener('refresh', customEventHandler);
      }
    })();
    return () => {
      if (configApp.ios && sseIOS) {
        sseIOS.removeAllEventListeners();
        sseIOS.close();
        sseIOS = undefined;
      }
      if (configApp.android && sseAndroid) {
        sseAndroid.remove(customEventHandler);
        sseAndroid.flushAllListeners();
        sseAndroid.close();
        sseAndroid = undefined;
      }
    };
  }, []);
  return null;
};
