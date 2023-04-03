import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Image } from 'react-native';

const IconChecked = require('../../../assets/icons/checkMark.png');

export const CheckBoxAgreement = ({ valueCheckBox, setChangeCheckBox }) => {
  const open = () => {
    let url = 'https://mastera-service.ru/docs/personal-data-policy.pdf';
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
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => open()}>
          <View style={styles.wrapperTitleTop}>
            <Text style={styles.title}>
              Даю согласие на обработку персональных данных
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckBoxAgreement;
