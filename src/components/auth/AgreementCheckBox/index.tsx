import React from 'react';
import { useController } from 'react-hook-form';
import { Keyboard, Linking, Text, View } from 'react-native';

import { CheckBox } from 'rn-ui-kit';

import CheckBoxActive from '@/assets/icons/svg/auth/CheckBoxActive';

import styles from './style';

enum URL {
  agreement = 'https://mastera-service.ru/docs/user-agreement.pdf',
  personalData = 'https://mastera-service.ru/docs/personal-data-policy.pdf',
  offer = 'https://mastera-service.ru/docs/public-offer.pdf',
}

const AgreementCheckBox = () => {
  const { field } = useController({
    name: 'isAgreeWithTerms',
  });

  const openLink = (url: URL) => {
    Linking.openURL(url);
  };

  const onPress = () => {
    Keyboard.dismiss();
    field.onChange(!field.value);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        onPress={onPress}
        checked={field.value}
        icon={<CheckBoxActive />}
        style={[styles.checkBox, field.value && styles.active]}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Выражаю{' '}
          <Text
            style={styles.titlePress}
            onPress={() => openLink(URL.agreement)}
          >
            согласие
          </Text>{' '}
          с условиями обработки{' '}
          <Text
            style={styles.titlePress}
            onPress={() => openLink(URL.personalData)}
          >
            персональных данных
          </Text>{' '}
          и{' '}
          <Text style={styles.titlePress} onPress={() => openLink(URL.offer)}>
            офертой
          </Text>{' '}
        </Text>
      </View>
    </View>
  );
};

export default AgreementCheckBox;
