import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Banner, Button } from 'rn-ui-kit';
import { BannerProps } from 'rn-ui-kit/lib/typescript/components/Banner';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Button';

import { configApp } from '@/constants/platform';

export type TaskCardBottomButton = {
  label: string;
  variant: Variant;
  onPress?: () => void;
  disabled?: boolean;
};
type TaskCardBottomProps = {
  banner: BannerProps | null;
  buttons: TaskCardBottomButton[];
};
export const TaskCardBottom: FC<TaskCardBottomProps> = ({
  banner,
  buttons,
}) => {
  const styles = StyleSheet.create({
    container: {
      gap: 8,
    },
  });
  return (
    <>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.00)', '#FFF']}
        locations={[0, 0.6]}
      >
        <View style={styles.container}>
          {banner && <Banner {...banner} />}
          {buttons.map((button, index) => (
            <Button
              onPress={button.onPress}
              key={index}
              label={button.label}
              variant={button.variant}
              disabled={button.disabled}
            />
          ))}
        </View>
      </LinearGradient>
      <View
        style={{
          height: configApp.android ? 24 : 0,
          backgroundColor: 'transparent',
        }}
      />
    </>
  );
};
