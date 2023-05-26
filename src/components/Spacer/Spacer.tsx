import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import sizes from './sizes';

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

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default Spacer;
