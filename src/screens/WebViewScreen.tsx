import React, { FC } from 'react';
import WebView from 'react-native-webview';

import { StackScreenProps } from '@react-navigation/stack';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

type WebViewScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.WebView
>;
export const WebViewScreen: FC<WebViewScreenProps> = ({
  navigation,
  route,
}) => {
  return <WebView source={{ uri: route.params.uri }} style={{ flex: 1 }} />;
};
