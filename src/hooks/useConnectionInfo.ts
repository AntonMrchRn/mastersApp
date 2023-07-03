import { useEffect } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import { useToast } from 'rn-ui-kit';

const useConnectionInfo = () => {
  const netInfo = useNetInfo();
  const toast = useToast();

  const isConnected = netInfo.isConnected;

  useEffect(() => {
    if (!isConnected && isConnected !== null) {
      toast.show({
        type: 'error',
        duration: 3000,
        title:
          'Возникли проблемы c подключения к интернету. Пожалуйста, повторите позже.',
        contentHeight: 120,
      });
    }
  }, [isConnected]);

  return !!isConnected;
};

export default useConnectionInfo;
