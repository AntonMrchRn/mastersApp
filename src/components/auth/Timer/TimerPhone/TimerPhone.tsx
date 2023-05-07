import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import {
  clearIsRecovery,
  timerOff,
  timerOn,
} from '../../../../redux/slices/auth/reducer';
import { styles } from './style';
import { configApp } from '../../../../utils/helpers/platform';
import { useAppSelector } from '../../../../utils/hooks/useRedux';
import { TimerComponent } from '../TimerComponent';

const setData = async (data: any) => {
  await AsyncStorage.setItem('BLOCK', data);
};

type TimerBlockProps = {
  expiredTimer: number;
  isConfirm?: boolean;
  callBack?: () => {};
};

export function TimerBlock({
  expiredTimer,
  isConfirm,
  callBack,
}: TimerBlockProps) {
  const { isRecovery, isActiveTimer } = useAppSelector(state => state.auth);
  const [timeMilliSeconds, setTimeMilliSeconds] = useState(Date.now());
  const windowHeight = useWindowDimensions().height;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
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

  if (!isActiveTimer && isConfirm) {
    return (
      <View
        style={[
          styles.wrapper,
          windowHeight < 593 && configApp.android && styles.heightAndroid,
        ]}
      >
        <TouchableOpacity
          style={styles.btnRepeatCode}
          onPress={() => {
            setLoading(true);
            callBack && callBack();
            setIsBlock({
              block: true,
              timerOffset: Date.now(),
            });
            setTimeMilliSeconds(Date.now());
            setLoading(false);
          }}
        >
          <Text style={styles.textBtn}>Отправить новый код</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
