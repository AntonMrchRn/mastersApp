import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import ArrowRightIcon from '@/assets/icons/svg/screens/ArrowRightIcon';

import styles from './style';

type UserInfoBlockProps = {
  info: string;
  label?: string;
  onPress?: () => void;
  isLoading?: boolean;
  isPressable?: boolean;
  iconType?: 'arrow' | 'plus';
};

const UserInfoBlock = ({
  info,
  label,
  onPress,
  iconType = 'arrow',
  isLoading = false,
  isPressable = false,
}: UserInfoBlockProps) => {
  const theme = useTheme();
  const icons = {
    arrow: <ArrowRightIcon fill={theme.icons.basic} />,
    plus: <PlusIcon fill={theme.icons.basic} size={24} />,
  };

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        disabled={!isPressable}
        style={[
          styles.container,
          isPressable && styles.pressableContainer,
          isLoading && { justifyContent: 'center' },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={styles.textContainer}>
              {label && (
                <>
                  <Text variant="captionRegular" color={theme.text.neutral}>
                    {label}
                  </Text>
                  <Spacer size="xs" />
                </>
              )}
              <Text variant="bodyMRegular">{info}</Text>
            </View>
            {isPressable && (
              <TouchableOpacity style={styles.arrow} onPress={onPress}>
                {icons[iconType]}
              </TouchableOpacity>
            )}
          </>
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
