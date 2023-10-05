import React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

import { configApp, deviceHeight } from '@/constants/platform';

import styles from './style';

const pad = (time: string, length: number) => {
  while (time?.length < length) {
    time = '0' + time;
  }
  return time;
};

const timeFormat = (time: number) => {
  const date = new Date(time);
  const h = pad(date.getUTCHours().toString(), 2);
  const m = pad(date.getUTCMinutes().toString(), 2);
  const s = pad(date.getUTCSeconds().toString(), 2);

  if (+h >= 23 && +m >= 59 && +s > 0) {
    return '00:00';
  } else {
    return `${+h < 1 ? '' : h + ':'}${m}:${+h === 1 ? null : s}`;
  }
};

type TimerComponentProps = {
  expiredTimer: number;
  closeBlock: () => void;
  timeMilliSeconds: number;
  timerOffset: number | null;
  setTimeMilliSeconds: (timeMilliSeconds: number) => void;
  message?: string;
};

const TimerComponent = ({
  expiredTimer,
  timerOffset,
  closeBlock,
  timeMilliSeconds,
  setTimeMilliSeconds,
  message = 'Отправить код повторно',
}: TimerComponentProps) => {
  useEffect(() => {
    setTimeMilliSeconds(Date.now());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeMilliSeconds(Date.now());
    }, 1000);

    if (!!timerOffset && timeMilliSeconds - timerOffset > expiredTimer) {
      closeBlock();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [timeMilliSeconds]);

  return (
    <View
      style={[
        styles.wrapper,
        deviceHeight < 593 && configApp.android && styles.wrapperAndroid,
      ]}
    >
      {!!timerOffset && (
        <Text style={styles.timer}>
          {`${message} (${timeFormat(
            timerOffset + expiredTimer - timeMilliSeconds,
          )})`}
        </Text>
      )}
    </View>
  );
};

export default TimerComponent;
