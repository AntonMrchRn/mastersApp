import React, { FC } from 'react';

import { SegmentedControl } from 'rn-ui-kit';

import { useAppSelector } from '@/store';

type TypeSelectionTaskSearchProps = {
  onPress?: () => void;
};

type TypeSelectionItem = {
  ID: number;
  description: string;
  code?: string;
  tableName?: string;
};

const TypeSelectionTaskSearch: FC<TypeSelectionTaskSearchProps> = ({
  onPress,
}: TypeSelectionTaskSearchProps) => {
  const { tableNames } = useAppSelector(state => state.taskSearch);

  const descriptions = tableNames.map(
    (item: TypeSelectionItem) => item.description
  );

  return (
    <SegmentedControl
      onChange={res => console.log('res', tableNames[res].code)}
      tabs={descriptions.length ? descriptions : ['', '']}
    />
  );
};

export default TypeSelectionTaskSearch;
