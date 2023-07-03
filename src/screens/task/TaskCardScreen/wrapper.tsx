import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type WrappeProps = {
  isScroll?: boolean;
  children: JSX.Element | JSX.Element[];
};

export const Wrapper: FC<WrappeProps> = ({ children, isScroll }) => {
  const styles = StyleSheet.create({
    list: {
      flex: 1,
    },
    wrapper: {
      flexGrow: 1,
    },
  });
  if (!isScroll) {
    return (
      <ScrollView style={styles.list} contentContainerStyle={styles.wrapper}>
        {children}
      </ScrollView>
    );
  }
  return <View style={styles.list}>{children}</View>;
};
