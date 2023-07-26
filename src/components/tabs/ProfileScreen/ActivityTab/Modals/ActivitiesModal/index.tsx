import React, { useEffect, useState } from 'react';

import { BottomSheet, Button, Spacer, useToast } from 'rn-ui-kit';

import SelectableModalItem from '@/components/tabs/ProfileScreen/ActivityTab/Modals/SelectableModalItem';
import useModal from '@/components/tabs/ProfileScreen/ActivityTab/Modals/useModal';
import { useEditUserMutation } from '@/store/api/user';
import { Activity } from '@/store/api/user/types';
import { AxiosQueryErrorResponse } from '@/types/error';

import styles from './style';

type ActivitiesModal = {
  userId: number;
  isVisible: boolean;
  onClose: () => void;
  activities: Activity[];
  userActivityIDs: number[];
};

const ActivitiesModal = ({
  userId,
  onClose,
  isVisible,
  activities,
  userActivityIDs,
}: ActivitiesModal) => {
  const toast = useToast();
  const initialSelectedActivities = activities.filter(activity =>
    userActivityIDs.includes(activity.ID)
  );
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>(
    initialSelectedActivities
  );
  const [editUserActivities, { isSuccess, isLoading, isError, error }] =
    useEditUserMutation();
  const { isDirty, isChecked, selectedIDs, onSelectValue } = useModal(
    userActivityIDs,
    selectedActivities,
    setSelectedActivities
  );

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
        contentHeight: 100,
      });
    }
  }, [isError]);

  const onSelect = async () => {
    await editUserActivities({
      ID: userId,
      setIDs: selectedIDs,
    });
  };

  const onCloseHandler = () => {
    onClose();
    setSelectedActivities(initialSelectedActivities);
  };

  return (
    <BottomSheet
      closeIcon
      title="Направление"
      isVisible={isVisible}
      closeIconPress={onCloseHandler}
      onBackdropPress={onCloseHandler}
      onSwipeComplete={onCloseHandler}
      titleStyle={styles.modalTitle}
      backdropTransitionOutTiming={0}
      closeIconContainerStyle={styles.closeIcon}
    >
      <>
        {activities.map(activity => (
          <SelectableModalItem
            key={activity.ID}
            text={activity.description}
            isChecked={isChecked(activity.ID)}
            onSelect={() => onSelectValue(activity)}
          />
        ))}
        <Spacer size="xl" />
        <Button
          label="Выбрать"
          style={styles.btn}
          onPress={onSelect}
          isPending={isLoading}
          disabled={!selectedActivities.length || !isDirty}
        />
      </>
    </BottomSheet>
  );
};

export default ActivitiesModal;
