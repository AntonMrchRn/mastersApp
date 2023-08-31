import { useEffect } from 'react';
import EventSource, { EventSourceListener, EventType } from 'react-native-sse';

import { storageMMKV } from '@/mmkv/storage';
import { axiosInstance } from '@/services/axios/axiosInstance';
import { useAppDispatch } from '@/store';
import { tasksAPI } from '@/store/api/tasks';

type CustomEvent = 'tasks';
let sse: EventSource<CustomEvent>;
export const useTaskSSE = (taskId: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get(
        `https://sandbox8.apteka-aprel.ru/api/postman/subscribe?taskID=${taskId}`
      );
      const ress = new EventSource<CustomEvent>(res.data, {
        headers: { ['M-Token']: storageMMKV.getString('token') },
      });
      sse = ress;
      const listener: EventSourceListener<EventType | CustomEvent> = event => {
        if (event.type === 'open') {
          console.log('Open SSE connection.');
        } else if (event.type === 'tasks') {
          try {
            const res = JSON.parse(event.data || '');
            if (res) {
              dispatch(
                tasksAPI.util.updateQueryData('getTask', taskId, resp => {
                  resp.tasks = [res];
                })
              );
            }
          } catch (err) {
            console.log('🚀 ~ file: useTaskSSE.tsx:30 ~ err:', err);
          }
        } else if (event.type === 'error') {
          console.error('Connection error:');
        } else if (event.type === 'exception') {
          console.error('Error:', event.message, event.error);
        }
      };
      sse.addEventListener('open', listener);
      sse.addEventListener('tasks', listener);
      sse.addEventListener('error', listener);
    })();
    return () => {
      sse.removeAllEventListeners();
      sse.close();
    };
  }, []);
  return null;
};
