import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './style';

export const TypeSelectionTaskSearch = ({ setAreСommon, areСommon }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, areСommon && styles.activeBtn]}
        onPress={() => {
          setAreСommon(true);
        }}
      >
        <Text style={[styles.textBtn, areСommon && styles.activeTextBtn]}>
          Общие
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, !areСommon && styles.activeBtn]}
        onPress={() => {
          setAreСommon(false);
        }}
        disabled={true}
      >
        <Text style={[styles.textBtn, !areСommon && styles.activeTextBtn]}>
          IT услуги
        </Text>
      </TouchableOpacity>
    </View>
  );
};
