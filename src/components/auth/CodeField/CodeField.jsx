import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { configApp } from '../../../utils/helpers/platform';
import { styles } from './style';

const CELL_COUNT = 6;

const CodeFieldInput = ({ value, setValue, onSubmitEditing, onFocus }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value?.length === 6) {
      onSubmitEditing();
    }
  }, [value]);

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={val => {
          setValue(val.replace(/[\D]+/g, ''));
        }}
        onFocus={onFocus}
        cellCount={CELL_COUNT}
        keyboardType={'number-pad'}
        textContentType="oneTimeCode"
        autoCapitalize="none"
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
