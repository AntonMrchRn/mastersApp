import React, { FC } from 'react';
import { View } from 'react-native';

import { SegmentedControl } from 'rn-ui-kit';

import { useAppDispatch } from '@/store';
import { clearList } from '@/store/slices/taskSearch/reducer';

import { styles } from './style';

type PropsTypeSelection = {
  setActiveTab: (activeTab: number) => void;
  onRefresh: () => void;
};

const TypeSelectionTaskSearch: FC<PropsTypeSelection> = ({
  setActiveTab,
  onRefresh,
}) => {
  const dispatch = useAppDispatch();

  const onChange = (res: number) => {
    dispatch(clearList());
    const activeTab = res + 1;

    onRefresh();
    setActiveTab(activeTab);
  };

  return (
    <View style={styles.wrapper}>
      <SegmentedControl onChange={onChange} tabs={['IT услуги', 'Общие']} />
    </View>
  );
};

export default TypeSelectionTaskSearch;
