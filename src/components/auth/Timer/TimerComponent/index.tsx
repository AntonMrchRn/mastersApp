import React from 'react';
import { useEffect } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { configApp } from '../../../../utils/helpers/platform';
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
  return <Text style={styles.timeFormatStyle}>{timeFormat(props.time)}</Text>;
};
export const TimerComponent = ({
  expiredTimer,
  timerOffset,
  closeBlock,
  setTimeMilliSeconds,
  timeMilliSeconds,
}: any) => {
  const windowHeight = useWindowDimensions().height;
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
    <View
      style={[
        styles.wrapper,
        windowHeight < 593 && configApp.android && styles.wrapperAndroid,
      ]}
    >
      <Text style={styles.timer}>
        {`Отправить код повторно (${timeFormat(
          timerOffset + expiredTimer - timeMilliSeconds
        )})`}
      </Text>
    </View>
  );
};
