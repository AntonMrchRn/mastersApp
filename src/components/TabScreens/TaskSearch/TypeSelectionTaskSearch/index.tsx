import React, { FC, useEffect } from 'react';

import { SegmentedControl } from 'rn-ui-kit';

import { useAppDispatch, useAppSelector } from '@/store';
import { getSearchTasks } from '@/store/slices/taskSearch/asyncActions';

type TypeSelectionItem = {
  ID: number;
  description: string;
  code?: string;
  tableName?: string;
};

const TypeSelectionTaskSearch: FC = ({ setActiveTab }) => {
  const dispatch = useAppDispatch();
  const { tableNames } = useAppSelector(state => state.taskSearch);

  const descriptions = tableNames.map(
    (item: TypeSelectionItem) => item.description
  );

  return (
    <SegmentedControl
      onChange={res => {
        dispatch(getSearchTasks({ idList: tableNames[res].ID }));
        setActiveTab(tableNames[res].ID);
      }}
      tabs={descriptions.length ? descriptions : ['', '']}
    />
  );
};

export default TypeSelectionTaskSearch;
