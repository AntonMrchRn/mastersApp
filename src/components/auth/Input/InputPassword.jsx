import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './style';

export const InputPassword = ({ password, setPassword }) => {
  const [active, setActive] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  return (
    <View style={[styles.container, active && styles.activeInput]}>
      <>
        <TextInput
          style={styles.inputBasic}
          placeholder={'Пароль'}
          placeholderTextColor={'#5e5e5e'}
          value={password}
          onChangeText={text => setPassword(text)}
          maxLength={16}
          onPressIn={() => setActive(true)}
          onEndEditing={() => setActive(false)}
          secureTextEntry={isShowPassword}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setIsShowPassword(!isShowPassword)}
        >
          <Image
            source={
              isShowPassword
                ? require('../../../assets/icons/hideEye.png')
                : require('../../../assets/icons/Eye.png')
            }
            style={styles.iconPassword}
          />
        </TouchableOpacity>
      </>
    </View>
  );
};
