import { useAppTheme } from '@src/common';
import { _screen_width } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from '../Box';
import { MenuItem } from './MenuItem';

export enum TreatmentMenuType {
  INFO = 'INFO',
  PAYMENT = 'PAYMENT',
}
export const MENU_BAR: TreatmentDetailMenubarEntity[] = [
  {
    id: '1',
    name: 'treatment_detail_menu_1',
    type: TreatmentMenuType.INFO,
  },

  {
    id: '2',
    name: 'treatment_detail_menu_2',
    type: TreatmentMenuType.PAYMENT,
  },
];
export interface TreatmentDetailMenubarEntity {
  id: string;
  name: TranslationKeys;
  type: TreatmentMenuType;
}

interface Props {
  idSelect: string;
  onChange: (value: TreatmentDetailMenubarEntity) => void;
}
const TreatmentDetailMenuBarComponent: FC<Props> = ({ idSelect, onChange }) => {
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
        keyExtractor={(item: TreatmentDetailMenubarEntity) => `${item.id}`}
        // contentContainerStyle={{ gap: sizes._8sdp }}
        renderItem={({
          item,
          index,
        }: {
          item: TreatmentDetailMenubarEntity;
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
export const TreatmentMenuBar = React.memo(TreatmentDetailMenuBarComponent);
