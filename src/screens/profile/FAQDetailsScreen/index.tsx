import React from 'react';
import { FlatList, View } from 'react-native';

import { useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import { useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import { RoleType } from '@/types/task';
import {
  FAQData,
  FAQDataExecutorExternal,
  FAQDataExecutorInternal,
} from '@/utils/FAQdata';

import Item from './item';
import { ItemSeparatorComponent } from './ItemSeparatorComponent';

import { styles } from './style';

const FAQDetailsScreen = () => {
  const theme = useTheme();

  const userRoleId = useAppSelector(selectAuth).user?.roleID;
  const isInternalExecutor = userRoleId === RoleType.INTERNAL_EXECUTOR;

  const FAQdata = isInternalExecutor
    ? FAQDataExecutorInternal
    : FAQDataExecutorExternal;

  const description = FAQdata[0]?.description;

  const renderItem = ({ item }: { item: FAQData }) => <Item {...item} />;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background.main }]}
    >
      <Header title={`Вопросы`} description={description} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={FAQdata}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default FAQDetailsScreen;
