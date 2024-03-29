import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
  BottomSheetModal,
  Button,
  Chips,
  Input,
  Spacer,
  useTheme,
  useToast,
} from 'rn-ui-kit';

import { SearchIcon } from '@/assets/icons/svg/estimate/SearchIcon';
import SelectableModalItem from '@/components/tabs/ProfileScreen/ActivityTab/Modals/SelectableModalItem';
import useModal from '@/components/tabs/ProfileScreen/ActivityTab/Modals/useModal';
import { configApp } from '@/constants/platform';
import useDebounce from '@/hooks/useDebounce';
import { useEditUserMutation } from '@/store/api/user';
import { Region } from '@/store/api/user/types';
import { AxiosQueryErrorResponse } from '@/types/error';

import styles from './style';

type RegionsModalProps = {
  userId: number;
  regions: Region[];
  onClose: () => void;
  userRegionIDs: number[];
};

const RegionsModal = forwardRef(
  (
    { userId, onClose, regions, userRegionIDs }: RegionsModalProps,
    ref: ForwardedRef<BottomSheetModalMethods>,
  ) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const toast = useToast();
    const [editUserRegions, { isSuccess, isLoading, isError, error }] =
      useEditUserMutation();

    const initialSelectedRegions = regions.filter(region =>
      userRegionIDs.includes(region.ID),
    );
    const [selectedRegions, setSelectedRegions] = useState<Region[]>(
      initialSelectedRegions,
    );
    const [filter, setFilter] = useState<string>('');
    const debouncedFilter = useDebounce(filter, 500);
    const { isDirty, isChecked, selectedIDs, onSelectValue } = useModal(
      userRegionIDs,
      selectedRegions,
      setSelectedRegions,
    );

    useEffect(() => {
      if (isSuccess) {
        onClose();
        setFilter('');
      }
    }, [isSuccess]);

    useEffect(() => {
      if (isError) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
    }, [isError]);

    const keyExtractor = (item: Region) => `${item.ID}`;
    const onChangeText = useCallback(
      (text: string) => setFilter(text),
      [filter],
    );
    const filterData = (region: Region) =>
      region.name.toLowerCase().includes(debouncedFilter.toLowerCase().trim());

    const onSelect = async () => {
      await editUserRegions({
        ID: userId,
        regionIDs: selectedIDs,
      });
    };

    const onCloseHandler = () => {
      onClose();
      setFilter('');
      setSelectedRegions(initialSelectedRegions);
    };

    const renderItem = ({ item: region }: ListRenderItemInfo<Region>) => (
      <View style={styles.ph20}>
        <SelectableModalItem
          text={region.name}
          onSelect={() => onSelectValue(region)}
          isChecked={isChecked(region.ID)}
        />
      </View>
    );

    const ListHeaderComponent = (
      <View>
        <View style={styles.ph20}>
          <Input
            value={filter}
            variant={'text'}
            placeholder={'Поиск'}
            iconLeft={<SearchIcon />}
            onChangeText={onChangeText}
            onClear={() => setFilter('')}
          />
        </View>
        <Spacer size="xl" />
        {!!selectedRegions?.length && (
          <ScrollView
            contentContainerStyle={styles.chipsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {selectedRegions.filter(filterData).map(region => (
              <Chips
                selected
                close={true}
                key={region.ID}
                label={region.name}
                labelStyle={[
                  styles.chipsLabel,
                  {
                    color: theme.text.accent,
                  },
                ]}
                closeIconPress={() => onSelectValue(region)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    );

    return (
      <BottomSheetModal
        ref={ref}
        closeIcon
        title="Регион"
        titleStyle={styles.modalTitle}
        closeIconPress={onCloseHandler}
        onBackdropPress={onCloseHandler}
        style={styles.ph0}
        closeIconStyle={styles.pr20}
      >
        <>
          <FlatList
            scrollEnabled={true}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            data={regions.filter(filterData)}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
          />
          <View style={styles.ph20}>
            <Button
              label="Выбрать"
              onPress={onSelect}
              isPending={isLoading}
              style={[
                styles.btn,
                { marginBottom: 12 + (configApp.android ? 15 : insets.bottom) },
              ]}
              disabled={!selectedRegions.length || !isDirty}
            />
          </View>
        </>
      </BottomSheetModal>
    );
  },
);

export default RegionsModal;
