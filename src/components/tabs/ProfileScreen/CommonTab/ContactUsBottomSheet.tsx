import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheet, Button, Text } from 'rn-ui-kit';

import { configApp } from '@/constants/platform';

type ContactUsBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  onCopy: () => void;
};
export const ContactUsBottomSheet: FC<ContactUsBottomSheetProps> = ({
  isVisible,
  onClose,
  onCopy,
}) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
    >
      <View style={styles.container}>
        <Text variant="bodySRegular">
          Для связи со службой поддержки напишите нам письмо по адресу:
        </Text>
        <Text variant="bodyMBold">info@mastera-service.ru</Text>
        <Button
          label="Скопировать адрес почты"
          style={styles.button}
          onPress={onCopy}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    ...(configApp.android && { paddingBottom: 21 }),
  },
  button: { marginTop: 24 },
});
