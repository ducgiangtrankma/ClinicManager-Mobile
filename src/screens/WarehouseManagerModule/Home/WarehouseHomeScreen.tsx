import { PageContainer } from '@src/components';
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {}
export const WarehouseHomeScreen: FC<Props> = () => {
  return (
    <PageContainer style={styles.container}>
      <Text>WarehouseHomeScreen</Text>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
