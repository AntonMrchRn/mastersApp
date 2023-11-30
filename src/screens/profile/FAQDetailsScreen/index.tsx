import React from 'react';
import { FlatList, View } from 'react-native';

import { useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import { FAQData } from '@/utils/FAQdata';

import Item from './item';
import { ItemSeparatorComponent } from './ItemSeparatorComponent';

import { styles } from './style';

const FAQDetailsScreen = () => {
  const theme = useTheme();
  const renderItem = ({
    item,
  }: {
    item: { title: string; subsections: { name: string }[] };
  }) => <Item onPress={() => console.log('test')} {...item} />;
  return (
    <View
      style={[styles.container, { backgroundColor: theme.background.main }]}
    >
      <Header title={`Вопросы`} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={FAQData()}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default FAQDetailsScreen;
