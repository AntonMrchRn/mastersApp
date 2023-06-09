import React, { FC } from 'react';

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
};
type TaskCardBottomProps = {
  banner: TaskCardBottomBanner;
  buttons: TaskCardBottomButton[];
};
export const TaskCardBottom: FC<TaskCardBottomProps> = ({
  banner,
  buttons,
}) => {
  return (
    <>
      {buttons.map((button, index) => (
        <Button
          onPress={button.onPress}
          key={index}
          label={button.label}
          variant={button.variant}
          style={index !== 0 && { marginTop: 16 }}
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
    </>
  );
};
