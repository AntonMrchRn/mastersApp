import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError } from '../../../redux/slices/auth/reducer';
import { ErrorField } from '../../ErrorField/ErrorFiled';
import { styles } from './style';

const CELL_COUNT = 6;

const CodeFieldInput = ({ value, setValue, onSubmitEditing, onFocus }: any) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { authError, authErrorCode } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (value?.length === 6) {
      onSubmitEditing();
    }
    if (authErrorCode === 20005) {
      dispatch(clearAuthError(null));
    }
  }, [value]);

  return (
    <View style={styles.content}>
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
          renderCell={({ index, symbol, isFocused }) => {
            return (
              <View style={styles.container} key={index}>
                {symbol?.length > 0 ? (
                  <View key={index} style={styles.wrapper}>
                    <Text
                      style={styles.cell}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused && <Cursor cursorSymbol="|" />)}
                    </Text>
                  </View>
                ) : (
                  <View key={index} style={styles.wrapperСircle} />
                )}
              </View>
            );
          }}
        />
      </View>
      <View style={styles.bottomWrapper}>
        {authErrorCode === 20005 && <ErrorField error={authError} />}
      </View>
    </View>
  );
};

export default CodeFieldInput;
