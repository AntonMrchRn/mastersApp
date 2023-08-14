import React from 'react';
import { View } from 'react-native';

import { CheckBox, Spacer, Text, useTheme } from 'rn-ui-kit';

import { User } from '@/store/api/user/types';
import { ContractorStatus } from '@/types/task';

import styles from './style';

type ContractorProps = {
  contractor: User;
  isSelected: boolean;
  onSelect: () => void;
};

const Contractor = ({ onSelect, isSelected, contractor }: ContractorProps) => {
  const theme = useTheme();

  const isDisabled =
    contractor.subStatusID === ContractorStatus.NOT_AVAILABLE ||
    contractor.subStatusID === ContractorStatus.ALREADY_INVITED;

  return (
    <>
      <View style={styles.contractor}>
        <View style={styles.textContainer}>
          <Text
            variant="bodyMRegular"
            color={isDisabled ? theme.text.neutralDisable : theme.text.basic}
          >
            {!!contractor.name && !!contractor.sname
              ? `${contractor.name} ${contractor.sname}`
              : 'Анонимный пользователь'}
          </Text>
          <Spacer size="xs" />
          {isDisabled && (
            <Text variant="captionRegular" color={theme.text.neutralDisable}>
              Недоступен для этой задачи
            </Text>
          )}
        </View>
        <Spacer size="s" horizontal />
        <CheckBox
          onPress={onSelect}
          disabled={isDisabled}
          checked={
            isSelected ||
            contractor.subStatusID === ContractorStatus.ALREADY_INVITED
          }
        />
      </View>
      <Spacer
        size={0}
        separator="bottom"
        separatorColor={theme.background.neutralDisableSecond}
      />
    </>
  );
};

export default Contractor;
