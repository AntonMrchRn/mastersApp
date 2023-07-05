import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import useConnectionInfo from '@/hooks/useConnectionInfo';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useAppSelector } from '@/store';
import { useEditUserMutation, useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { PersonalDataFormValues } from '@/types/form';
import { ProfileScreenNavigationProp } from '@/types/navigation';
import { personalDataValidationSchema } from '@/utils/formValidation';

const usePersonalDataEditing = () => {
  useConnectionInfo();
  const toast = useToast();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const { user: authUser } = useAppSelector(selectAuth);
  const { data: user } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });
  const [editPersonalData, { isSuccess, isLoading, isError }] =
    useEditUserMutation();

  const methods = useForm({
    defaultValues: {
      name: user?.name || '',
      sname: user?.sname || '',
      pname: user?.pname || '',
    },
    resolver: yupResolver(personalDataValidationSchema),
    mode: 'onBlur',
  });
  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;
  const isDataExist = !!user?.name && !!user?.sname && !!user?.pname;

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

  const editData = ({ name, sname, pname }: PersonalDataFormValues) => {
    if (user?.ID) {
      editPersonalData({
        ID: user?.ID,
        name,
        sname,
        pname,
      });
    }
  };

  return {
    errors,
    methods,
    isLoading,
    isDisabled: !isDirty && isDataExist,
    editData: handleSubmit(editData),
  };
};

export default usePersonalDataEditing;
