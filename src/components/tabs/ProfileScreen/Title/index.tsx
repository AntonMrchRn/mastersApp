import React, { ReactElement } from 'react';
import { TextStyle, View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import styles from './style';

type TitleProps = {
  title: string;
  withButton?: boolean;
  buttonLabel?: string;
  onPress?: () => void;
  titleStyle?: TextStyle;
  icon?: ReactElement | boolean;
};

const Title = ({
  title,
  icon,
  onPress,
  buttonLabel,
  titleStyle,
  withButton = false,
}: TitleProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="title3" style={[styles.title, titleStyle]}>
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
