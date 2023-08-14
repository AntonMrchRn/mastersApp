import React, { JSX } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { PreviewNotFoundType } from '@/components/tabs/TaskSearch/PreviewNotFound';

import styles from './style';

type PreviewProps = {
  text?: string;
  title: string;
  icon: JSX.Element;
  type: PreviewNotFoundType;
  button?: JSX.Element;
};

const Preview = ({ text, icon, title, button, type }: PreviewProps) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapperNotFound}>
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: [
              PreviewNotFoundType.TasksNotAvailable,
              PreviewNotFoundType.ServiceNotFound,
            ].includes(type)
              ? theme.background.fieldDanger
              : theme.background.fieldMain,
          },
        ]}
      >
        {icon}
      </View>
      <Spacer size="xl" />
      <Text variant="title2">{title}</Text>
      <Spacer />
      {text && (
        <Text
          style={styles.text}
          variant="bodySRegular"
          color={theme.text.neutral}
        >
          {text}
        </Text>
      )}
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
