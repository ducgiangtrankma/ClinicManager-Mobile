import { CloseIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  item: string;
  onDelete: (item: string) => void;
}

export const SuggestionListItem: FC<Props> = ({ item, onDelete }) => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();

  const handleDelete = () => {
    Alert.alert(t('notification'), t('suggestion_delete_confirm'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete_ok'),
        style: 'destructive',
        onPress: () => onDelete(item),
      },
    ]);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.white,
          shadowColor: '#000',
        },
      ]}
    >
      <Box
        direction="horizontal"
        align="center"
        justify="space-between"
        style={styles.content}
      >
        <AppText style={styles.text} fontFamily="content_regular">
          {item}
        </AppText>
        <TouchableOpacity
          onPress={handleDelete}
          hitSlop={styles.hitSlop}
          style={[
            styles.deleteButton,
            {
              backgroundColor: Colors.grayBackground,
            },
          ]}
        >
          <CloseIcon size={sizes._16sdp} fill={Colors.error} />
        </TouchableOpacity>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: sizes._8sdp,
    marginHorizontal: sizes._16sdp,
    marginVertical: sizes._6sdp,
    // iOS shadow
    shadowOffset: { width: 0, height: sizes._2sdp },
    shadowOpacity: 0.08,
    shadowRadius: sizes._4sdp,
    // Android shadow
    elevation: 2,
  },
  content: {
    paddingVertical: sizes._16sdp,
    paddingHorizontal: sizes._16sdp,
  },
  text: {
    flex: 1,
    marginRight: sizes._12sdp,
    fontSize: sizes._14sdp,
  },
  deleteButton: {
    width: sizes._32sdp,
    height: sizes._32sdp,
    borderRadius: sizes._16sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hitSlop: {
    top: sizes._8sdp,
    bottom: sizes._8sdp,
    left: sizes._8sdp,
    right: sizes._8sdp,
  },
});
