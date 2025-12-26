import { useAppTheme } from '@src/common';
import { AppText } from '@src/components';
import { sizes } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  title: TranslationKeys;
  isActive: boolean;
}

export const SuggestionTabItem: FC<Props> = ({ title, isActive }) => {
  const { Colors } = useAppTheme();

  return (
    <View
      style={[
        styles.tab,
        isActive && styles.activeTab,
        isActive && {
          borderBottomColor: Colors.green,
        },
      ]}
    >
      <AppText
        translationKey={title}
        fontFamily={isActive ? 'content_bold' : 'content_regular'}
        color={isActive ? Colors.green : Colors.defaultTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: sizes._16sdp,
    flexDirection: 'row',
    justifyContent: 'center',
    height: sizes._36sdp,
  },
  activeTab: {
    borderBottomWidth: sizes._2sdp,
  },
});
