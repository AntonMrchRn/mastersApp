import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Text, TextInput, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { configApp } from '../../../utils/helpers/platform';
import { styles } from './style';

export const Input = ({
  isPhoneAuth,
  tel,
  setTel,
  email,
  setMail,
  setScrollHeight,
  setKeyActive,
}) => {
  const [active, setActive] = useState(false);
  const [type, setType] = useState('numeric');

  useEffect(() => {
    const telText = tel.replace(/[\D]+/g, '');
    if (
      (telText[0] === '7' && telText[1] === '9') ||
      (telText[0] === '8' && telText[1] === '9')
    ) {
      setTel(telText.replace(/^[0-8]/, ''));
    }
    if (telText?.length < 2) {
      setTel(telText.replace(/^[0-8]/, `9${tel}`));
    }
    //89286299031
  }, [tel]);

  return (
    <View
      style={[
        isPhoneAuth ? styles.container : styles.containerEmail,
        active && styles.activeInput,
      ]}
    >
      {isPhoneAuth ? (
        <>
          <Image
            source={require('../../../assets/icons/flag.png')}
            style={styles.icon}
          />
          <Text style={styles.prefixPhone}>+7</Text>
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(999) 999-99-99',
            }}
            style={styles.inputBasic}
            placeholder={'(900) 000-00-00'}
            placeholderTextColor={'#5e5e5e'}
            keyboardType={configApp.ios ? type : 'numeric'}
            maxLength={15}
            value={tel}
            onChangeText={text => setTel(text)}
            onPressIn={() => setActive(true)}
            onEndEditing={() => setActive(false)}
            onFocus={() => {
              setType('numeric');
              setKeyActive(true);
              Keyboard.isVisible();
              setScrollHeight(275);
            }}
            onBlur={() => {
              setType('default');
              setKeyActive(false);
              Keyboard.isVisible();
              setScrollHeight(prev => (prev == 275 ? 275 : 215));
            }}
          />
        </>
      ) : (
        <TextInput
          style={styles.inputBasicEmail}
          placeholder={'Email'}
          keyboardType="email-address"
          placeholderTextColor={'#5e5e5e'}
          maxLength={60}
          value={email}
          onChangeText={text => setMail(text)}
          onPressIn={() => setActive(true)}
          onEndEditing={() => setActive(false)}
          autoCapitalize="none"
          onFocus={() => {
            Keyboard.isVisible();
            setScrollHeight(275);
          }}
          onBlur={() => {
            Keyboard.isVisible();
            setScrollHeight(215);
          }}
        />
      )}
    </View>
  );
};
