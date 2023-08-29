import React, { FC, useState } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CaretRightIcon } from '@/assets/icons/svg/estimate/CaretRightIcon';
import { CubeLargeIcon } from '@/assets/icons/svg/estimate/CubeLargeIcon';
import { Measure } from '@/store/api/tasks/types';

import { EstimateMeasureBottomSheet } from './EstimateMeasureBottomSheet';

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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      marginHorizontal: 20,
    },
    title: {
      marginVertical: 24,
    },
    button: {
      borderRadius: 12,
    },
    inputs: {
      gap: 16,
    },
    measure: {
      flexDirection: 'row',
      marginTop: 4,
      paddingVertical: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    measureItem: {
      gap: 4,
    },
    row: {
      flexDirection: 'row',
    },
    cube: {
      marginRight: 8,
    },
    error: {
      marginTop: 4,
    },
  });
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
      <Spacer size={0} separator="top" />
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
