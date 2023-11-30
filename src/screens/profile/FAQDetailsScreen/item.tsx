import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import ArrowRightIcon from '@/assets/icons/svg/screens/ArrowRightIcon';
import Title from '@/components/tabs/ProfileScreen/Title';

import { styles } from './style';

interface Subsection {
  name: string;
}

type ItemProps = {
  title: string;
  subsections: Subsection[];
  onPress: () => void;
};
export const Item: FC<ItemProps> = ({ title, onPress, subsections }) => {
  const theme = useTheme();
  const subsectionsItem = () => {
    return subsections.map((item, index) => {
      return (
        <View key={index} style={styles.subsectionsWrapper}>
          <TouchableOpacity onPress={onPress}>
            <ShadowedView style={styles.item}>
              <Text
                variant="bodySRegular"
                color={theme.text.basic}
                style={styles.text}
              >
                {item.name}
              </Text>
              <ArrowRightIcon fill={theme.icons.basic} />
            </ShadowedView>
          </TouchableOpacity>
        </View>
      );
    });
  };
  return (
    <View>
      <Spacer size="xl" />
      <Title title={title} />
      <Spacer size="l" />
      {subsectionsItem()}
    </View>
  );
};

export default Item;
