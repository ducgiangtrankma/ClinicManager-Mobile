import { useSelector } from '@src/common';
import {
  AppActivityIndicator,
  AppButton,
  AppHeader,
  AppList,
  Box,
  EmptyList,
  PageContainer,
} from '@src/components';
import { BillErrorEntity } from '@src/models';
import { useBillErrorQuery } from '@src/services';
import React, { FC, useCallback } from 'react';
import { Alert, Linking, StyleSheet } from 'react-native';
import { BillErrorItem } from './components/BillErrorItem';

interface Props {}
export const BillErrorListScreen: FC<Props> = () => {
  const { user } = useSelector(x => x.appReducer);
  const { data, refetch, isLoading, isRefetching } = useBillErrorQuery();

  const renderItem = useCallback(({ item }: { item: BillErrorEntity }) => {
    return <BillErrorItem bill={item} />;
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const sendEmail = async () => {
    try {
      const to = 'beautynote98@gmail.com';
      const subject = `${user?.email ?? 'Người dùng'} Yêu cầu hỗ trợ`;
      const body = 'Xin chào, tôi cần hỗ trợ đối soát giao dịch lỗi';

      const mailto = `mailto:${to}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      // 1) Thử mailto trước
      const canMailto = await Linking.canOpenURL(mailto);
      if (canMailto) {
        await Linking.openURL(mailto);
        return;
      }

      // 2) Fallback: Gmail web compose (chạy được cả trên simulator)
      const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        to,
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const canGmailWeb = await Linking.canOpenURL(gmailWeb);
      if (canGmailWeb) {
        await Linking.openURL(gmailWeb);
        return;
      }
    } catch (e) {
      Alert.alert(
        'Lỗi',
        'Không thể mở soạn email. Vui lòng gửi email đến beautynote98@gmail.com',
      );
      console.log('sendEmail error:', e);
    }
  };

  return (
    <PageContainer disablePaddingBottom>
      <AppHeader title="bill_export_title" showBack={false} />
      <Box style={styles.container}>
        <AppList
          data={data ?? []}
          renderItem={renderItem}
          canLoadMore={true}
          canRefresh
          onRefresh={handleRefresh}
          refreshing={isRefetching}
          keyExtractor={(item: BillErrorEntity) => `${item?.id}`}
          ListEmptyComponent={
            isLoading ? (
              <AppActivityIndicator animating={isLoading} />
            ) : (
              <EmptyList description="bill_empty" />
            )
          }
        />
      </Box>
      {data && data?.length > 0 && (
        <AppButton title="request_support_bill" onPress={sendEmail} />
      )}
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
