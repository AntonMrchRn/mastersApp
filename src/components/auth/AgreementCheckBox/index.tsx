import React from 'react';
import { Keyboard, Linking, Text, TouchableOpacity, View } from 'react-native';

import CheckBoxActive from '@/assets/icons/svg/auth/CheckBoxActive';
import CheckBoxDisabled from '@/assets/icons/svg/auth/CheckBoxDisabled';

import styles from './style';

enum URL {
  agreement = 'https://mastera-service.ru/docs/user-agreement.pdf',
  personalData = 'https://mastera-service.ru/docs/personal-data-policy.pdf',
  offer = 'https://mastera-service.ru/docs/public-offer.pdf',
}

type AgreementCheckBoxProps = {
  value: boolean;
  setValue: (isCheckBoxChanged: boolean) => void;
};

const AgreementCheckBox = ({ value, setValue }: AgreementCheckBoxProps) => {
  const openLink = (url: URL) => {
    Linking.openURL(url);
  };

  const onPress = () => {
    Keyboard.dismiss();
    setValue(!value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.wrapperCheckBox, value && styles.active]}>
          {!value ? <CheckBoxDisabled /> : <CheckBoxActive />}
        </View>
      </TouchableOpacity>
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
