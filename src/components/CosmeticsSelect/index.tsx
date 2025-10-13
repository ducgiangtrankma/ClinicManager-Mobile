import { useAppTheme } from '@src/common';
import { ProductEntity, ProductSelected } from '@src/models';
import { useProductListQuery } from '@src/services';
import { _screen_height, _screen_width, sizes } from '@src/utils';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppActivityIndicator } from '../AppActivityIndicator';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { AppInput } from '../AppInput';
import { AppList } from '../AppList';
import { AppText } from '../AppText';
import { Box } from '../Box';
import { EmptyList } from '../EmptyList';
import { ProductItem } from './ProductItem';

interface Props {
  onSelect: (value: ProductSelected[]) => void;
}
export interface SelectCosmeticsRef {
  open(): void;
  close(): void;
}
const currentSnapPointsMax = (sizes._480sdp / _screen_height) * 100;

export const SelectCosmetics = forwardRef<SelectCosmeticsRef, Props>(
  (props, ref) => {
    const { onSelect } = props;
    const { Colors } = useAppTheme();
    const [keyword, setKeyword] = useState<string | undefined>(undefined);
    const { t } = useTranslation();
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      refetch,
      isRefetching,
    } = useProductListQuery(20, keyword);

    // Memo products để tránh re-create array mỗi lần render
    const products = useMemo(
      () => data?.pages.flatMap(p => p.products) ?? [],
      [data?.pages],
    );

    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();

    const [listSelected, setListSelected] = useState<ProductSelected[]>([]);
    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          bottomSheetRef.current?.open();
        },
        close: () => {
          bottomSheetRef.current?.close();
        },
      }),
      [bottomSheetRef],
    );

    const renderItem = useCallback(
      ({ item }: { item: ProductEntity }) => {
        return (
          <ProductItem
            item={item}
            edited
            listSelected={listSelected}
            onSelected={value => setListSelected(value)}
          />
        );
      },
      [listSelected],
    );

    const onApplySelect = useCallback(() => {
      onSelect(listSelected);
      bottomSheetRef.current?.close();
    }, [bottomSheetRef, listSelected, onSelect]);

    const handleLoadMore = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleRefresh = useCallback(() => {
      refetch();
    }, [refetch]);

    return (
      <BottomSheetModalContainer
        currentSnapPoints={['1%', `${currentSnapPointsMax}%`]}
        ref={bottomSheetRef}
        title="select_cosmetic_title"
      >
        <Box style={styles.container}>
          <Box
            style={{
              marginHorizontal: sizes._16sdp,
              marginBottom: sizes._16sdp,
            }}
          >
            <AppInput
              value={keyword}
              onChangeText={value => setKeyword(value)}
              placeholder={t('product_search_placeholder')}
              clearButtonMode="while-editing"
            />
          </Box>

          <Box style={{ height: _screen_width * 0.8 }}>
            <AppList
              data={products ?? []}
              renderItem={renderItem}
              canLoadMore={hasNextPage}
              canRefresh
              onLoadMore={handleLoadMore}
              onRefresh={handleRefresh}
              refreshing={isRefetching}
              keyExtractor={(item: ProductEntity) => `${item?.id}`}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <AppActivityIndicator animating={isFetchingNextPage} />
                ) : null
              }
              ListEmptyComponent={
                <EmptyList description="customer_emptyList" />
              }
            />
          </Box>
          <Box
            direction="horizontal"
            justify="space-between"
            gap={sizes._8sdp}
            style={[styles.footer, { borderTopColor: Colors.divider }]}
          >
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.close()}
              style={[
                styles.baseButton,
                { backgroundColor: Colors.cancelButton },
              ]}
            >
              <AppText
                translationKey="datePicker.button.cancel"
                fontFamily="content_medium"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onApplySelect}
              style={[styles.baseButton, { backgroundColor: Colors.green }]}
            >
              <AppText
                translationKey="datePicker.button.apply"
                color={Colors.white}
                fontFamily="content_bold"
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </BottomSheetModalContainer>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes._16sdp,
    gap: sizes._16sdp,
  },
  buttonMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes._6sdp,
  },
  titleMenu: {
    marginLeft: sizes._8sdp,
  },
  option: {
    padding: sizes._12sdp,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: sizes._8sdp,
    marginVertical: sizes._4sdp,
  },
  baseButton: {
    borderRadius: sizes._99sdp,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizes._16sdp,
  },
  footer: {
    borderTopWidth: sizes._1sdp,
    paddingTop: sizes._24sdp,
    paddingHorizontal: sizes._16sdp,
  },
});
