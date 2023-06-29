import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import ArrowRightIcon from '@/assets/icons/svg/screens/ArrowRightIcon';

import styles from './style';

type UserInfoBlockProps = {
  info: string;
  label: string;
  onPress?: () => void;
  isPressable?: boolean;
};

const UserInfoBlock = ({
  info,
  label,
  onPress,
  isPressable = false,
}: UserInfoBlockProps) => {
  const theme = useTheme();

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        disabled={!isPressable}
        style={[styles.container, isPressable && styles.pressableContainer]}
      >
        <View>
          <Text variant="captionRegular" color={theme.text.neutral}>
            {label}
          </Text>
          <Spacer size="xs" />
          <Text variant="bodyMRegular">{info}</Text>
        </View>
        {isPressable && (
          <TouchableOpacity style={styles.arrow}>
            <ArrowRightIcon fill={theme.icons.basic} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Spacer
        separator="bottom"
        separatorColor={theme.background.neutralDisableSecond}
      />
    </>
  );
};

export default UserInfoBlock;
