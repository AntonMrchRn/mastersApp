import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Input, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { TrashIcon } from '@/assets/icons/svg/estimate/TrashIcon';

import { styles } from './styles';

type ItemProps = {
  title: string;
  description?: string;
  count: number;
  price: number;
  canDelete?: boolean;
  error: { localPrice: boolean; count: boolean } | undefined;
  onDelete: () => void;
  categoryName?: string;
  localPrice?: string;
  onChangePrice: (text: string) => void;
  onChangeCount: (text: string) => void;
  measure: string;
};
export const Item: FC<ItemProps> = ({
  title,
  description,
  count,
  price,
  canDelete,
  error,
  localPrice,
  onDelete,
  onChangePrice,
  onChangeCount,
  measure,
  categoryName,
}) => {
  const theme = useTheme();

  const onClearPrice = () => {
    onChangePrice('');
  };
  const onClearCount = () => {
    onChangeCount('');
  };

  const handleChangePrice = (text: string) => {
    const curText = text.includes(',') ? text.replace(',', '.') : text;
    const hasDot = curText.includes('.');
    const afterDots = curText.split('.')[1];
    if (afterDots && afterDots.length > 2) {
      onChangePrice((+curText).toFixed());
    } else {
      const valid = /^\d*\.?(?:\d{1,2})?$/;
      const res = valid.test(curText);
      if (res) {
        onChangePrice(curText.slice(0, hasDot ? 10 : 7));
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
        label={'Цена за единицу'}
        placeholder={`${price} ₽ (изначальная)`}
        hint={
          error?.localPrice
            ? 'Для подачи сметы необходимо заполнить все поля'
            : undefined
        }
        isError={!!error?.localPrice}
        value={localPrice}
        onChangeText={handleChangePrice}
        onClear={onClearPrice}
      />
      <Spacer size={20} separator="bottom" />
    </View>
  );
};
