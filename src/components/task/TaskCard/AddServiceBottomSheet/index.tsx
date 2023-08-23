import React, {
  FC,
  ForwardedRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
  Banner,
  BottomSheetModal,
  Button,
  CheckBox,
  Input,
  Spacer,
  Text,
  useTheme,
} from 'rn-ui-kit';

import { SearchIcon } from '@/assets/icons/svg/estimate/SearchIcon';
import {
  useGetServicesCategoriesQuery,
  useLazyGetServicesByNameQuery,
} from '@/store/api/tasks';
import { Service, ServicesCategory } from '@/store/api/tasks/types';

import { CategoryContainer } from './CategoryContainer';
import { SearchContainer } from './SearchContainer';

import { styles } from './styles';
let timeout: number;

type AddServiceBottomSheetProps = {
  onCancel: () => void;
  ref?: ForwardedRef<BottomSheetModalMethods>;
  addService: (service: Service) => void;
  serviceIDs: number[];
};
export const AddServiceBottomSheet: FC<AddServiceBottomSheetProps> = forwardRef(
  ({ onCancel, addService, serviceIDs }, ref) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const [chipses, setChipses] = useState<ServicesCategory[]>([]);
    const [serviceName, setServiceName] = useState('');
    const [banner, setBanner] = useState(false);
    const [selectCategories, setSelectCategories] = useState<
      ServicesCategory[]
    >([]);

    const categories = useGetServicesCategoriesQuery();
    const [trigger, result] = useLazyGetServicesByNameQuery();

    const subtitle =
      !chipses.length && !serviceName.length
        ? 'Воспользуйтесь поиском или выберите подходящую категорию услуги'
        : undefined;

    const onBanner = useCallback(() => {
      setBanner(!banner);
    }, [banner]);
    const onChoose = useCallback(() => {
      setSelectCategories([]);
      setChipses(selectCategories);
    }, [selectCategories]);
    const onClear = () => {
      serviceName && setServiceName('');
    };
    const onChangeText = useCallback((text: string) => {
      setServiceName(text);
      timeout && clearTimeout(timeout);
      const timer = setTimeout(() => {
        text && trigger(text);
      }, 1000);
      timeout = timer;
    }, []);
    const handleAddService = (service: Service) => {
      if (service.ID && serviceIDs?.includes(service.ID)) {
        onBanner();
      } else {
        addService(service);
      }
    };
    return (
      <>
        <BottomSheetModal
          ref={ref}
          index={0}
          closeIcon
          closeIconPress={onCancel}
          title={'Добавление услуги'}
          subtitle={subtitle}
        >
          <BottomSheetScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {!chipses.length && (
              <Input
                placeholder={'Искать по названию'}
                variant={'text'}
                iconLeft={<SearchIcon />}
                onChangeText={onChangeText}
                value={serviceName}
                onClear={onClear}
                containerStyle={styles.mb24}
              />
            )}
            {!chipses.length && !serviceName.length && (
              <>
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
                    const isActive = selectCategories.includes(category);
                    const onPress = () => {
                      const newArray = isActive
                        ? selectCategories.filter(cat => cat !== category)
                        : selectCategories.concat(category);
                      setSelectCategories(newArray);
                    };
                    return (
                      <View key={category.ID}>
                        <View style={styles.item}>
                          <View style={styles.row}>
                            <Text
                              variant={'bodyMRegular'}
                              color={theme.text.basic}
                            >
                              {category.name}
                            </Text>
                            <CheckBox
                              checked={isActive}
                              onPress={onPress}
                              style={{ marginRight: 1 }}
                            />
                          </View>
                        </View>
                        <Spacer size={0} separator="bottom" />
                      </View>
                    );
                  })
                )}
              </>
            )}
            {chipses.length ? (
              <CategoryContainer
                chipses={chipses}
                setChipses={setChipses}
                addService={handleAddService}
              />
            ) : (
              <></>
            )}
            {serviceName.length ? (
              <SearchContainer
                data={result.data}
                loader={result.isLoading || result.isFetching}
                addService={handleAddService}
              />
            ) : (
              <></>
            )}
            <Spacer size={24} />
          </BottomSheetScrollView>
          {!serviceName.length && (
            <>
              <Button
                size="M"
                label="Выбрать"
                onPress={onChoose}
                disabled={!selectCategories.length}
              />
              <View style={{ height: insets.bottom + 20 }} />
            </>
          )}

          {banner && (
            <View style={{ position: 'absolute', bottom: 100, width: '100%' }}>
              <Banner
                type={'error'}
                icon={'alert'}
                title="Добавление невозможно"
                text="Данная услуга уже включена в смету"
                onClosePress={onBanner}
              />
            </View>
          )}
        </BottomSheetModal>
      </>
    );
  }
);
