import { useAppTheme } from '@src/common';
import { AppButton, Box } from '@src/components';
import { TreatmentStepIndicator } from '@src/components/TreatmentStepIndicator';
import { customersDummy } from '@src/models';
import { APP_SCREEN, navigate } from '@src/navigator';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

interface Props {}
export const TreatmentScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  return (
    <Box style={styles.container}>
      <Box style={styles.stepContainer}>
        <TreatmentStepIndicator treatments={customersDummy[0].treatments} />
      </Box>
      <Box
        style={[
          styles.actionContainer,
          {
            backgroundColor: Colors.defaultPageBackground,
            borderTopColor: Colors.divider,
          },
        ]}
      >
        <AppButton
          title="customer_create_treatment"
          onPress={() => navigate(APP_SCREEN.CREATE_TREATMENT)}
        />
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: { padding: sizes._16sdp, flex: 1 },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: sizes._16sdp,
    borderTopWidth: sizes._1sdp,
  },
  actionButton: {
    flex: 1,
    borderRadius: sizes._12sdp,
  },
});
