import {
  AppActivityIndicator,
  AppHeader,
  AppList,
  EmptyList,
  PageContainer,
} from '@src/components';
import { CustomerEntity } from '@src/models';

import { useFocusEffect } from '@react-navigation/native';
import { FilterIcon } from '@src/assets';
import { useCustomerQuery } from '@src/services';
import { sizes } from '@src/utils';
import React, { FC, useCallback, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { CustomerFilter, CustomerFilterRef } from './components/CustomerFilter';
import { CustomerItem } from './components/CustomerItem';
import { CustomerItemSkeleton } from './components/CustomerSkeleton';

interface Props {}
export const CustomerHomeScreen: FC<Props> = () => {
  const customerFilterRef = useRef<CustomerFilterRef>(null);
  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useCustomerQuery(10);

  const customers = data?.pages.flatMap(p => p.customers) ?? [];
  const renderItem = useCallback(
    ({ item, index }: { item: CustomerEntity; index: number }) => {
      return (
        <Animated.View
          entering={FadeInRight.springify()
            .damping(80)
            .stiffness(500)
            .delay(index * 30)}
          exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
        >
          <CustomerItem item={item} />
        </Animated.View>
      );
    },
    [],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  console.log('isFetching', isFetching);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  return (
    <PageContainer>
      <AppHeader
        title="customer.home.title"
        showBack={false}
        rightContent={
          <TouchableOpacity
            onPress={() => customerFilterRef.current?.open({})}
            hitSlop={{
              top: sizes._12sdp,
              bottom: sizes._12sdp,
              left: sizes._12sdp,
              right: sizes._12sdp,
            }}
          >
            <FilterIcon />
          </TouchableOpacity>
        }
      />
      {isFetching ? (
        <CustomerItemSkeleton count={6} />
      ) : (
        <AppList
          data={customers ?? []}
          renderItem={renderItem}
          canLoadMore={hasNextPage}
          canRefresh
          onLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={isRefetching}
          keyExtractor={(item: CustomerEntity) => `${item?.id}`}
          ListFooterComponent={
            isFetchingNextPage ? (
              <AppActivityIndicator animating={isFetchingNextPage} />
            ) : null
          }
          ListEmptyComponent={<EmptyList description="customer_emptyList" />}
        />
      )}
      <CustomerFilter ref={customerFilterRef} />
    </PageContainer>
  );
};
