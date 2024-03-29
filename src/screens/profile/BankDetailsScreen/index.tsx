import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Spacer, Text } from 'rn-ui-kit';

import Header from '@/components/Header';
import ControlledInput from '@/components/inputs/ControlledInput';
import useBankDetails from '@/screens/profile/BankDetailsScreen/useBankDetails';

import styles from './style';

const BankDetailsScreen = () => {
  const { errors, methods, isLoading, isDisabled, onSave } = useBankDetails();

  return (
    <View style={styles.container}>
      <Header title="Банковские реквизиты" />
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text variant="title3" style={styles.title}>
            Заполните данные вашего банка
          </Text>
          <FormProvider {...methods}>
            <ControlledInput
              name="bankName"
              variant="text"
              maxLength={100}
              autoCapitalize="none"
              style={styles.input}
              label="Полное наименование банка"
              hint={errors.bankName?.message}
              isError={!!errors.bankName?.message}
              onSubmitEditing={() => methods.setFocus('checkingAccount')}
            />
            <Spacer size="l" />
            <ControlledInput
              variant="text"
              maxLength={20}
              autoCapitalize="none"
              style={styles.input}
              name="checkingAccount"
              label="Счет получателя"
              keyboardType="number-pad"
              hint={errors.checkingAccount?.message}
              isError={!!errors.checkingAccount?.message}
              onSubmitEditing={() => methods.setFocus('bankID')}
            />
            <Spacer size="l" />
            <ControlledInput
              label="БИК"
              name="bankID"
              variant="text"
              maxLength={9}
              autoCapitalize="none"
              style={styles.input}
              keyboardType="number-pad"
              hint={errors.bankID?.message}
              isError={!!errors.bankID?.message}
              onSubmitEditing={() => methods.setFocus('correspondingAccount')}
            />
            <Spacer size="l" />
            <ControlledInput
              variant="text"
              maxLength={20}
              label="Корр. счет"
              autoCapitalize="none"
              style={styles.input}
              keyboardType="number-pad"
              name="correspondingAccount"
              hint={errors.correspondingAccount?.message}
              isError={!!errors.correspondingAccount?.message}
            />
            <Spacer size="xl" />
            <Button
              label="Сохранить"
              style={styles.btn}
              disabled={isDisabled}
              isPending={isLoading}
              onPress={onSave}
            />
          </FormProvider>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default BankDetailsScreen;
