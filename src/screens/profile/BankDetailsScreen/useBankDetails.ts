import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import useConnectionInfo from '@/hooks/useConnectionInfo';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useAppSelector } from '@/store';
import { useEditUserMutation } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { BankDetailsFormValues } from '@/types/form';
import {
  BankDetailsScreenRoute,
  ProfileScreenNavigationProp,
} from '@/types/navigation';
import { bankDetailsValidationSchema } from '@/utils/formValidation';

const useBankDetails = () => {
  useConnectionInfo();
  const toast = useToast();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { params } = useRoute<BankDetailsScreenRoute>();

  const { user: authUser } = useAppSelector(selectAuth);

  const [editBankDetails, { isLoading, isSuccess, isError }] =
    useEditUserMutation();

  const methods = useForm({
    defaultValues: {
      bankID: params.bankID || '',
      bankName: params.bankName || '',
      checkingAccount: params.checkingAccount || '',
      correspondingAccount: params.correspondingAccount || '',
    },
    resolver: yupResolver(bankDetailsValidationSchema),
    mode: 'onBlur',
  });
  const {
    setFocus,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;
  const isDataExist =
    !!params?.bankName &&
    !!params?.bankID &&
    !!params?.checkingAccount &&
    !!params?.correspondingAccount;
  const bankID = watch('bankID');
  const checkingAccount = watch('checkingAccount');
  const correspondingAccount = watch('correspondingAccount');

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(ProfileScreenName.Profile);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: 'Изменение данных невозможно',
        contentHeight: 100,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (checkingAccount.length === 20 && isDirty) {
      setFocus('bankID');
    }
  }, [checkingAccount]);

  useEffect(() => {
    if (bankID.length === 9 && isDirty) {
      setFocus('correspondingAccount');
    }
  }, [bankID]);

  useEffect(() => {
    if (correspondingAccount.length === 20 && isDirty) {
      Keyboard.dismiss();
    }
  }, [correspondingAccount]);

  const onSave = ({
    bankID,
    bankName,
    correspondingAccount,
    checkingAccount,
  }: BankDetailsFormValues) => {
    if (authUser?.userID) {
      editBankDetails({
        ID: authUser.userID,
        bankID,
        bankName,
        checkingAccount,
        correspondingAccount,
      });
    }
  };

  return {
    errors,
    methods,
    isLoading,
    isDisabled: isDataExist && !isDirty,
    onSave: handleSubmit(onSave),
  };
};

export default useBankDetails;
