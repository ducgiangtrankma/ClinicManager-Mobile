import { useAppTheme } from '@src/common';
import { _screen_width } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from '../Box';
import { MenuItem } from './MenuBarItem';
export enum MenuType {
  INFO = 'INFO',
  INITIAL_EXAMINATION_INFORMATION = 'INITIAL_EXAMINATION_INFORMATION',
  TREATMENT = 'TREATMENT',
  PAYMENT = 'PAYMENT',
}
export const MENU_BAR: CustomerDetailMenubarEntity[] = [
  {
    id: '1',
    name: 'customer_detail_menu_1',
    queryParam: '',
    type: MenuType.INFO,
  },
  {
    id: '2',
    name: 'customer_detail_menu_2',
    queryParam: '',
    type: MenuType.INITIAL_EXAMINATION_INFORMATION,
  },
  {
    id: '3',
    name: 'customer_detail_menu_3',
    queryParam: '',
    type: MenuType.TREATMENT,
  },
  {
    id: '4',
    name: 'customer_detail_menu_4',
    queryParam: '',
    type: MenuType.PAYMENT,
  },
];
export interface CustomerDetailMenubarEntity {
  id: string;
  name: TranslationKeys;
  queryParam: string;
  type: MenuType;
}

interface Props {
  idSelect: string;
  onChange: (value: CustomerDetailMenubarEntity) => void;
}
const CustomerInfoMenuBarComponent: FC<Props> = ({ idSelect, onChange }) => {
  const { Colors } = useAppTheme();
  const tabMenuRef = useRef<FlatList>(null);
  const [tabMenuActive, setTabMenuActive] = useState<number>(0);

  useEffect(() => {
    if (tabMenuRef.current && MENU_BAR.length - 1 >= tabMenuActive) {
      tabMenuRef?.current.scrollToIndex({
        animated: true,
        index: tabMenuActive,
        viewPosition: 0.5,
      });
    }
  }, [tabMenuActive, tabMenuRef]);

  return (
    <Box style={[styles.wrapper, { backgroundColor: Colors.white }]}>
      <FlatList
        ref={tabMenuRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={MENU_BAR}
        keyExtractor={(item: CustomerDetailMenubarEntity) => `${item.id}`}
        // contentContainerStyle={{ gap: sizes._8sdp }}
        renderItem={({
          item,
          index,
        }: {
          item: CustomerDetailMenubarEntity;
          index: number;
        }) => (
          <TouchableOpacity
            onPress={() => {
              setTabMenuActive(index);
              onChange(item);
            }}
          >
            <MenuItem item={item} selectId={idSelect} />
          </TouchableOpacity>
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: _screen_width,
  },
});
export const CustomerInfoMenuBar = React.memo(CustomerInfoMenuBarComponent);
