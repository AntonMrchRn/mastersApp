import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import ErrorField from '@/components/ErrorField';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearAuthError } from '@/store/slices/auth/actions';
import { selectAuth } from '@/store/slices/auth/selectors';
import { ErrorCode } from '@/types/error';

import styles from './style';

const CELL_COUNT = 6;

type CodeFieldInputProps = {
  value: string;
  onFocus: () => void;
  onSubmitEditing: () => void;
  setValue: (value: string) => void;
};

const CodeFieldInput = ({
  value,
  onFocus,
  setValue,
  onSubmitEditing,
}: CodeFieldInputProps) => {
  const { authError, authErrorCode } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value?.length === 6) {
      onSubmitEditing();
    }
    if (authErrorCode === ErrorCode.IncorrectVerificationCode) {
      dispatch(clearAuthError(null));
    }
  }, [value]);

  const onChangeText = (value: string) => {
    setValue(value.replace(/[\D]+/g, ''));
  };

  return (
    <View style={styles.content}>
      <View style={styles.root}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={onChangeText}
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
                  <View key={index} style={styles.wrapperCircle} />
                )}
              </View>
            );
          }}
        />
      </View>
      <View style={styles.bottomWrapper}>
        {authErrorCode === ErrorCode.IncorrectVerificationCode && (
          <ErrorField error={authError} />
        )}
      </View>
    </View>
  );
};

export default CodeFieldInput;
