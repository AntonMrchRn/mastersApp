import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';

import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

import { styles } from './styles';

type AccessRestrictedScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.AccessRestricted
>;
export const AccessRestrictedScreen: FC<AccessRestrictedScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PreviewNotFound type={PreviewNotFoundType.AccessRestricted} />
    </SafeAreaView>
  );
};
