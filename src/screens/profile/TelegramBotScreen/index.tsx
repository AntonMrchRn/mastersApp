import React from 'react';
import { View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CheckMeasureIcon } from '@/assets/icons/svg/estimate/CheckMeasureIcon';
import TelegramIcon from '@/assets/icons/svg/screens/TelegramIcon';
import Header from '@/components/Header';
import useTelegramBot from '@/screens/profile/TelegramBotScreen/useTelegramBot';

import styles from './style';

const TelegramBotScreen = () => {
  const theme = useTheme();
  const { onConnect, isLoading, isBotActive } = useTelegramBot();

  return (
    <View style={styles.container}>
      <Header title="Telegram-bot" />
      <View style={styles.empty} />
      <View style={styles.content}>
        <View
          style={[
            styles.tgIcon,
            { backgroundColor: theme.background.fieldMain },
          ]}
        >
          <TelegramIcon size={40} fill={theme.icons.accent} />
        </View>
        <Spacer size="xl" />
        <Text variant="title2">Будьте в курсе событий</Text>
        <Spacer />
        <Text
          style={styles.text}
          variant="bodyMRegular"
          color={theme.text.neutral}
        >
          {
            'Подключите Telegram-бота и получайте \n уведомления об изменениях \n и комментариях в текущих задачах,\nа также о публикации новых'
          }
        </Text>
        <Spacer size={isBotActive ? 'xl' : 'xxxl'} />
        {isBotActive ? (
          <View style={styles.successConnection}>
            <View
              style={[
                styles.successIcon,
                { backgroundColor: theme.background.fieldSuccess },
              ]}
            >
              <CheckMeasureIcon fill={theme.icons.success} size={16} />
            </View>
            <Spacer horizontal size="s" />
            <Text variant="bodySRegular" color={theme.text.success}>
              Telegram-бот подключен
            </Text>
          </View>
        ) : (
          <Button
            style={styles.btn}
            onPress={onConnect}
            isPending={isLoading}
            label="Подключить бота"
          />
        )}
      </View>
    </View>
  );
};

export default TelegramBotScreen;
