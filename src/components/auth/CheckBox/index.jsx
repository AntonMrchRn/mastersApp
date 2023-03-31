import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
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
          />
        </View>
      ) : (
        <CheckBox
          disabled={false}
          value={valueCheckBox}
          onValueChange={newValue => setChangeCheckBox(newValue)}
          style={styles.checkBox}
          hideBox
        />
      )}
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => open()}>
          <Text style={styles.title}>Даю согласие на обработку</Text>
          <Text style={styles.title}>персональных данных</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckBoxAgreement;
