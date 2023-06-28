import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TimerComponent from '@/components/Timer/TimerComponent';
import { useAppSelector } from '@/store';
import {
  setIsEmailEditing,
  timerOffProfileEmail,
  timerOnProfileEmail,
} from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';

const setData = async (data: string) => {
  await AsyncStorage.setItem('PROFILE_EMAIL_BLOCK', data);
};

type TimerBlockEmailProps = {
  expiredTimer: number;
};

function TimerBlockEmailProfile({ expiredTimer }: TimerBlockEmailProps) {
  const { isEmailEditing } = useAppSelector(selectUser);
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
    if (isEmailEditing) {
      handleBlock();
    }
  }, [isEmailEditing]);

  const handleBlock = useCallback(() => {
    const data = { block: true, timerOffset: Date.now() };
    setData(JSON.stringify(data)).then(() => {
      setIsBlock(data);
      dispatch(timerOnProfileEmail());
      dispatch(setIsEmailEditing(false));
    });
  }, []);

  const closeBlock = useCallback(() => {
    AsyncStorage.removeItem('PROFILE_EMAIL_BLOCK').then(() => {
      setIsBlock({ block: false, timerOffset: null });
      dispatch(timerOffProfileEmail());
    });
  }, [isBlock]);

  useEffect(() => {
    const readStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('PROFILE_EMAIL_BLOCK');
        if (value === null) {
          dispatch(timerOffProfileEmail());
        }
        if (value !== null) {
          dispatch(timerOnProfileEmail());
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

export default TimerBlockEmailProfile;
