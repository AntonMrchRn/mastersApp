import { useEffect } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';
import { useToast } from 'rn-ui-kit';

const useConnectionToast = () => {
  const netInfo = useNetInfo();
  const toast = useToast();

  const isConnected = netInfo.isConnected;

  useEffect(() => {
    if (!isConnected && isConnected !== null) {
      toast.show({
        type: 'error',
        duration: 3000,
        title:
          'Возникли проблемы c подключением к интернету. Пожалуйста, повторите позже.',
      });
    }
  }, [isConnected]);
};

export default useConnectionToast;
