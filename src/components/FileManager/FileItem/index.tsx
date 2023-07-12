import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import prettyBytes from 'pretty-bytes';
import { Text, useTheme } from 'rn-ui-kit';

import { DOCIcon } from '@/assets/icons/svg/files/DOCIcon';
import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { JPGIcon } from '@/assets/icons/svg/files/JPGIcon';
import { MOVIcon } from '@/assets/icons/svg/files/MOVIcon';
import { MP4Icon } from '@/assets/icons/svg/files/MP4Icon';
import { PDFIcon } from '@/assets/icons/svg/files/PDFIcon';
import { PNGIcon } from '@/assets/icons/svg/files/PNGIcon';
import { PPTIcon } from '@/assets/icons/svg/files/PPTIcon';
import { WEBPIcon } from '@/assets/icons/svg/files/WEBPIcon';
import { XLSIcon } from '@/assets/icons/svg/files/XLSIcon';
import { ZIPIcon } from '@/assets/icons/svg/files/ZIPIcon';

import { ProgressBar } from '../ProgressBar/ProgressBar';

import styles from './style';

type FileItemProps = {
  action: React.JSX.Element | null;
  sizeBytes: number;
  fileOpen?: () => void;
  fileType: string;
  title: string;
  fileDisabled: boolean;
  isLoading: boolean;
  progress?: number;
  received?: number;
};
export const FileItem = ({
  action,
  sizeBytes,
  fileOpen,
  fileType,
  title,
  fileDisabled,
  isLoading,
  progress = 0,
  received = 0,
}: FileItemProps) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (fileType) {
      case 'pdf':
        return <PDFIcon color={theme.icons.accent} />;
      case 'doc':
      case 'docx':
        return <DOCIcon color={theme.icons.accent} />;
      case 'png':
        return <PNGIcon color={theme.icons.accent} />;
      case 'xls':
        return <XLSIcon color={theme.icons.accent} />;
      case 'ppt':
        return <PPTIcon color={theme.icons.accent} />;
      case 'jpg':
        return <JPGIcon color={theme.icons.accent} />;
      case 'zip':
        return <ZIPIcon color={theme.icons.accent} />;
      case 'webp':
        return <WEBPIcon color={theme.icons.accent} />;
      case 'mp4':
        return <MP4Icon color={theme.icons.accent} />;
      case 'mov':
        return <MOVIcon color={theme.icons.accent} />;
      default:
        return <FileIcon color={theme.icons.accent} />;
    }
  };

  return (
    <View>
      <View style={styles.head}>
        <TouchableOpacity
          style={styles.iconTitleSize}
          onPress={fileOpen}
          disabled={fileDisabled}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.background.fieldMain },
            ]}
          >
            {getIcon()}
          </View>
          <View style={styles.titleSize}>
            <Text
              variant={'bodySBold'}
              style={{ color: theme.text.basic }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <View style={styles.size}>
              <Text
                variant={'captionRegular'}
                style={{ color: theme.text.neutral }}
              >
                {prettyBytes(sizeBytes)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.action}>{action}</View>
      </View>
      {isLoading && (
        <ProgressBar progress={progress} loaded={received} size={sizeBytes} />
      )}
    </View>
  );
};
