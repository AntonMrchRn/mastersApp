import React, { FC } from 'react';
import { View } from 'react-native';

import { Spacer, SwipeList, Text, useTheme } from 'rn-ui-kit';
import { SwipeListData } from 'rn-ui-kit/lib/typescript/components/SwipeList';

import { styles } from './styles';

type TaskCardEstimateProps = {};

export const TaskCardEstimate: FC<TaskCardEstimateProps> = ({}) => {
  const theme = useTheme();
  const swipeListData = [
    {
      id: '0',
      label: 'label0',
      title: 'title0',
      items: [
        {
          id: 'i0',
          text: 'text0',
        },
      ],
    },
    {
      id: '01',
      label: 'label01',
      title: 'title01',
      items: [
        {
          id: 'i01',
          text: 'text01',
        },
      ],
    },
    {
      id: '02',
      label: 'label02',
      title: 'title02',
      items: [
        {
          id: 'i02',
          text: 'text02',
        },
      ],
    },
  ];
  return (
    <View>
      <Spacer size={'xxxl'} />
      <Text variant={'title3'} color={theme.text.basic} style={styles.mb8}>
        Перечень услуг и материалов
      </Text>
      <SwipeList
        data={swipeListData}
        variant={'default'}
        fistAction={function (item: SwipeListData): void {
          throw new Error('Function not implemented.');
        }}
        secondAction={function (item: SwipeListData): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};
