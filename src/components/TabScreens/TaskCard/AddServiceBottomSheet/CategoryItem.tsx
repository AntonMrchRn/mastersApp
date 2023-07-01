import React, { FC } from 'react';
import { View } from 'react-native';

import { Button, Chips, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { ServicesCategory } from '@/store/api/tasks/types';

import { styles } from './styles';
import { Item } from './Item';

type CategoryItemProps = {
  chipses: ServicesCategory[];
  setChipses: React.Dispatch<React.SetStateAction<ServicesCategory[]>>;
};
export const CategoryItem: FC<CategoryItemProps> = ({
  chipses,
  setChipses,
}) => {
  return (
    <View>
      <View style={styles.chipses}>
        {chipses.map(chips => {
          const closeIconPress = () => {
            setChipses(chipses.filter(chip => chip !== chips));
          };
          return (
            <Chips
              key={chips.ID}
              label={chips.name}
              selected
              close
              closeIconPress={closeIconPress}
            />
          );
        })}
      </View>
      <Item />
    </View>
  );
};
