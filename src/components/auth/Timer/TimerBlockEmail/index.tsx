import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TimerComponent from '@/components/auth/Timer/TimerComponent';
import { storageMMKV } from '@/mmkv/storage';
import { useAppSelector } from '@/store';
import {
  clearIsRecoveryEmail,
  timerOffEmail,
  timerOnEmail,
} from '@/store/slices/auth/actions';
import { selectAuth } from '@/store/slices/auth/selectors';

const setData = async (data: string) => {
  await AsyncStorage.setItem('BLOCKEMAIL', data);
};

type TimerBlockEmailProps = {
  expiredTimer: number;
};

function TimerBlockEmail({ expiredTimer }: TimerBlockEmailProps) {
  const { isRecoveryEmail } = useAppSelector(selectAuth);
  const dispatch = useDispatch();

  const [timeMilliSeconds, setTimeMilliSeconds] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBlock, setIsBlock] = useState<{
    block: boolean;
    timerOffset: number | null;
  }>({
    block: true,
    timerOffset: Date.now(),
  });

  useEffect(() => {
    if (isRecoveryEmail) {
      handleBlock();
    }
  }, [isRecoveryEmail]);

  const handleBlock = useCallback(() => {
    const data = { block: true, timerOffset: Date.now() };
    setData(JSON.stringify(data)).then(() => {
      setIsBlock(data);
      dispatch(timerOnEmail());
      dispatch(clearIsRecoveryEmail());
    });
  }, []);

  const closeBlock = useCallback(() => {
    AsyncStorage.removeItem('BLOCKEMAIL').then(() => {
      setIsBlock({ block: false, timerOffset: null });
      dispatch(timerOffEmail());
      storageMMKV.delete('timerEmail');
    });
  }, [isBlock]);

  useEffect(() => {
    const readStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('BLOCKEMAIL');
        if (value === null) {
          dispatch(timerOffEmail());
        }
        if (value !== null) {
          dispatch(timerOnEmail());
          const data = JSON.parse(value);
          const timeNow = Date.now();

          if (timeNow - data.timerOffset > expiredTimer) {
            closeBlock();
            setIsLoading(false);
          } else {
            setIsBlock(data);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
          setIsBlock({ block: false, timerOffset: null });
        }
      } catch (e) {
        setIsLoading(false);
        setIsBlock({ block: false, timerOffset: null });
        console.log('readStorage error', e);
      }
    };

    readStorage().then();

    return () => {
      setIsLoading(true);
    };
  }, []);

  if (isLoading) {
    return <View />;
  }

  if (isBlock?.block) {
    return (
      <TimerComponent
        timerOffset={isBlock.timerOffset}
        expiredTimer={expiredTimer}
        closeBlock={closeBlock}
        setTimeMilliSeconds={setTimeMilliSeconds}
        timeMilliSeconds={timeMilliSeconds}
      />
    );
  }
  return null;
}

export default TimerBlockEmail;
