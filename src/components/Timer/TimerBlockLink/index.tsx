import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '@/components/Timer/style';
import TimerComponent from '@/components/Timer/TimerComponent';
import { configApp, deviceHeight } from '@/constants/platform';
import { useAppSelector } from '@/store';
import {
  setIsLinkGenerating,
  setLinkTimeout,
  timerOffLink,
  timerOnLink,
} from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';

const setData = async (data: string) => {
  await AsyncStorage.setItem('LINK_BLOCK', data);
};

type TimerBlockLinkProps = {
  callBack: () => void;
  expiredTimer?: number;
  isConfirm?: boolean;
};

function TimerBlockLink({
  callBack,
  isConfirm,
  expiredTimer,
}: TimerBlockLinkProps) {
  const dispatch = useDispatch();
  const { isLinkGenerating, isActiveLinkTimer } = useAppSelector(selectUser);

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
    if (isLinkGenerating) {
      handleBlock();
    }
  }, [isLinkGenerating]);

  const handleBlock = useCallback(() => {
    const data = { block: true, timerOffset: Date.now() };
    setData(JSON.stringify(data)).then(() => {
      setIsBlock(data);
      dispatch(timerOnLink());
      dispatch(setIsLinkGenerating(false));
    });
  }, []);

  const closeBlock = useCallback(() => {
    AsyncStorage.removeItem('LINK_BLOCK').then(() => {
      setIsBlock({ block: false, timerOffset: null });
      dispatch(timerOffLink());
      // not reset in other timers, might be worth adding
      dispatch(setLinkTimeout(null));
    });
  }, [isBlock]);

  useEffect(() => {
    const readStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('LINK_BLOCK');
        if (value === null) {
          dispatch(timerOffLink());
        }
        if (value !== null) {
          dispatch(timerOnLink());
          const data = JSON.parse(value);
          const timeNow = Date.now();

          if (expiredTimer && timeNow - data.timerOffset > expiredTimer) {
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

  if (!isActiveLinkTimer && isConfirm) {
    const onSendCode = () => {
      setIsLoading(true);
      callBack();
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
          <Text style={styles.textBtn}>Сгенерировать новую ссылку</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return <View />;
  }

  if (expiredTimer && isBlock?.block) {
    return (
      <TimerComponent
        closeBlock={closeBlock}
        expiredTimer={expiredTimer}
        timerOffset={isBlock.timerOffset}
        message="Сгенерировать новую ссылку"
        timeMilliSeconds={timeMilliSeconds}
        setTimeMilliSeconds={setTimeMilliSeconds}
      />
    );
  }
  return null;
}

export default TimerBlockLink;
