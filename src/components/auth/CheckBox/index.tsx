import React from 'react';
import { Keyboard, Linking, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import CheckBoxDisabled from '../../../assets/icons/svg/auth/CheckBoxDisabled';
import CheckBoxActive from '../../../assets/icons/svg/auth/CheckBoxActive';

type CheckBoxProps = {
  valueCheckBox: boolean;
  setChangeCheckBox: any;
};

export const CheckBoxAgreement = ({
  valueCheckBox,
  setChangeCheckBox,
}: CheckBoxProps) => {
  const openAgreement = () => {
    let url = 'https://mastera-service.ru/docs/user-agreement.pdf';
    Linking.openURL(url);
  };
  const openPersonalData = () => {
    let url = 'https://mastera-service.ru/docs/personal-data-policy.pdf';
    Linking.openURL(url);
  };
  const openOffer = () => {
    let url = 'https://mastera-service.ru/docs/public-offer.pdf';
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setChangeCheckBox(!valueCheckBox);
        }}
      >
        <View style={[styles.wrapperCheckBox, valueCheckBox && styles.active]}>
          {!valueCheckBox ? <CheckBoxDisabled /> : <CheckBoxActive />}
        </View>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Выражаю{' '}
          <Text style={styles.titlePress} onPress={() => openAgreement()}>
            согласие
          </Text>{' '}
          с условиями обработки{' '}
          <Text style={styles.titlePress} onPress={() => openPersonalData()}>
            персональных данных
          </Text>{' '}
          и{' '}
          <Text style={styles.titlePress} onPress={() => openOffer()}>
            офертой
          </Text>{' '}
        </Text>
      </View>
    </View>
  );
};

export default CheckBoxAgreement;
