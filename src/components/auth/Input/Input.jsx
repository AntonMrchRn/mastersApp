import React, { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { useMaskedInputProps, Masks } from 'react-native-mask-input';
import { styles } from './style';

export const Input = ({ isPhoneAuth, tel, setTel, email, setMail }) => {
  const [active, setActive] = useState(false);

  const phoneMaskedInputProps = useMaskedInputProps({
    value: tel,
    onChangeText: (_, unmasked) => setTel(unmasked),
    mask: Masks.USA_PHONE,
    placeholderFillCharacter: '0',
  });

  return (
    <View style={[styles.container, active && styles.activeInput]}>
      {isPhoneAuth ? (
        <>
          <Image
            source={require('../../../assets/icons/flag.png')}
            style={styles.icon}
          />
          <Text style={styles.prefixPhone}>+7</Text>
          <TextInput
            style={styles.inputBasic}
            placeholder={'900-000-00-00'}
            keyboardType="numeric"
            placeholderTextColor={'#5e5e5e'}
            maxLength={14}
            onPressIn={() => setActive(true)}
            onEndEditing={() => setActive(false)}
            {...phoneMaskedInputProps}
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
