import React, { FC, ReactElement } from 'react';
import { TouchableOpacity, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text, useTheme } from 'rn-ui-kit';

import { useAppDispatch } from '@/store';
import { unActiveOnboarding } from '@/store/slices/onboarding/actions';

import { styles } from './styles';

export type onBoardItem = {
  item: { id: number; icon?: ReactElement | boolean };
  index: number;
  onPress?: (index: number) => void;
  isLast: boolean;
};

export const OnBoardingItem: FC<onBoardItem> = ({
  item,
  index,
  onPress,
  isLast,
}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const hitSlop = {
    top: 24,
    left: 24,
    right: 24,
    bottom: 24,
  };

  const getLabel = () => {
    if (item?.id === 1) {
      return 'Понятно';
    }
    if (item?.id === 2) {
      return 'Интересно';
    }
    if (item?.id === 3) {
      return 'Отлично';
    }
    return 'Начать';
  };

  const onPressBtn = () => {
    if (isLast) {
      return dispatch(unActiveOnboarding());
    }
    return onPress?.(index);
  };

  const allSkip = () => {
    dispatch(unActiveOnboarding());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapTop}>
        {!isLast && (
          <TouchableOpacity onPress={() => allSkip()} hitSlop={hitSlop}>
            <Text
              variant="bodySBold"
              style={styles.btnTxt}
              color={theme.text.contrast}
            >
              Пропустить все
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.wrapIcon}>
        {item?.icon && <View>{item?.icon}</View>}
      </View>
      <View style={styles.wrapBottom}>
        <View style={styles.wrapCircle}>
          <CircularProgress
            value={index + 1}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeColor={'#6F7FD4'}
            activeStrokeColor={'#6F7FD4'}
            radius={24}
            duration={2000}
            progressValueColor={'#6F7FD4'}
            maxValue={4}
            valueSuffix={'/4'}
            inActiveStrokeWidth={1}
            activeStrokeWidth={6}
            valueSuffixStyle={styles.suffix}
            progressValueStyle={styles.value}
          />
        </View>
        <View style={[styles.wrapBtn, isLast && styles.wrapBtnLast]}>
          <Button
            hitSlop={hitSlop}
            label={getLabel()}
            onPress={() => onPressBtn()}
            style={[styles.btn, isLast && styles.wrapBtnLast]}
            labelStyle={[styles.labelBtn, isLast && styles.labelBtnLast]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
