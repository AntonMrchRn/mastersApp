import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaskedText } from 'react-native-mask-text';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { styles } from './styles';

type ContactItemProps = {
  handlePhone: (phone: number) => void;
  sname: string | undefined;
  name: string | undefined;
  pname: string | undefined;
  note: string | undefined;
  phone: number | undefined;
};
export const ContactItem: FC<ContactItemProps> = ({
  handlePhone,
  sname = '',
  name = '',
  pname = '',
  phone,
  note = '',
}) => {
  const theme = useTheme();
  return (
    <View style={styles.wrapperGrid}>
      <View>
        <Text variant="bodyMRegular" color={theme.text.basic}>
          {sname} {name} {pname}
        </Text>
        {phone && (
          <TouchableOpacity
            style={styles.phone}
            onPress={() => handlePhone(phone)}
          >
            <MaskedText
              mask="+ 9 (999) 999-99-99"
              style={[styles.phoneText, { color: theme.text.basic }]}
            >
              {phone?.toString()}
            </MaskedText>
          </TouchableOpacity>
        )}
        {!!note && (
          <Text
            variant="captionRegular"
            color={theme.text.neutral}
            style={styles.name}
          >
            {note}
          </Text>
        )}
      </View>
      <Spacer size={'m'} separator="top" />
    </View>
  );
};
