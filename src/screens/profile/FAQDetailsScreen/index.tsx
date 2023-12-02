import React from 'react';
import { FlatList, View } from 'react-native';

import { useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import { FAQDataExecutor } from '@/utils/FAQdata';

import Item from './item';
import { ItemSeparatorComponent } from './ItemSeparatorComponent';

import { styles } from './style';

interface SubText {
  text?: string;
}

const FAQDetailsScreen = () => {
  const theme = useTheme();

  const renderItem = ({
    item,
  }: {
    item: {
      title: string;
      subsections: {
        name: string;
        answer?: {
          subTitle?: string;
          subText?: string;
          dotSubText?: SubText[];
          numSubText?: SubText[];
          lineRightText?: string;
        }[];
      }[];
    };
  }) => <Item {...item} />;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background.main }]}
    >
      <Header title={`Вопросы`} description={'Редакция от 30 ноября 2023 г.'} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={FAQDataExecutor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default FAQDetailsScreen;
