import { Activity, Region } from '@/store/api/user/types';

const useModal = (
  IDs: number[],
  selectedValues: (Region | Activity)[],
  setSelectedValues: (values: (Region & Activity)[]) => void,
) => {
  const isChecked = (id: number) =>
    selectedValues.map(item => item.ID).includes(id);

  const isDirty =
    selectedValues.length !== IDs.length
      ? true
      : selectedValues.reduce(
          (isDirty: boolean, value: Region | Activity) =>
            IDs.every(id => id !== value.ID),
          false,
        );

  const onSelectValue = (value: Region | Activity) => {
    const updatedSelectedValues = isChecked(value.ID)
      ? selectedValues.filter(val => val !== value)
      : selectedValues.concat(value);
    setSelectedValues(updatedSelectedValues as (Region & Activity)[]);
  };

  const selectedIDs = selectedValues.map(value => value.ID);

  return {
    isDirty,
    isChecked,
    selectedIDs,
    onSelectValue,
  };
};

export default useModal;
