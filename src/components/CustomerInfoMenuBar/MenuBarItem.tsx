import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@src/common';
import { CustomerDetailMenubarEntity } from '.';
import { AppText } from '../AppText';
import { sizes } from '@src/utils';
interface Props {
  item: CustomerDetailMenubarEntity;
  selectId: string;
}
const MenuItemCpn: FC<Props> = ({ item, selectId }) => {
  const { Colors } = useAppTheme();
  const isSelect = item.id === selectId;
  return (
    <View
      style={[
        styles.tab,
        isSelect && styles.activeTab,
        isSelect && {
          borderBottomColor: Colors.green,
        },
      ]}
    >
      <AppText
        translationKey={item.name}
        fontFamily={isSelect ? 'content_bold' : 'content_regular'}
        color={isSelect ? Colors.green : Colors.defaultTextColor}
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
export const MenuItem = React.memo(MenuItemCpn);
