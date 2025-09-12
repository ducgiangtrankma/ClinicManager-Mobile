import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}
export const ScheduleScreen: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ScheduleScreen</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
