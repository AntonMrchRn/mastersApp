import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BottomSheet, Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CheckMeasureIcon } from '@/assets/icons/svg/estimate/CheckMeasureIcon';
import { Measure } from '@/types/task';

type EstimateMeasureBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  onChange: (measure: string) => void;
  data: Measure[];
  selectedMeasure: string;
};
export const EstimateMeasureBottomSheet: FC<
  EstimateMeasureBottomSheetProps
> = ({ isVisible, onCancel, onChange, data, selectedMeasure }) => {
  const theme = useTheme();
  const [selectName, setSelectName] = useState(selectedMeasure);
  const onChangeMeasure = () => {
    onChange(selectName);
  };
  const styles = StyleSheet.create({
    button: {
      marginTop: 24,
    },
    action: {
      marginVertical: 12,
    },
    container: {
      marginTop: 8,
    },
    between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  return (
    <BottomSheet
      onSwipeComplete={onCancel}
      isVisible={isVisible}
      title={'Единица измерения'}
      closeIcon
      closeIconPress={onCancel}
    >
      <View style={styles.container}>
        {data.map(item => {
          const onPress = () => {
            setSelectName(item.text);
          };
          const isSelected = item.text === selectName;
          return (
            <TouchableOpacity
              onPress={onPress}
              key={item.name}
              style={styles.between}
            >
              <Text
                style={styles.action}
                variant={'bodyMRegular'}
                color={theme.text.basic}
              >
                {item.text}
              </Text>
              {isSelected && <CheckMeasureIcon />}
            </TouchableOpacity>
          );
        })}
        <Spacer size={0} separator="bottom" />
        <Button
          style={styles.button}
          size="M"
          label="Выбрать"
          onPress={onChangeMeasure}
        />
      </View>
    </BottomSheet>
  );
};
