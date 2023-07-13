import { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardHeight = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const onKeyboardShow = event =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef(0);
  const keyboardDidHideListener = useRef(0);

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, [keyboardOffset]);

  return { keyboardOffset };
};
