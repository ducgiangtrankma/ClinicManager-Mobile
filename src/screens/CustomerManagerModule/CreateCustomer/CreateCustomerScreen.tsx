import { useAppTheme } from '@src/common';
import { AppButton, AppHeader, Box, PageContainer } from '@src/components';
import { CreateCustomerProgress } from '@src/components/CreateCustomerStep';
import { _screen_width, sizes } from '@src/utils';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

interface Props {}
enum ChangeStepType {
  next = 'next',
  back = 'back',
}
export const CreateCustomerScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleChangeStep = useCallback(
    (type: ChangeStepType) => {
      let newStep: number;
      if (type === ChangeStepType.back) {
        newStep = currentStep - 1;
        if (newStep < 0) {
          return;
        } else {
          setCurrentStep(newStep);
        }
      } else {
        newStep = currentStep + 1;
        if (newStep > 3) {
          return;
        } else {
          setCurrentStep(newStep);
        }
      }
    },
    [currentStep],
  );

  const renderHeaderTile = useCallback(() => {
    if (currentStep === 0) return 'create_customer_step_1';
    if (currentStep === 1) return 'create_customer_step_2';
    if (currentStep === 2) return 'create_customer_step_3';
    if (currentStep === 3) return 'create_customer_step_4';
    return 'empty_string';
  }, [currentStep]);
  return (
    <PageContainer>
      <AppHeader title={renderHeaderTile()} showBack />
      <Box style={styles.container} justify="space-between">
        <CreateCustomerProgress currentStep={currentStep} />
        <Box style={styles.formContainer} />
        <Box horizontal justify="space-between" style={styles.actionContainer}>
          <AppButton
            onPress={() => handleChangeStep(ChangeStepType.back)}
            title="step_button_title_back"
            style={[
              styles.baseStepButton,
              { backgroundColor: Colors.disableButtonBackground },
            ]}
            titleColor={Colors.black}
          />
          <AppButton
            onPress={() => handleChangeStep(ChangeStepType.next)}
            title={
              currentStep === 3 ? 'step_button_save' : 'step_button_tile_next'
            }
            style={styles.baseStepButton}
          />
        </Box>
      </Box>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes._24sdp,
  },
  formContainer: {
    flex: 1,
  },
  actionContainer: {
    width: '100%',
  },
  baseStepButton: {
    width: (_screen_width - sizes._48sdp - sizes._8sdp) / 2,
    borderRadius: sizes._12sdp,
  },
});
