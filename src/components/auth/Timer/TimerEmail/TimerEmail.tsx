import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import {
  clearIsRecoveryEmail,
  timerOffEmail,
  timerOnEmail,
} from '../../../../redux/slices/auth/reducer';
import { storageMMKV } from '../../../../mmkv/storage';
import { useAppSelector } from '../../../../utils/hooks/useRedux';
import { TimerComponent } from '../TimerComponent';

const setData = async (data: any) => {
  await AsyncStorage.setItem('BLOCKEMAIL', data);
};

export function TimerBlockEmail({ expiredTimer }: any) {
  const { isRecoveryEmail } = useAppSelector(state => state.auth);
  const dispatch = useDispatch();
  const [timeMilliSeconds, setTimeMilliSeconds] = useState(Date.now());
  const [loading, setLoading] = useState(true);
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
          let data = JSON.parse(value);
          let timeNow = Date.now();

          if (timeNow - data.timerOffset > expiredTimer) {
            closeBlock();
            setLoading(false);
          } else {
            setIsBlock(data);
            setLoading(false);
          }
        } else {
          setLoading(false);
          setIsBlock({ block: false, timerOffset: null });
        }
      } catch (e) {
        setLoading(false);
        setIsBlock({ block: false, timerOffset: null });
        console.log('readStorage error', e);
      }
    };

    readStorage().then();

    return () => {
      setLoading(true);
    };
  }, []);

  if (loading) {
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
