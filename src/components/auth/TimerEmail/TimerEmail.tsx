import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearIsRecoveryEmail,
  timerOffEmail,
  timerOnEmail,
} from '../../../redux/slices/auth/reducer';
import { storageMMKV } from '../../../mmkv/storage';
import { styles } from './style';

export const pad = (time: any, length: any) => {
  while (time?.length < length) {
    time = '0' + time;
  }
  return time;
};

export const timeFormat = (time: any) => {
  time = new Date(time);
  let h = pad(time.getUTCHours().toString(), 2);
  let m = pad(time.getUTCMinutes().toString(), 2);
  let s = pad(time.getUTCSeconds().toString(), 2);

  if (h >= 23 && m >= 59 && s > 0) {
    return '00:00';
  } else {
    return `${h < 1 ? '' : h + ':'}${m}:${h === 1 ? null : s}`;
  }
};

export const Timer = (props: any) => {
  return <Text style={{ textAlign: 'center' }}>{timeFormat(props.time)}</Text>;
};

const BlockComponent = ({ expiredTimer, timerOffset, closeBlock }: any) => {
  const [timeMilliSeconds, setTimeMilliSeconds] = useState(Date.now());

  useEffect(() => {
    let timeout = setTimeout(() => {
      setTimeMilliSeconds(Date.now());
    }, 1000);

    if (timeMilliSeconds - timerOffset > expiredTimer) {
      closeBlock();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [timeMilliSeconds]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.timer}>
        {`Отправить код повторно (${timeFormat(
          timerOffset + expiredTimer - timeMilliSeconds
        )})`}
      </Text>
    </View>
  );
};

const setData = async (data: any) => {
  await AsyncStorage.setItem('BLOCKEMAIL', data);
};

// @ts-expect-error TS(7030): Not all code paths return a value.
export function TimerBlockEmail({ expiredTimer }: any) {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { isRecoveryEmail } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isBlock, setIsBlock] = useState({
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
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number'.
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
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number'.
          setIsBlock({ block: false, timerOffset: null });
        }
      } catch (e) {
        setLoading(false);
        // @ts-expect-error TS(2345): Argument of type '{ block: false; }' is not assign... Remove this comment to see the full error message
        setIsBlock({ block: false });
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
      <BlockComponent
        timerOffset={isBlock.timerOffset}
        expiredTimer={expiredTimer}
        closeBlock={closeBlock}
      />
    );
  }
}