import { PageContainer } from '@src/components';
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {}
export const CreateCustomerScreen: FC<Props> = () => {
  return (
    <PageContainer style={styles.container}>
      <Text>CreateCustomerScreen</Text>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
