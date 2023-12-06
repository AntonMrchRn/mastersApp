import React, { FC, useRef } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';

import { StackScreenProps } from '@react-navigation/stack';

import FirstResponse from '@/assets/icons/svg/onboarding/FirstResponse';
import Lots from '@/assets/icons/svg/onboarding/Lots';
import Team from '@/assets/icons/svg/onboarding/Team';
import { OnBoardingItem } from '@/components/auth/OnBoardingItem';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

import { styles } from './styles';

type OnboardingScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.OnboardingScreen
>;
export const OnboardingScreen: FC<OnboardingScreenProps> = () => {
  const list = [
    {
      id: 1,
      icon: <FirstResponse />,
    },
    {
      id: 2,
      icon: <Lots />,
    },
    {
      id: 3,
      icon: <Team />,
    },
  ];

  const swRef = useRef<PagerView>(null);

  const onNextPress = (index: number) => {
    swRef?.current?.setPage(index + 1);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4FA5F4', '#243AB4', '#20308B']}
        style={styles.linearGradient}
      >
        <PagerView initialPage={0} style={styles.pagerView} ref={swRef}>
          {list.map((item, index, array) => (
            <OnBoardingItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === array?.length - 1}
              onPress={onNextPress}
            />
          ))}
        </PagerView>
      </LinearGradient>
    </View>
  );
};
