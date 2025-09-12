import { FlashList, type FlashListRef } from '@shopify/flash-list';
import React, { forwardRef } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ListViewProps } from './type';
import { useAppTheme } from '@src/common';

export const AppList = forwardRef<
  FlatList<any> | FlashListRef<any>,
  ListViewProps
>((props, ref) => {
  const { Colors } = useAppTheme();
  const {
    type = 'flashlist',
    onRefresh,
    onLoadMore,
    canRefresh = false,
    canLoadMore = false,
    refreshing = false,
    ...rest
  } = props;

  const loadMore = () => {
    if (canLoadMore && onLoadMore) onLoadMore();
  };

  if (type === 'flashlist') {
    return (
      <FlashList
        ref={ref as React.Ref<FlashListRef<any>>}
        refreshControl={
          canRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.activityIndicatorColor}
            />
          ) : undefined
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.0001}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...(rest as any)}
        onRefresh={undefined}
        refreshing={undefined}
      />
    );
  }
  return (
    <FlatList
      ref={ref as React.Ref<FlatList<any>>}
      refreshControl={
        canRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.activityIndicatorColor}
          />
        ) : undefined
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.0001}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...(rest as any)}
      onRefresh={undefined}
      refreshing={undefined}
    />
  );
});
