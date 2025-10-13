import {
  AppActivityIndicator,
  AppHeader,
  AppInput,
  AppList,
  Box,
  EmptyList,
  PageContainer,
} from '@src/components';

import { ProductEntity } from '@src/models';
import { useProductListQuery } from '@src/services';
import { sizes } from '@src/utils';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ProductListItem } from './components/ProductListItem';

interface Props {}
export const ProductScreen: FC<Props> = () => {
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useProductListQuery(10, keyword);

  const renderItem = useCallback(({ item }: { item: ProductEntity }) => {
    return <ProductListItem item={item} />;
  }, []);

  const products = data?.pages.flatMap(p => p.products) ?? [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <PageContainer disablePaddingBottom>
      <AppHeader
        title="warehouse.product.title"
        showBack={false}
        // rightContent={
        //   <TouchableOpacity
        //     // onPress={() => customerFilterRef.current?.open({})}
        //     hitSlop={{
        //       top: sizes._12sdp,
        //       bottom: sizes._12sdp,
        //       left: sizes._12sdp,
        //       right: sizes._12sdp,
        //     }}
        //   >
        //     <FilterIcon />
        //   </TouchableOpacity>
        // }
      />
      <Box
        style={{ marginHorizontal: sizes._16sdp, marginBottom: sizes._16sdp }}
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
          ListEmptyComponent={<EmptyList description="product_emptyList" />}
        />
      </Box>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes._16sdp,
  },
});
