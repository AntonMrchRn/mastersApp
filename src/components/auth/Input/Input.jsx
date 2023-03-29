import React, { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { styles } from './style';

export const Input = ({ isPhoneAuth, tel, setTel, email, setMail }) => {
  const [active, setActive] = useState(false);

  return (
    <View style={[styles.container, active && styles.activeInput]}>
      {isPhoneAuth ? (
        <>
          <Image
            source={require('../../../assets/icons/flag.png')}
            style={styles.icon}
          />
          <Text style={styles.prefixPhone}>+7</Text>
          <TextInputMask
            style={styles.inputBasic}
            placeholder={'(900) 000-00-00'}
            keyboardType="numeric"
            placeholderTextColor={'#5e5e5e'}
            maxLength={14}
            onPressIn={() => setActive(true)}
            onEndEditing={() => setActive(false)}
            mask={'([000]) [000]-[00]-[00]'}
            onChangeText={value => {
              setTel(value.replace(/[\D]+/g, ''));
            }}
          />
        </>
      ) : (
        <TextInput
          style={styles.inputBasic}
          placeholder={'Email'}
          keyboardType="email-address"
          placeholderTextColor={'#5e5e5e'}
          maxLength={60}
          value={email}
          onChangeText={text => setMail(text)}
          onPressIn={() => setActive(true)}
          onEndEditing={() => setActive(false)}
        />
      )}
    </View>
  );
};
