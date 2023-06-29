import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAppSelector } from '@/store';
import { useEditBankDetailsMutation } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { BankDetailsFormValues } from '@/types/form';
import {
  BankDetailsScreenRoute,
  ProfileNavigatorScreenName,
  ProfileScreenNavigationProp,
} from '@/types/navigation';
import { bankDetailsValidationSchema } from '@/utils/formValidation';

const useBankDetails = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { params } = useRoute<BankDetailsScreenRoute>();

  const { user: authUser } = useAppSelector(selectAuth);

  const [editBankDetails, { isLoading, isSuccess }] =
    useEditBankDetailsMutation();

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
    formState: { errors },
  } = methods;
  const bankID = watch('bankID');
  const checkingAccount = watch('checkingAccount');
  const correspondingAccount = watch('correspondingAccount');

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(ProfileNavigatorScreenName.Profile);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (checkingAccount.length === 20) {
      setFocus('bankID');
    }

    if (bankID.length === 9) {
      setFocus('correspondingAccount');
    }
  }, [bankID, checkingAccount]);

  useEffect(() => {
    if (correspondingAccount.length === 20) {
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

  return { errors, methods, isLoading, onSave: handleSubmit(onSave) };
};

export default useBankDetails;
