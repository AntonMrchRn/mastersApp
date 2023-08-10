import { Dimensions, Platform } from 'react-native';

import { DefaultTheme } from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const hitSlop = { top: 10, left: 10, right: 10, bottom: 10 };

const platform = Platform.OS;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const configApp = {
  // system
  ios: platform === 'ios',
  android: platform === 'android',

  platform,
  // Color
  brandColor: '#3f51b5',
  brandActive: '#FF0089',
  brandLight: '#ebf0f9',
  tabBarActiveColor: '#59ad40',
  tabBarInactiveColor: '#2e2e2e',
  gray: '#383838',
  disabled: '#d6d6e1',
  error: '#ffefe6',
  lightGray: '#757575',
  darkGray: '#292929',
  //errors
  deviceWidth,
  deviceHeight,

  shadow: {
    shadowColor: 'rgba(2, 52, 227, 0.12)',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
};

export { MyTheme, configApp, deviceHeight, deviceWidth, hitSlop };
