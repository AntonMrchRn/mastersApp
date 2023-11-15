import React from 'react';
import { View } from 'react-native';

import plural from 'plural-ru';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import { separateThousands } from '@/utils/separateThousands';

import { styles } from './styles';

type ItemProps = {
  name: string;
  price: number;
  count: number;
  sum: number;
  measure: string | undefined;
};

export const Item = ({ name, price, count, sum, measure }: ItemProps) => {
  const theme = useTheme();
  const currentMeasure =
    measure === 'час'
      ? plural(count, '%d час', '%d часа', '%d часов')
      : `${separateThousands(count)} ${measure || ''}`;
  const items = [
    {
      text: `${separateThousands(price)} ₽ за ${currentMeasure}`,
      icon: <PriceIcon />,
    },
    {
      text: `${separateThousands(count)} ${currentMeasure}`,
      icon: <CubeIcon />,
    },
    {
      text: `${separateThousands(sum)} ₽`,
      icon: <CalculatorIcon />,
    },
  ];

  return (
    <>
      <Spacer size={16} />
      <View style={styles.column}>
        <Text variant="bodySBold" style={styles.name}>
          {name}
        </Text>
        <View style={styles.row}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              {item.icon}
              <Text
                variant="captionRegular"
                color={theme.text.neutral}
                style={styles.name}
              >
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
