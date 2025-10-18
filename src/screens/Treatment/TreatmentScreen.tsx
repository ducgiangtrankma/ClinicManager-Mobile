import { useFocusEffect } from '@react-navigation/native';
import { useAppTheme } from '@src/common';
import { AppButton, Box, showErrorMessage } from '@src/components';
import { TreatmentStepIndicator } from '@src/components/TreatmentStepIndicator';
import { TreatmentEntity } from '@src/models';

import { APP_SCREEN, navigate } from '@src/navigator';
import { TreatmentService } from '@src/services';
import { sizes } from '@src/utils';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  customerId: string;
  customerName: string;
  onCreateSuccess: () => void;
}
export const TreatmentScreen: FC<Props> = ({
  customerId,
  customerName,
  onCreateSuccess,
}) => {
  const { Colors } = useAppTheme();

  const [treatments, stepTreatments] = useState<TreatmentEntity[]>([]);

  const getListTreatment = useCallback(async () => {
    try {
      const response = await TreatmentService.getListTreatment(customerId);
      stepTreatments(response.data);
    } catch (error: any) {
      console.log('error', error);
      showErrorMessage('error.title', error.message);
    }
  }, [customerId]);

  useFocusEffect(
    React.useCallback(() => {
      getListTreatment();
      onCreateSuccess();
      return () => {};
    }, [getListTreatment, onCreateSuccess]),
  );

  return (
    <Box style={styles.container}>
      <Box style={styles.stepContainer}>
        <TreatmentStepIndicator
          treatments={treatments}
          onRefresh={getListTreatment}
        />
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
          onPress={() =>
            navigate(APP_SCREEN.CREATE_TREATMENT, {
              customerId: customerId,
              customerName: customerName,
            })
          }
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
