import ModalScreen from '../../ModalScreen';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

const ModalComponentScreen = ({
  visible,
  label,
  textBtn,
  onPress,
  flag = false,
}) => {
  return (
    <ModalScreen visible={visible}>
      <Text style={[styles.titleInfo, flag && styles.titleInfoPhone]}>
        {label}
      </Text>
      <View style={[styles.containerBtn, flag && styles.containerBtnPhone]}>
        <TouchableOpacity style={styles.btnClose} onPress={onPress}>
          <Text style={[styles.textBtn, flag && styles.textBtnPhone]}>
            {textBtn}
          </Text>
        </TouchableOpacity>
      </View>
    </ModalScreen>
  );
};

export default ModalComponentScreen;
