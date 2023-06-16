import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import prettyBytes from 'pretty-bytes';
import { Text, useTheme } from 'rn-ui-kit';

import { DOCIcon } from '@/assets/icons/svg/files/DOCIcon';
import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { JPGIcon } from '@/assets/icons/svg/files/JPGIcon';
import { MP4Icon } from '@/assets/icons/svg/files/MP4Icon';
import { PDFIcon } from '@/assets/icons/svg/files/PDFIcon';
import { PNGIcon } from '@/assets/icons/svg/files/PNGIcon';
import { PPTIcon } from '@/assets/icons/svg/files/PPTIcon';
import { WEBPIcon } from '@/assets/icons/svg/files/WEBPIcon';
import { XLSIcon } from '@/assets/icons/svg/files/XLSIcon';
import { ZIPIcon } from '@/assets/icons/svg/files/ZIPIcon';

import { ProgressBar } from './ProgressBar';

type FileItemProps = {
  action: React.JSX.Element | null;
  sizeBytes: number;
  fileOpen?: () => void;
  fileType: string;
  title: string;
  fileDisabled: boolean;
  isLoading: boolean;
  progress?: number;
  recieved?: number;
};
export const FileItem: FC<FileItemProps> = ({
  action,
  sizeBytes,
  fileOpen,
  fileType,
  title,
  fileDisabled,
  isLoading,
  progress = 0,
  recieved = 0,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    head: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    iconContainer: {
      width: 52,
      height: 52,
      backgroundColor: theme.background.fieldMain,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconTitleSize: {
      flexDirection: 'row',
      flexShrink: 1,
      flexGrow: 1,
    },
    titleSize: {
      marginLeft: 8,
      flexShrink: 1,
    },
    title: {
      color: theme.text.basic,
    },
    size: { marginTop: 4 },
    regularText: {
      color: theme.text.neutral,
    },
    action: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const getIcon = () => {
    switch (fileType) {
      case 'pdf':
        return <PDFIcon color={theme.icons.accent} />;
      case 'doc':
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
          <View style={styles.iconContainer}>{getIcon()}</View>
          <View style={styles.titleSize}>
            <Text variant={'bodySBold'} style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.size}>
              <Text variant={'captionRegular'} style={styles.regularText}>
                {prettyBytes(sizeBytes)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.action}>{action}</View>
      </View>
      {isLoading && (
        <ProgressBar progress={progress} recieved={recieved} size={sizeBytes} />
      )}
    </View>
  );
};
