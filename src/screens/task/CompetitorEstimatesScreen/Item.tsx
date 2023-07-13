import React, { FC } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';

import { styles } from './styles';

type ItemProps = {
  name: string;
  price: number;
  count: number;
  sum: number;
};
export const Item: FC<ItemProps> = ({ name, price, count, sum }) => {
  const theme = useTheme();

  const items = [
    {
      text: `${price} ₽ за шт.`,
      icon: <PriceIcon />,
    },
    {
      text: `${count} шт.`,
      icon: <CubeIcon />,
    },
    {
      text: `${sum} ₽`,
      icon: <CalculatorIcon />,
    },
  ];

  return (
    <>
      <Spacer size={16} />
      <View style={styles.row}>
        <Text variant="bodySRegular" style={styles.name}>
          {name}
        </Text>
        <View style={styles.column}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              {item.icon}
              <Text variant="captionRegular" color={theme.text.neutral}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <Spacer
        size={16}
        separator={'bottom'}
        separatorColor={theme.background.neutralDisableSecond}
      />
    </>
  );
};
