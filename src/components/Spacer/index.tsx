import React from 'react';
import { View, ViewStyle } from 'react-native';

import sizes from './sizes';

import styles from './style';

type SpacerProps = {
  filler?: boolean;
  size?: string;
  color?: string;
  style?: ViewStyle;
  lineWidth?: number;
};

const Spacer = ({
  style,
  filler,
  lineWidth,
  size = 'M',
  color = '#000',
}: SpacerProps) => {
  const height = Math.round(
    sizes[
      ('gap' + size.toUpperCase()) as
        | 'gapXS'
        | 'gapS'
        | 'gapM'
        | 'gapL'
        | 'gapX'
        | 'gapXL'
    ] / 4
  );

  let computedStyle: ViewStyle = {
    marginVertical: height,
    borderBottomWidth: lineWidth || 0,
    borderBottomColor: color,
    borderStyle: 'solid',
  };

  if (!filler) {
    computedStyle = { ...computedStyle, maxHeight: 1, height: 1 };
  }
  return <View style={[styles.spacer, computedStyle, style]} />;
};

export default Spacer;
