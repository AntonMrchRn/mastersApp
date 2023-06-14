import { useState } from 'react';

import dayjs from 'dayjs';

export const useTaskCardDescription = (
  onChangeEndTimePlan: (time: string) => Promise<void>
) => {
  const [inputDateValue, setInputDateValue] = useState('');
  const [dateModalVisible, setDateModalVisible] = useState(false);

  const onDateModalVisible = () => {
    setDateModalVisible(!dateModalVisible);
  };
  const onInputDateValue = (text: string) => {
    setInputDateValue(text);
  };

  const onDateBottomSheetButton = () => {
    const dateArray = inputDateValue.split('/');
    const currentDate = `20${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    const time = dayjs(currentDate).toISOString();
    onChangeEndTimePlan(time);
    setInputDateValue('');
    onDateModalVisible();
  };

  return {
    onDateModalVisible,
    dateModalVisible,
    inputDateValue,
    onInputDateValue,
    onDateBottomSheetButton,
  };
};
