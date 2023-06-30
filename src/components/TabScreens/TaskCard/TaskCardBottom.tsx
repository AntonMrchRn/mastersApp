import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Banner, Button } from 'rn-ui-kit';
import { IconTypes, Types } from 'rn-ui-kit/lib/typescript/components/Banner';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Button';

export type TaskCardBottomBanner = {
  title: string;
  type: Types;
  icon: IconTypes;
  text: string;
} | null;
export type TaskCardBottomButton = {
  label: string;
  variant: Variant;
  onPress?: () => void;
  disabled?: boolean;
};
type TaskCardBottomProps = {
  banner: TaskCardBottomBanner;
  buttons: TaskCardBottomButton[];
};
export const TaskCardBottom: FC<TaskCardBottomProps> = ({
  banner,
  buttons,
}) => {
  const styles = StyleSheet.create({
    container: {
      gap: 16,
    },
  });
  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <Button
          onPress={button.onPress}
          key={index}
          label={button.label}
          variant={button.variant}
          disabled={button.disabled}
        />
      ))}
      {banner && (
        <Banner
          type={banner.type}
          icon={banner.icon}
          text={banner.text}
          title={banner.title}
        />
      )}
    </View>
  );
};
