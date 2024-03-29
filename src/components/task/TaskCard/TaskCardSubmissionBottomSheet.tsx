import React, { FC } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomSheet, Button, Text, useTheme } from 'rn-ui-kit';

import { configApp } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

type TaskCardSubmissionBottomSheetProps = {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};
export const TaskCardSubmissionBottomSheet: FC<
  TaskCardSubmissionBottomSheetProps
> = ({ isVisible, onCancel, onSubmit }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const navigation =
    useNavigation<
      StackNavigationProp<AppStackParamList, AppScreenName.TaskCard>
    >();

  const url =
    'https://mastera-service.ru/docs/agreement-of-electronic-document-management.pdf';

  const onPress = async () => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      onCancel();
      navigation.navigate(AppScreenName.WebView, { uri: url });
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onSwipeComplete={onCancel}
      onBackdropPress={onCancel}
      backdropTransitionOutTiming={0}
      containerStyle={{ paddingBottom: configApp.android ? 20 : insets.bottom }}
    >
      <View style={styles.mt28}>
        <Text variant="bodySRegular" color={theme.text.basic}>
          Участвуя в задаче, вы принимаете{' '}
          <Text
            variant="bodySRegular"
            color={theme.text.accent}
            onPress={onPress}
          >
            Соглашение об использовании простой электронной подписи.{' '}
          </Text>
          При оплате задачи мы формируем акт оказания услуг, подписанный ПЭП
          исполнителя
        </Text>
        <View style={styles.buttons}>
          <Button
            size="M"
            variant="outlineAccent"
            label="Отмена"
            onPress={onCancel}
          />
          <Button
            size="M"
            variant="accent"
            label="С условиями согласен"
            onPress={onSubmit}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 24,
    gap: 16,
  },
  mt28: {
    marginTop: 28,
  },
});
