import React from 'react';

import { View, StyleSheet } from 'react-native';

import sizes from './sizes';

const Spacer = ({
  size = 'M',
  lineWidth,
  color = '#000',
  filler,
  style,
}: any) => {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const height = Math.round(sizes['gap' + size.toUpperCase()] / 4);

  let computedStyle = {
    marginVertical: height,
    borderBottomWidth: lineWidth || 0,
    borderBottomColor: color,
    borderStyle: 'solid',
  };

  if (!filler) {
    // @ts-expect-error TS(2322): Type '{ maxHeight: number; height: number; marginV... Remove this comment to see the full error message
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
