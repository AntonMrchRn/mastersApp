import { Dimensions, Platform } from 'react-native';

import { DefaultTheme } from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === 'ios' &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 844 ||
    deviceWidth === 844 ||
    deviceHeight === 896 ||
    deviceWidth === 896 ||
    deviceHeight === 926 ||
    deviceWidth === 926);

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
  platformStyle,
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
  isIphoneX,

  shadow:
    platform === 'ios'
      ? {
          shadowColor: 'rgba(2, 52, 227, 0.12)',
          shadowOffset: {
            width: 0,
            height: -6,
          },
          shadowOpacity: 0.6,
          shadowRadius: 4,
          elevation: 2,
        }
      : {
          shadowColor: 'rgba(2, 52, 227, 0.12)',
          shadowOffset: {
            width: 0,
            height: -6,
          },
          shadowOpacity: 0.6,
          shadowRadius: 4,
          elevation: 2,
        },
};

export { MyTheme, configApp, deviceHeight, deviceWidth };
