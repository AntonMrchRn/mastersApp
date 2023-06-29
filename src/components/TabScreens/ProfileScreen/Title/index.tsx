import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { scaleFontSize } from '@/utils/scale';

import styles from './style';

type TitleProps = {
  title: string;
  withButton?: boolean;
  buttonLabel?: string;
  onPress?: () => void;
  icon?: ReactElement | boolean;
};

const Title = ({
  title,
  icon,
  onPress,
  buttonLabel,
  withButton = false,
}: TitleProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        variant="title3"
        style={{
          fontSize: scaleFontSize(20),
        }}
      >
        {title}
      </Text>
      {withButton && (
        <>
          <Spacer size="l" horizontal />
          <Button
            style={[styles.btn, { backgroundColor: theme.background.main }]}
            icon={icon}
            onPress={onPress}
            size="S"
            label={buttonLabel}
            variant="ghost"
            labelStyle={[
              styles.label,
              {
                fontSize: scaleFontSize(15),
                color: theme.text.basic,
              },
            ]}
          />
        </>
      )}
    </View>
  );
};

export default Title;
