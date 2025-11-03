import { useAppTheme } from '@src/common';

import { AppHeader, AppList, PageContainer } from '@src/components';
import { NotificationEntity } from '@src/models';
import { useNotificationQuery } from '@src/services';
import { sizes } from '@src/utils';
import React, { FC, useCallback } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { NotificationItem } from './components/NotificationItem';

interface Props {}
export const NotificationScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useNotificationQuery(10);

  const notifications = data?.pages.flatMap(p => p.notifications) ?? [];

  const renderItem = useCallback(({ item }: { item: NotificationEntity }) => {
    if (!item) {
      return <></>;
    }
    return <NotificationItem item={item} />;
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <PageContainer style={styles.container}>
      <AppHeader
        disableMarginBottom
        showBack={false}
        title="notification_title"
      />
      <AppList
        data={notifications ?? []}
        renderItem={renderItem}
        canLoadMore={hasNextPage}
        canRefresh
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        refreshing={isRefetching}
        keyExtractor={(item: NotificationEntity) => `${item?.id}`}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              size="small"
              color={Colors.green}
              style={{ margin: sizes._16sdp }}
            />
          ) : null
        }
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
