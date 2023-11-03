import React from 'react';
import { ScrollView, View } from 'react-native';

import { Button, Spacer, Text, Tips, useTheme } from 'rn-ui-kit';

import { ShareIcon } from '@/assets/icons/svg/profile/ShareIcon';
import MegaphoneIcon from '@/assets/icons/svg/screens/MegaphoneIcon';
import Header from '@/components/Header';
import TimerBlockLink from '@/components/Timer/TimerBlockLink';
import useContractorsInvitation from '@/screens/profile/ContractorsInvitationScreen/useContractorsInvitation';

import styles from './style';

const ContractorsInvitationScreen = () => {
  const theme = useTheme();
  const { link, copyLink, isLoading, sharePress, linkTimeout, onGenerateLink } =
    useContractorsInvitation();

  return (
    <View style={styles.container}>
      <Header title="Приглашение подрядчиков" />
      <View style={styles.content}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.empty} />
          <View style={styles.wrapIcon}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.background.fieldMain },
              ]}
            >
              <MegaphoneIcon fill={theme.icons.accent} />
            </View>
          </View>
          <Spacer size="xl" />
          <Text variant="title2" style={styles.txt}>
            Пополняйте свою команду
          </Text>
          <Spacer />
          <Text
            variant="bodyMRegular"
            style={styles.txt}
            color={theme.text.neutral}
          >
            Отправляйте исполнителям приглашения стать вашими подрядчиками. Вы
            сможете курировать работы вступивших в команду
          </Text>
          <Spacer size="xl" />
          <View style={styles.rowBetween}>
            <Button
              isPending={isLoading}
              size={'S'}
              style={styles.button}
              label={
                link ? 'Копировать ссылку' : 'Сгенерировать ссылку-приглашение'
              }
              onPress={link ? () => copyLink(link) : onGenerateLink}
            />
            {!!link && (
              <Button
                onPress={sharePress}
                icon={<ShareIcon />}
                size="S"
                variant="outlineAccent"
                style={styles.share}
              />
            )}
          </View>
          {(!!linkTimeout || !!link) && (
            <TimerBlockLink
              isConfirm={!!link}
              callBack={onGenerateLink}
              expiredTimer={
                linkTimeout ? Number(linkTimeout.timeout * 1000) : undefined
              }
            />
          )}
        </ScrollView>
        <Tips
          type="info"
          containerStyle={styles.info}
          text="Приглашение действительно для одного исполнителя в течение 48 часов"
        />
      </View>
    </View>
  );
};

export default ContractorsInvitationScreen;
