import React from 'react';
import { FlatList, View } from 'react-native';

import { useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import { useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import { RoleType } from '@/types/task';
import {
  FAQDataExecutorExternal,
  FAQDataExecutorInternal,
} from '@/utils/FAQdata';

import Item from './item';
import { ItemSeparatorComponent } from './ItemSeparatorComponent';

import { styles } from './style';

interface SubText {
  text?: string;
}

const FAQDetailsScreen = () => {
  const theme = useTheme();

  const userRoleId = useAppSelector(selectAuth).user?.roleID;
  const isInternalExecutor = userRoleId === RoleType.INTERNAL_EXECUTOR;

  const renderItem = ({
    item,
  }: {
    item: {
      title?: string;
      subsections?: {
        name?: string;
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
        data={
          isInternalExecutor ? FAQDataExecutorInternal : FAQDataExecutorExternal
        }
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default FAQDetailsScreen;
