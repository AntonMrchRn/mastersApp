import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppSelector } from '../../../../store';
import {
  clearIsRecovery,
  timerOff,
  timerOn,
} from '../../../../store/slices/auth/actions';
import { selectAuth } from '../../../../store/slices/auth/selectors';
import { configApp, deviceHeight } from '../../../../utils/helpers/platform';
import { TimerComponent } from '../TimerComponent';

import { styles } from './style';

const setData = async (data: string) => {
  await AsyncStorage.setItem('BLOCK', data);
};

type TimerBlockProps = {
  expiredTimer: number;
  isConfirm?: boolean;
  callBack?: () => void;
};

export function TimerBlock({
  expiredTimer,
  isConfirm,
  callBack,
}: TimerBlockProps) {
  const { isRecovery, isActiveTimer } = useAppSelector(selectAuth);
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
    if (isRecovery) {
      handleBlock();
    }
  }, [isRecovery]);

  const handleBlock = useCallback(() => {
    const data = { block: true, timerOffset: Date.now() };
    setData(JSON.stringify(data)).then(() => {
      setIsBlock(data);
      dispatch(timerOn());
      dispatch(clearIsRecovery());
    });
  }, []);

  const closeBlock = useCallback(() => {
    AsyncStorage.removeItem('BLOCK').then(() => {
      setIsBlock({ block: false, timerOffset: null });
      dispatch(timerOff());
    });
  }, [isBlock]);

  useEffect(() => {
    const readStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('BLOCK');
        if (value === null) {
          dispatch(timerOff());
        }
        if (value !== null) {
          dispatch(timerOn());
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

  if (!isActiveTimer && isConfirm) {
    const onSendCode = () => {
      setIsLoading(true);
      callBack && callBack();
      setIsBlock({
        block: true,
        timerOffset: Date.now(),
      });
      setTimeMilliSeconds(Date.now());
      setIsLoading(false);
    };

    return (
      <View
        style={[
          styles.wrapper,
          deviceHeight < 593 && configApp.android && styles.heightAndroid,
        ]}
      >
        <TouchableOpacity style={styles.btnRepeatCode} onPress={onSendCode}>
          <Text style={styles.textBtn}>Отправить новый код</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
