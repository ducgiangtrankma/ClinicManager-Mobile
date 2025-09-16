import { AppButton, AppText, Box } from '@src/components';
import { APP_SCREEN, navigate } from '@src/navigator';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

interface Props {}
export const FacilityEmptyList: FC<Props> = () => {
  return (
    <Box style={styles.container}>
      <AppButton
        title="button.create_facility"
        onPress={() => navigate(APP_SCREEN.CREATE_FACILITY)}
      />
      <AppText
        translationKey="emptyFacility_description"
        fontFamily="content_italic"
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: sizes._16sdp,
  },
});
