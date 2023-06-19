import React, { FC } from 'react';
import { View } from 'react-native';

import { SegmentedControl } from 'rn-ui-kit';

import { useAppDispatch } from '@/store';
import { getSearchTasks } from '@/store/slices/taskSearch/asyncActions';
import { clearList } from '@/store/slices/taskSearch/reducer';

import { styles } from './style';

type TypeSelectionItem = {
  ID: number;
  description: string;
  code?: string;
  tableName?: string;
};

type PropsTypeSelection = {
  setActiveTab: (activeTab: number) => void;
  tableNames: TypeSelectionItem[] | undefined;
};

const TypeSelectionTaskSearch: FC<PropsTypeSelection> = ({
  setActiveTab,
  tableNames = [],
}) => {
  const dispatch = useAppDispatch();

  const descriptions = tableNames.map(
    (item: TypeSelectionItem) => item.description
  );

  const onChange = (res: number) => {
    dispatch(clearList());
    const activeTab = res + 1;

    dispatch(getSearchTasks({ idList: activeTab }));
    setActiveTab(activeTab);
  };

  return (
    <View style={styles.wrapper}>
      <SegmentedControl
        onChange={onChange}
        tabs={descriptions.length ? descriptions : ['', '']}
      />
    </View>
  );
};

export default TypeSelectionTaskSearch;
