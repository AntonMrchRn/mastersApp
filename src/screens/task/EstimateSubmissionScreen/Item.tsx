import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Input, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { TrashIcon } from '@/assets/icons/svg/estimate/TrashIcon';

import { styles } from './styles';

type ItemProps = {
  title: string;
  description?: string;
  count: number;
  sum: number;
  canDelete?: boolean;
  error: { localSum: boolean; count: boolean } | undefined;
  onDelete: () => void;
  categoryName?: string;
  localSum?: string;
  onChangeSum: (text: string) => void;
  onChangeCount: (text: string) => void;
  measure: string;
};
export const Item: FC<ItemProps> = ({
  title,
  description,
  count,
  sum,
  canDelete,
  error,
  localSum,
  onDelete,
  onChangeSum,
  onChangeCount,
  measure,
  categoryName,
}) => {
  const theme = useTheme();

  const onClearSum = () => {
    onChangeSum('');
  };
  const onClearCount = () => {
    onChangeCount('');
  };

  const handleChangeSum = (text: string) => {
    const curText = text.includes(',') ? text.replace(',', '.') : text;
    const hasDot = curText.includes('.');
    const afterDots = curText.split('.')[1];
    if (afterDots && afterDots.length > 2) {
      onChangeSum((+curText).toFixed());
    } else {
      const valid = /^\d*\.?(?:\d{1,2})?$/;
      const res = valid.test(curText);
      if (res) {
        onChangeSum(curText.slice(0, hasDot ? 10 : 7));
      }
    }
  };

  return (
    <View>
      <Spacer size={20} />
      <View style={styles.head}>
        {categoryName ? (
          <Text variant="captionRegular" color={theme.text.neutral}>
            {categoryName}
          </Text>
        ) : (
          <View />
        )}
        {canDelete && (
          <TouchableOpacity onPress={onDelete}>
            <TrashIcon />
          </TouchableOpacity>
        )}
      </View>
      <Text
        variant="bodyMBold"
        style={styles.itemTitle}
        color={theme.text.basic}
      >
        {title}
      </Text>
      {description && (
        <Text variant="bodySRegular" color={theme.text.basic}>
          {description}
        </Text>
      )}
      <View style={styles.char}>
        <CubeIcon />
        <Text variant="bodySRegular" color={theme.text.neutral}>
          Измеряется в {measure.toLowerCase()}
        </Text>
      </View>
      <View style={styles.char}>
        <CalculatorIcon />
        <Text variant="bodySRegular" color={theme.text.neutral}>
          {sum} ₽ (изначальная стоимость)
        </Text>
      </View>
      <Spacer size={16} />
      <Input
        variant={'number'}
        label={'Количество'}
        maxLength={5}
        placeholder={'Количество'}
        hint={
          error?.count
            ? 'Для подачи сметы необходимо заполнить все поля'
            : undefined
        }
        isError={!!error?.count}
        value={count.toString()}
        onChangeText={onChangeCount}
        onClear={onClearCount}
      />
      <Spacer size={16} />
      <Input
        variant={'text'}
        keyboardType="numeric"
        label={'Ваша стоимость '}
        placeholder={'Указывается за весь обьем'}
        hint={
          error?.localSum
            ? 'Для подачи сметы необходимо заполнить все поля'
            : undefined
        }
        isError={!!error?.localSum}
        value={localSum}
        onChangeText={handleChangeSum}
        onClear={onClearSum}
      />
      <Spacer size={20} separator="bottom" />
    </View>
  );
};
