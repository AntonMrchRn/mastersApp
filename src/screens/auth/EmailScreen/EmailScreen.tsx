import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import ConfrimPreviewEmail from '../../../components/auth/ConfirmPreviewEmail/ConfirmPreviewEmail';
import LogoPreview from '../../../components/auth/LogoPreview';

import Header from '../../../components/Header/Header';
import { clearRecoveryError } from '../../../redux/slices/auth/reducer';

import { styles } from './style';

export const EmailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goBack = () => {
    dispatch(clearRecoveryError());
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header label={''} callBack={goBack} />
      <View style={styles.wrapperSignIn}>
        <LogoPreview label="Восстановление пароля" height={135} />
        <ConfrimPreviewEmail />
      </View>
    </SafeAreaView>
  );
};
