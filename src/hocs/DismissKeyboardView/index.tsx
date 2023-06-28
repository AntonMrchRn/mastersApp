import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

const DismissKeyboardHOC = (Component: React.ComponentType) => {
  const Wrapper = ({ ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Component {...props} />
    </TouchableWithoutFeedback>
  );

  return Wrapper;
};

export const DismissKeyboardView = DismissKeyboardHOC(View);
