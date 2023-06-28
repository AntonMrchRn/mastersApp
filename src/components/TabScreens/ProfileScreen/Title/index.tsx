import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import styles from './style';

type TitleProps = {
  title: string;
  withButton?: boolean;
  icon?: ReactElement;
  buttonLabel?: string;
  onPress?: () => void;
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
      <Text variant="title3">{title}</Text>
      {withButton && (
        <>
          <Spacer size="l" horizontal />
          <Button
            style={[styles.btn, { backgroundColor: theme.background.main }]}
            icon={icon}
            onPress={onPress}
            label={buttonLabel}
            labelStyle={[
              styles.label,
              {
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
