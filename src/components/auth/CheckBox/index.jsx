import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Image } from 'react-native';

const IconChecked = require('../../../assets/icons/checkMark.png');

export const CheckBoxAgreement = ({ valueCheckBox, setChangeCheckBox }) => {
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
  const Icon = ({ valueCheckBox }) => {
    if (valueCheckBox) {
      return <Image source={IconChecked} style={styles.checkBox} />;
    }
    if (!valueCheckBox) {
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setChangeCheckBox(!valueCheckBox)}>
        <View style={[styles.wrapperCheckBox, valueCheckBox && styles.active]}>
          <Icon
            valueCheckBox={valueCheckBox}
            setChangeCheckBox={setChangeCheckBox}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Нажимая "Войти", вы выражаетe{' '}
          <Text style={styles.titlePress} onPress={() => openAgreement()}>
            согласие
          </Text>{' '}
          с условиями обработки{' '}
          <Text style={styles.titlePress} onPress={() => openPersonalData()}>
            Персональных данных
          </Text>{' '}
          и{' '}
          <Text style={styles.titlePress} onPress={() => openOffer()}>
            Офертой
          </Text>{' '}
        </Text>
      </View>
    </View>
  );
};

export default CheckBoxAgreement;
