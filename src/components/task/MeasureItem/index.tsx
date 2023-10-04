import React, { FC, useState } from 'react';
import { useController } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CaretRightIcon } from '@/assets/icons/svg/estimate/CaretRightIcon';
import { CubeLargeIcon } from '@/assets/icons/svg/estimate/CubeLargeIcon';
import { EstimateMeasureBottomSheet } from '@/components/task/TaskCard/EstimateMeasureBottomSheet';
import { Measure } from '@/store/api/tasks/types';

import { styles } from './styles';

type MeasureItemProps = {
  measure: string;
  measures: Measure[];
  error?: string;
};
export const MeasureItem: FC<MeasureItemProps> = ({
  measure,
  measures,
  error,
}) => {
  const theme = useTheme();
  const [sheetVisible, setSheetVisible] = useState(false);
  const { field } = useController({
    name: 'measure',
  });
  const onSheetVisible = () => {
    setSheetVisible(!sheetVisible);
  };
  const onPressMeasure = (measure: string) => {
    setSheetVisible(!sheetVisible);
    field.onChange(measure);
  };

  return (
    <>
      <EstimateMeasureBottomSheet
        isVisible={sheetVisible}
        onCancel={onSheetVisible}
        onChange={onPressMeasure}
        data={measures}
        selectedMeasure={measure}
      />
      <TouchableOpacity style={styles.measure} onPress={onSheetVisible}>
        {measure ? (
          <View style={styles.measureItem}>
            <Text variant={'captionRegular'} color={theme.text.neutral}>
              Единица измерения
            </Text>
            <Text variant={'bodyMRegular'} color={theme.text.basic}>
              {measure}
            </Text>
          </View>
        ) : (
          <View style={styles.row}>
            <View style={styles.cube}>
              <CubeLargeIcon />
            </View>
            <Text variant={'bodyMRegular'} color={theme.text.basic}>
              Единица измерения
            </Text>
          </View>
        )}
        <CaretRightIcon />
      </TouchableOpacity>
      <Spacer
        size={10}
        separator="bottom"
        separatorColor={theme.background.neutralDisableSecond}
      />
      {error && (
        <Text
          variant={'captionRegular'}
          color={theme.text.danger}
          style={styles.error}
        >
          {error}
        </Text>
      )}
    </>
  );
};
