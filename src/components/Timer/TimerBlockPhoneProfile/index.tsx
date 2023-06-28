import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TimerComponent from '@/components/Timer/TimerComponent';
import { configApp, deviceHeight } from '@/constants/platform';
import { useAppSelector } from '@/store';
import {
  setIsPhoneEditing,
  timerOffProfilePhone,
  timerOnProfilePhone,
} from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';

import styles from './../style';

const setData = async (data: string) => {
  await AsyncStorage.setItem('PROFILE_PHONE_BLOCK', data);
};

type TimerBlockPhoneProps = {
  expiredTimer: number;
  isConfirm?: boolean;
  callBack?: () => void;
};

function TimerBlockPhoneProfile({
  expiredTimer,
  isConfirm,
  callBack,
}: TimerBlockPhoneProps) {
  const { isPhoneEditing, isActivePhoneTimer } = useAppSelector(selectUser);
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
    if (isPhoneEditing) {
      handleBlock();
    }
  }, [isPhoneEditing]);

  const handleBlock = useCallback(() => {
    const data = { block: true, timerOffset: Date.now() };
    setData(JSON.stringify(data)).then(() => {
      setIsBlock(data);
      dispatch(timerOnProfilePhone());
      dispatch(setIsPhoneEditing(false));
    });
  }, []);

  const closeBlock = useCallback(() => {
    AsyncStorage.removeItem('PROFILE_PHONE_BLOCK').then(() => {
      setIsBlock({ block: false, timerOffset: null });
      dispatch(timerOffProfilePhone());
    });
  }, [isBlock]);

  useEffect(() => {
    const readStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('PROFILE_PHONE_BLOCK');
        if (value === null) {
          dispatch(timerOffProfilePhone());
        }
        if (value !== null) {
          dispatch(timerOnProfilePhone());
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

  if (!isActivePhoneTimer && isConfirm) {
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

export default TimerBlockPhoneProfile;
