import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';

enum Tabs {
  Common = 'Общие',
  IT_Services = 'IT услуги',
}

type TypeSelectionTaskSearchProps = {
  areCommon: boolean;
  setAreCommon: (areCommon: boolean) => void;
};

const TypeSelectionTaskSearch = ({
  areCommon,
  setAreCommon,
}: TypeSelectionTaskSearchProps) => {
  const onSelect = (tabType: Tabs) => {
    setAreCommon(tabType === Tabs.Common);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, areCommon && styles.activeBtn]}
        onPress={() => onSelect(Tabs.Common)}
      >
        <Text style={[styles.textBtn, areCommon && styles.activeTextBtn]}>
          {Tabs.Common}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, !areCommon && styles.activeBtn]}
        onPress={() => onSelect(Tabs.IT_Services)}
        disabled={true}
      >
        <Text style={[styles.textBtn, !areCommon && styles.activeTextBtn]}>
          {Tabs.IT_Services}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TypeSelectionTaskSearch;
