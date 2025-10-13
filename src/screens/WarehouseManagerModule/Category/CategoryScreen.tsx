import {
  AppActivityIndicator,
  AppHeader,
  AppInput,
  AppList,
  Box,
  PageContainer,
} from '@src/components';
import { EmptyListCategory } from '@src/components/SelectCategory/EmptyListCategory';
import { CategoryEntity } from '@src/models';
import { useCategoryListQuery } from '@src/services';
import { sizes } from '@src/utils';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { CategoryListItem } from './components/CategoryListItem';

interface Props {}
export const CategoryScreen: FC<Props> = () => {
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useCategoryListQuery(10, keyword);

  const renderItem = useCallback(({ item }: { item: CategoryEntity }) => {
    return <CategoryListItem item={item} />;
  }, []);

  const categories = data?.pages.flatMap(p => p.categories) ?? [];

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
        title="warehouse.category.title"
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
          placeholder={t('warehouse.category.search.placeholder')}
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
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes._16sdp,
  },
});
