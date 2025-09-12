import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}
export const CustomerScheduleScreen: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>CustomerScheduleScreen</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
