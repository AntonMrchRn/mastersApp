import React, {
  FC,
  ForwardedRef,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Button, CheckBox, Spacer, Text, useTheme } from 'rn-ui-kit';

import { SearchIcon } from '@/assets/icons/svg/estimate/SearchIcon';
import { ModalCloseIcon } from '@/assets/icons/svg/ModalCloseIcon';
import ControlledInput from '@/components/inputs/ControlledInput';
import { useGetServicesCategoriesQuery } from '@/store/api/tasks';

type AddServiceBottomSheetProps = {
  onCancel: () => void;
  ref?: ForwardedRef<BottomSheetModalMethods>;
};
export const AddServiceBottomSheet: FC<AddServiceBottomSheetProps> = forwardRef(
  ({ onCancel }, ref) => {
    const theme = useTheme();

    const categories = useGetServicesCategoriesQuery();

    const styles = StyleSheet.create({
      button: {
        marginTop: 24,
      },
      title: {
        marginTop: 24,
        marginBottom: 12,
      },
      container: {
        marginTop: 16,
      },
      item: {
        marginVertical: 20,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    });

    const methods = useForm({
      defaultValues: {
        serviceName: '',
      },
      mode: 'onChange',
    });
    const { watch } = methods;

    const serviceName = watch('serviceName');

    // ref
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['80%'], []);
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    const insets = useSafeAreaInsets();
    return (
      <>
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          style={{
            paddingHorizontal: 20,
          }}
          backgroundStyle={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
          handleStyle={{
            paddingBottom: 0,
          }}
          handleIndicatorStyle={{
            backgroundColor: theme.background.neutralDisable,
            borderRadius: 5,
            width: 36,
            height: 4,
          }}
        >
          <View
            style={{
              right: 0,
              top: 0,
              position: 'absolute',
            }}
          >
            <ModalCloseIcon />
          </View>
          <View style={{ height: 12, zIndex: -1 }} />
          <BottomSheetScrollView style={styles.container}>
            <FormProvider {...methods}>
              <ControlledInput
                name={'serviceName'}
                placeholder={'Искать по названию'}
                variant={'text'}
                keyboardType="numeric"
                iconLeft={<SearchIcon />}
              />
            </FormProvider>
            <Text
              variant={'title3'}
              style={styles.title}
              color={theme.text.basic}
            >
              Категории
            </Text>
            {categories.isLoading ? (
              <ActivityIndicator />
            ) : (
              categories?.data?.categories?.map(category => {
                return (
                  <View key={category.ID}>
                    <View style={styles.item}>
                      <View style={styles.row}>
                        <Text variant={'bodyMRegular'} color={theme.text.basic}>
                          {category.name}
                        </Text>
                        <CheckBox checked={false} />
                      </View>
                    </View>
                    <Spacer size={0} separator="bottom" />
                  </View>
                );
              })
            )}
            <Button
              style={styles.button}
              size="M"
              label="Выбрать"
              onPress={onCancel}
            />
            <View style={{ height: insets.bottom + 20 }} />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </>
    );
  }
);
