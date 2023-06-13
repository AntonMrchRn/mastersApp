import React, { FC } from 'react';

import { SegmentedControl } from 'rn-ui-kit';

import { useAppDispatch } from '@/store';
import { getSearchTasks } from '@/store/slices/taskSearch/asyncActions';

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
    const activeTab = res + 1;

    dispatch(getSearchTasks({ idList: activeTab }));
    setActiveTab(activeTab);
  };

  return (
    <SegmentedControl
      onChange={onChange}
      tabs={descriptions.length ? descriptions : ['', '']}
    />
  );
};

export default TypeSelectionTaskSearch;
