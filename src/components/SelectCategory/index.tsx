import { _screen_height, sizes } from '@src/utils';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModalContainer,
  BottomSheetModalRef,
} from '../AppBottomSheet';
import { Box } from '../Box';

import { CategoryEntity } from '@src/models';
import { useCategoryListQuery } from '@src/services';
import { useTranslation } from 'react-i18next';
import { AppActivityIndicator } from '../AppActivityIndicator';
import { AppInput } from '../AppInput';
import { AppList } from '../AppList';
import { CategoryListItem } from './CategoryItem';
import { EmptyListCategory } from './EmptyListCategory';
interface Props {
  onSelect: (value: CategoryEntity) => void;
  valueSelect?: string;
}
export interface SelectCategoryRef {
  open(): void;
  close(): void;
}

export const SelectCategory = forwardRef<SelectCategoryRef, Props>(
  (props, ref) => {
    const bottomSheetRef: React.RefObject<BottomSheetModalRef> =
      React.createRef<any>();
    const { t } = useTranslation();

    const [selected, setSelected] = useState<CategoryEntity>();

    const [keyword, setKeyword] = useState<string | undefined>(undefined);

    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      refetch,
      isRefetching,
    } = useCategoryListQuery(10, keyword);
    const categories = data?.pages.flatMap(p => p.categories) ?? [];

    const handleLoadMore = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleRefresh = useCallback(() => {
      refetch();
    }, [refetch]);
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

    const handleSelectItem = useCallback(
      (item: CategoryEntity) => {
        setSelected(item);
        // Call the callback to update form
        props.onSelect?.(item);
        // Close the modal
        bottomSheetRef.current?.close();
      },
      [props, bottomSheetRef],
    );

    const renderItem = useCallback(
      ({ item }: { item: CategoryEntity }) => {
        return (
          <CategoryListItem
            item={item}
            onSelect={value => handleSelectItem(value)}
            valueSelect={selected}
          />
        );
      },
      [handleSelectItem, selected],
    );

    return (
      <BottomSheetModalContainer
        ref={bottomSheetRef}
        title="select_category_title"
      >
        <Box style={{ height: _screen_height * 0.6 }}>
          <Box
            style={{
              padding: sizes._16sdp,
            }}
          >
            <AppInput
              value={keyword}
              onChangeText={value => setKeyword(value)}
              placeholder={t('warehouse.product.search.placeholder')}
              clearButtonMode="while-editing"
            />
          </Box>

          <Box style={styles.container}>
            <AppList
              data={categories ?? []}
              renderItem={renderItem}
              canLoadMore={hasNextPage}
              canRefresh
              onLoadMore={handleLoadMore}
              onRefresh={handleRefresh}
              refreshing={isRefetching}
              keyExtractor={(item: CategoryEntity) => `${item?.id}`}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <AppActivityIndicator animating={isFetchingNextPage} />
                ) : null
              }
              ListEmptyComponent={
                <EmptyListCategory description="category_empty" />
              }
            />
          </Box>
        </Box>
      </BottomSheetModalContainer>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes._16sdp,
  },
  buttonMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes._6sdp,
  },
  titleMenu: {
    marginLeft: sizes._8sdp,
  },
});
