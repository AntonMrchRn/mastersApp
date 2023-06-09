import { useState } from 'react';

export const useTaskCardDescription = () => {
  const [dateTo, setDateTo] = useState('2023-04-17');
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
    setDateTo(currentDate);
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
