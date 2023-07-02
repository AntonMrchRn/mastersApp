import React, { FC } from 'react';
import { View } from 'react-native';

import { Button, Chips, Spacer } from 'rn-ui-kit';

import { ServicesCategory } from '@/store/api/tasks/types';

import { ServiceItem } from '../../../task/ServiceItem';

import { styles } from './styles';

type CategoryContainerProps = {
  chipses: ServicesCategory[];
  setChipses: React.Dispatch<React.SetStateAction<ServicesCategory[]>>;
};
export const CategoryContainer: FC<CategoryContainerProps> = ({
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
      <View>
        <ServiceItem />
        <Button label={'Добавить'} size={'S'} style={styles.itemButton} />
        <Spacer size={15} separator="bottom" />
      </View>
    </View>
  );
};
