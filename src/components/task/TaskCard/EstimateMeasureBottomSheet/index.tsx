import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { BottomSheet, Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CheckMeasureIcon } from '@/assets/icons/svg/estimate/CheckMeasureIcon';
import { configApp } from '@/constants/platform';
import { Measure } from '@/store/api/tasks/types';

import { styles } from './styles';

type EstimateMeasureBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  onChange: (measure: string) => void;
  data: Measure[];
  selectedMeasure: string;
};
export const EstimateMeasureBottomSheet = ({
  isVisible,
  onCancel,
  onChange,
  data,
  selectedMeasure,
}: EstimateMeasureBottomSheetProps) => {
  const theme = useTheme();
  const [selectName, setSelectName] = useState(selectedMeasure);
  const onChangeMeasure = () => {
    onChange(selectName);
  };

  return (
    <BottomSheet
      onBackdropPress={onCancel}
      onSwipeComplete={onCancel}
      isVisible={isVisible}
      title={'Единица измерения'}
      closeIcon
      closeIconPress={onCancel}
    >
      <View style={styles.container}>
        {!data?.length && (
          <ActivityIndicator size="large" style={styles.loader} />
        )}
        {data.map(item => {
          const onPress = () => {
            setSelectName(item.description);
          };
          const isSelected = item.description === selectName;
          return (
            <View key={item.ID}>
              <TouchableOpacity onPress={onPress} style={styles.between}>
                <Text
                  style={styles.action}
                  variant={'bodyMRegular'}
                  color={theme.text.basic}
                >
                  {item.description} ({item.name.toLowerCase()})
                </Text>
                {isSelected && <CheckMeasureIcon />}
              </TouchableOpacity>
              <Spacer
                size={0}
                separator="bottom"
                separatorColor={theme.background.neutralDisableSecond}
              />
            </View>
          );
        })}
        {!!data?.length && (
          <Button
            style={styles.button}
            size="M"
            label="Выбрать"
            onPress={onChangeMeasure}
          />
        )}
        <Spacer size={configApp.android ? 20 : 0} />
      </View>
    </BottomSheet>
  );
};
