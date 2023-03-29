import React from 'react';
import { Text, View } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { styles } from './style';

const CELL_COUNT = 6;

const CodeFieldInput = ({ value, setValue }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={val => {
          setValue(val.replace(/[\D]+/g, ''));
        }}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.wrapper, isFocused && styles.focusWrapper]}
          >
            <Text style={styles.cell} onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused && <Cursor cursorSymbol="|" />)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CodeFieldInput;
