import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearIsRecovery,
  timerOff,
  timerOn,
} from '../../../redux/slices/auth/reducer';
import { storageMMKV } from '../../../mmkv/storage';

export const pad = (time, length) => {
  while (time?.length < length) {
    time = '0' + time;
  }
  return time;
};

export const timeFormat = time => {
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

export const Timer = props => {
  return <Text style={{ textAlign: 'center' }}>{timeFormat(props.time)}</Text>;
};

const BlockComponent = ({ expiredTimer, timerOffset, closeBlock }) => {
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
    <View style={bs.wrapper}>
      <Text style={bs.timer}>
        {`Повторите попытку через ${timeFormat(
          timerOffset + expiredTimer - timeMilliSeconds
        )}`}
      </Text>
    </View>
  );
};

const bs = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },
});

const setData = async data => {
  console.log('data', data);
  await AsyncStorage.setItem('BLOCK', data);
};

export function TimerBlock({ expiredTimer }) {
  const { isRecovery } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isBlock, setIsBlock] = useState({
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
    AsyncStorage.removeItem('BLOCK').then(r => {
      setIsBlock({ block: false, timerOffset: null });
      dispatch(timerOff());
      storageMMKV.delete('timer');
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
    return (
      <View style={style.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
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

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  link: {
    fontSize: 20,
    color: 'blue',
    marginTop: 16,
  },
});
