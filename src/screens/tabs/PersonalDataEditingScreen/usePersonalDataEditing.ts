import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { useAppSelector } from '@/store';
import { useEditPersonalDataMutation, useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { PersonalDataFormValues } from '@/types/form';
import {
  ProfileNavigatorScreenName,
  ProfileScreenNavigationProp,
} from '@/types/navigation';
import { personalDataValidationSchema } from '@/utils/formValidation';

const usePersonalDataEditing = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const { user: authUser } = useAppSelector(selectAuth);
  const { data: user } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });
  const [editPersonalData, { isSuccess, isLoading }] =
    useEditPersonalDataMutation();

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
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(ProfileNavigatorScreenName.Profile);
    }
  }, [isSuccess]);

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
    editData: handleSubmit(editData),
  };
};

export default usePersonalDataEditing;
