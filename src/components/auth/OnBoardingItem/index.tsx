import React, { FC, ReactElement } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text, useTheme } from 'rn-ui-kit';

import StepOne from '@/assets/icons/svg/onboarding/StepOne';
import StepThree from '@/assets/icons/svg/onboarding/StepThree';
import StepTwo from '@/assets/icons/svg/onboarding/StepTwo';
import { useAppDispatch } from '@/store';
import {
  activeToolTip,
  unActiveOnboarding,
} from '@/store/slices/onboarding/actions';

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
    return 'Начать';
  };

  const getCircularProgress = () => {
    if (item?.id === 1) {
      return <StepOne />;
    }
    if (item?.id === 2) {
      return <StepTwo />;
    }
    return <StepThree />;
  };

  const onPressBtn = async () => {
    if (isLast) {
      await dispatch(activeToolTip());
      await dispatch(unActiveOnboarding());
      return;
    }
    return onPress?.(index);
  };

  const allSkip = async () => {
    await dispatch(activeToolTip());
    await dispatch(unActiveOnboarding());
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
        <View style={styles.wrapCircle}>{getCircularProgress()}</View>
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
