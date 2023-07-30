import React, { JSX } from 'react';

import { Button, Spacer, useTheme } from 'rn-ui-kit';

import styles from './style';

type ActionButtonProps = {
  label: string;
  icon: JSX.Element;
  onPress: () => void;
};

const ActionButton = ({ label, onPress, icon }: ActionButtonProps) => {
  const theme = useTheme();

  return (
    <>
      <Button
        icon={icon}
        label={label}
        variant="ghost"
        onPress={onPress}
        style={styles.btn}
        labelStyle={styles.btnLabel}
      />
      <Spacer
        size="xs"
        separator="bottom"
        separatorColor={theme.background.neutralDisableSecond}
      />
    </>
  );
};

export default ActionButton;
