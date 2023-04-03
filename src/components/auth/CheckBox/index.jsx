import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import { configApp } from '../../../utils/helpers/platform';
import { styles } from './style';

const CheckBoxAgreement = ({ valueCheckBox, setChangeCheckBox }) => {
  const open = () => {
    let url = 'https://mastera-service.ru/docs/personal-data-policy.pdf';
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <View style={[styles.wrapperCheckBox, valueCheckBox && styles.active]}>
          <CheckBox
            disabled={false}
            value={valueCheckBox}
            onValueChange={newValue => setChangeCheckBox(newValue)}
            style={styles.checkBox}
            hideBox
            onCheckColor={configApp.brandColor}
          />
        </View>
      ) : (
        <View
          style={[
            styles.wrapperCheckBoxAndroid,
            valueCheckBox && styles.activeAndroid,
          ]}
        >
          <CheckBox
            disabled={false}
            value={valueCheckBox}
            onValueChange={newValue => setChangeCheckBox(newValue)}
            style={styles.checkBoxAndroid}
            hideBox
          />
        </View>
      )}
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => open()}>
          <View style={styles.wrapperTitleTop}>
            <Text style={styles.title}>Даю согласие на обработку</Text>
          </View>
          <View style={styles.wrapperTitleBottom}>
            <Text style={styles.title}>персональных данных</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckBoxAgreement;
