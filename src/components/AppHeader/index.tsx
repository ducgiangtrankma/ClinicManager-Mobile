import { useAppTheme } from '@src/common';
import { sizes } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../AppText';
import { Box } from '../Box';
import { goBack } from '@src/navigator';
import { DrawerMenuIcon, LeftArrowIcon } from '@src/assets';
import { DrawerActions, useNavigation } from '@react-navigation/native';
interface Props {
  title: TranslationKeys;
  showBack: boolean;
  rightContent?: ReactNode;
  disableMarginBottom?: boolean;
  customGoBackEvent?: () => void;
}
export const AppHeader: FC<Props> = ({
  title,
  showBack,
  rightContent,
  disableMarginBottom = false,
  customGoBackEvent,
}) => {
  const { Colors } = useAppTheme();
  const navigation = useNavigation();
  return (
    <Box
      style={[
        styles.container,
        {
          borderBottomColor: Colors.headerBorderBackground,
          marginBottom: disableMarginBottom ? sizes._4sdp : sizes._24sdp,
        },
      ]}
      align="center"
      justify="space-between"
      horizontal
    >
      <Box>
        {showBack ? (
          <TouchableOpacity
            onPress={() => {
              if (customGoBackEvent) {
                customGoBackEvent();
              } else {
                goBack();
              }
            }}
            hitSlop={{
              top: sizes._24sdp,
              bottom: sizes._24sdp,
              left: sizes._24sdp,
              right: sizes._24sdp,
            }}
          >
            <LeftArrowIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            hitSlop={{
              top: sizes._24sdp,
              bottom: sizes._24sdp,
              left: sizes._24sdp,
              right: sizes._24sdp,
            }}
          >
            <DrawerMenuIcon />
          </TouchableOpacity>
        )}
      </Box>
      <AppText
        translationKey={title}
        fontSize="20"
        fontFamily="content_medium"
        textAlign="center"
      />
      <Box>{rightContent}</Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizes._16sdp,
    paddingVertical: sizes._12sdp,
    borderBottomWidth: sizes._1sdp,
  },
});
