import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useAppSelector } from '@/store';
import { useEditUserMutation } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import { PersonalDataFormValues } from '@/types/form';
import {
  PersonalDataScreenRoute,
  ProfileScreenNavigationProp,
} from '@/types/navigation';
import { personalDataValidationSchema } from '@/utils/formValidation';

const usePersonalDataEditing = () => {
  const toast = useToast();
  const { params } = useRoute<PersonalDataScreenRoute>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user: authUser } = useAppSelector(selectAuth);

  const [editPersonalData, { isSuccess, isLoading, isError, error }] =
    useEditUserMutation();

  const methods = useForm({
    defaultValues: {
      name: params.name || '',
      sname: params.sname || '',
      pname: params.pname || '',
    },
    resolver: yupResolver(personalDataValidationSchema),
    mode: 'onBlur',
  });
  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;
  const isDataExist = !!params.name && !!params.sname && !!params.pname;

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(ProfileScreenName.Profile);
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

  const editData = ({ name, sname, pname }: PersonalDataFormValues) => {
    if (authUser?.userID) {
      editPersonalData({
        ID: authUser?.userID,
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
