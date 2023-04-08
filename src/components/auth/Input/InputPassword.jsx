import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Eye from '../../svg/auth/Eye';
import HideEye from '../../svg/auth/HideEye';

import { styles } from './style';

export const InputPassword = ({
  password,
  setPassword,
  setScrollHeight = 215,
}) => {
  const [active, setActive] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  return (
    <View style={[styles.containerPassword, active && styles.activeInput]}>
      <>
        <TextInput
          style={styles.inputBasicPassword}
          placeholder={'Пароль'}
          placeholderTextColor={'#5e5e5e'}
          value={password}
          maxLength={64}
          onChangeText={text => setPassword(text)}
          onPressIn={() => setActive(true)}
          onEndEditing={() => setActive(false)}
          secureTextEntry={isShowPassword}
          autoCapitalize="none"
          onFocus={() => setScrollHeight(215)}
          onBlur={() => setScrollHeight(275)}
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setIsShowPassword(!isShowPassword)}
        >
          <View style={styles.iconPassword}>
            {isShowPassword ? <HideEye /> : <Eye />}
          </View>
        </TouchableOpacity>
      </>
    </View>
  );
};
