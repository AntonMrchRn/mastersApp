import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Spacer } from 'rn-ui-kit';

import ControlledInput from '@/components/ControlledInput';
import Header from '@/components/Header';
import Title from '@/components/TabScreens/ProfileScreen/Title';
import { DismissKeyboardView } from '@/hocs/DismissKeyboardView';
import usePersonalDataEditing from '@/screens/tabs/PersonalDataEditingScreen/usePersonalDataEditing';

import styles from './style';

const PersonalDataEditingScreen = () => {
  const { errors, methods, isLoading, editData } = usePersonalDataEditing();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Персональные данные" />
      <DismissKeyboardView>
        <View style={styles.content}>
          <Spacer size="xl" />
          <Title title="Заполните данные" />
          <Spacer size="xl" />
          <FormProvider {...methods}>
            <ControlledInput
              name="sname"
              variant="text"
              label="Фамилия"
              maxLength={60}
              isAnimatedLabel
              style={styles.input}
              autoCapitalize="none"
              isError={!!errors.sname?.message}
              hint={errors.sname?.message}
              onSubmitEditing={() => methods.setFocus('name')}
            />
            <Spacer size="l" />
            <ControlledInput
              name="name"
              label="Имя"
              variant="text"
              maxLength={60}
              isAnimatedLabel
              style={styles.input}
              autoCapitalize="none"
              isError={!!errors.name?.message}
              hint={errors.name?.message}
              onSubmitEditing={() => methods.setFocus('pname')}
            />
            <Spacer size="l" />
            <ControlledInput
              name="pname"
              variant="text"
              maxLength={60}
              label="Отчество"
              isAnimatedLabel
              style={styles.input}
              autoCapitalize="none"
              isError={!!errors.pname?.message}
              hint={errors.pname?.message}
            />
            <Spacer size="xl" />
            <Button
              label="Сохранить"
              isPending={isLoading}
              onPress={editData}
            />
          </FormProvider>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default PersonalDataEditingScreen;
