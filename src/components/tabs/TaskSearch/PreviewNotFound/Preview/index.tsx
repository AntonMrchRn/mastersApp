import React, { JSX } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import styles from './style';

type PreviewProps = {
  text: string;
  title: string;
  icon: JSX.Element;
  button?: JSX.Element;
};

const Preview = ({ text, icon, title, button }: PreviewProps) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapperNotFound}>
      {icon}
      <Spacer size="xl" />
      <Text variant="title2">{title}</Text>
      <Spacer />
      <Text
        style={styles.text}
        variant="bodySRegular"
        color={theme.text.neutral}
      >
        {text}
      </Text>
      {button && (
        <>
          <Spacer size="xl" />
          {button}
        </>
      )}
    </View>
  );
};

export default Preview;
