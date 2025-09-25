import React, { FC, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { StepDoneIcon, StepInprogressIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { TreatmentEntity } from '@src/models';
import { ACTIVE_OPACITY_TOUCH, sizes } from '@src/utils';
import { AppText } from '../AppText';
import { Box } from '../Box';
import { APP_SCREEN, navigate } from '@src/navigator';

interface Props {
  treatments: TreatmentEntity[];
}
const BOX_CONTENT_HEIGHT = sizes._260sdp;
const BOX_CONTENT_PADDING_BOTTOM = sizes._12sdp;
const STEP_BOX_SIZE = sizes._32sdp;
export const TreatmentStepIndicator: FC<Props> = ({ treatments }) => {
  const { Colors } = useAppTheme();
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const renderTreatmentBox = (treatment: TreatmentEntity, index: number) => {
    const isSelected = selectedStep === index;

    const boxStyle = {
      borderWidth: isSelected ? sizes._2sdp : 0,
      borderColor: isSelected ? Colors.green : 'transparent',
      backgroundColor: isSelected ? Colors.today : '#F8F9FA',
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigate(APP_SCREEN.TREATMENT_DETAIL, {
            treatment: treatment,
          })
        }
        activeOpacity={ACTIVE_OPACITY_TOUCH}
        key={treatment.id}
        style={[styles.contentBox, boxStyle]}
      >
        {/* Tiêu đề */}
        <AppText
          fontFamily="content_semibold"
          color={Colors.black}
          numberOfLines={1}
        >
          {treatment.title}
        </AppText>

        {/* Ngày thực hiện */}
        <Box gap={sizes._4sdp}>
          <AppText fontFamily="content_semibold" color={Colors.black}>
            Ngày thực hiện:
          </AppText>
          <AppText fontFamily="content_regular" color={Colors.content}>
            {new Date(treatment.implementation_date).toLocaleDateString(
              'vi-VN',
            )}
          </AppText>
        </Box>

        {/* Ghi chú */}
        {treatment.note && (
          <Box gap={sizes._4sdp}>
            <AppText fontFamily="content_semibold" color={Colors.black}>
              Ghi chú:
            </AppText>
            <AppText
              fontFamily="content_regular"
              color={Colors.content}
              numberOfLines={1}
            >
              {treatment.note}
            </AppText>
          </Box>
        )}

        {/* Trạng thái */}
        <Box gap={sizes._4sdp}>
          <AppText fontFamily="content_semibold" color={Colors.black}>
            Trạng thái:
          </AppText>
          <AppText
            fontFamily="content_regular"
            color={treatment.success ? Colors.green : Colors.error}
          >
            {treatment.success ? 'Hoàn thành' : 'Chưa hoàn thành'}
          </AppText>
        </Box>

        {/* Hình ảnh */}
        {treatment.images && treatment.images.length > 0 && (
          <Box gap={sizes._4sdp}>
            <AppText fontFamily="content_semibold" color={Colors.black}>
              Hình ảnh:
            </AppText>
            <AppText fontFamily="content_regular" color={Colors.content}>
              {treatment.images.length} ảnh
            </AppText>
          </Box>
        )}
      </TouchableOpacity>
    );
  };

  if (treatments.length === 0) {
    return (
      <Animated.View style={styles.container} entering={FadeInUp.delay(100)}>
        <Box style={styles.contentBox}>
          <AppText
            translationKey="empty_string"
            fontFamily="content_regular"
            color={Colors.content}
          >
            Chưa có liệu trình điều trị nào
          </AppText>
        </Box>
      </Animated.View>
    );
  }

  const STEP_COUNT = treatments.length;
  const MAX_HEIGHT =
    STEP_COUNT * BOX_CONTENT_HEIGHT +
    (STEP_COUNT - 1) * BOX_CONTENT_PADDING_BOTTOM;
  const DASH_HEIGHT =
    (MAX_HEIGHT - STEP_COUNT * (STEP_BOX_SIZE + sizes._36sdp)) / STEP_COUNT;
  return (
    <Animated.View style={styles.container} entering={FadeInUp.delay(100)}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Box horizontal style={styles.mainContainer}>
          {/* Step Indicator - Bên trái */}
          <View style={styles.stepsContainer}>
            {treatments.map((treatment, index) => (
              <View key={treatment.id} style={styles.stepWrapper}>
                <TouchableOpacity
                  style={[
                    styles.stepBox,
                    {
                      backgroundColor:
                        selectedStep === index
                          ? Colors.green
                          : treatment.success
                          ? Colors.today
                          : Colors.grayBackground,
                      borderColor:
                        selectedStep === index
                          ? Colors.green
                          : treatment.success
                          ? Colors.green
                          : Colors.divider,
                    },
                  ]}
                  onPress={() => setSelectedStep(index)}
                  activeOpacity={0.8}
                >
                  {/* Step Icon */}
                  {treatment.success ? (
                    <StepDoneIcon
                      size={sizes._24sdp}
                      color={
                        selectedStep === index ? Colors.white : Colors.green
                      }
                    />
                  ) : (
                    <StepInprogressIcon
                      size={sizes._24sdp}
                      color={
                        selectedStep === index ? Colors.white : Colors.content
                      }
                    />
                  )}
                </TouchableOpacity>

                {/* Step Label */}
                <AppText
                  fontFamily="content_regular"
                  color={selectedStep === index ? Colors.green : Colors.content}
                  style={styles.stepLabel}
                >
                  Buổi {index + 1}
                </AppText>

                {/* Connecting Line between boxes */}
                {index !== treatments.length - 1 && (
                  <View
                    style={[
                      styles.lineContainer,
                      {
                        height: DASH_HEIGHT, // Thử giảm xuống bằng content box height
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.lineBackground,
                        {
                          backgroundColor: treatment.success
                            ? Colors.green
                            : Colors.divider,
                        },
                      ]}
                    />
                    {/* Animated line for current step */}
                    {selectedStep === index && !treatment.success && (
                      <Animated.View style={[styles.lineAnimated]} />
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Content - Bên phải */}
          <View style={styles.contentContainer}>
            {treatments.map((treatment, index) => (
              <View key={treatment.id} style={styles.contentWrapper}>
                {renderTreatmentBox(treatment, index)}
              </View>
            ))}
          </View>
        </Box>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    gap: sizes._16sdp,
  },
  stepsContainer: {
    alignItems: 'center',
    paddingTop: sizes._96sdp,
  },
  scrollContainer: {
    flex: 1,
  },
  stepWrapper: {
    alignItems: 'center',
    gap: sizes._4sdp,
  },
  stepBox: {
    width: STEP_BOX_SIZE,
    height: STEP_BOX_SIZE,
    borderRadius: sizes._8sdp,
    borderWidth: sizes._2sdp,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lineContainer: {
    width: sizes._2sdp,
    marginBottom: sizes._8sdp,
    position: 'relative',
    overflow: 'hidden',
  },
  lineBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  lineAnimated: {
    position: 'absolute',
    width: '100%',
    bottom: 0, // Start from bottom and animate upward
  },
  scrollContent: {
    paddingBottom: sizes._96sdp,
  },
  contentContainer: {
    flex: 1,
  },
  contentWrapper: {
    marginBottom: sizes._12sdp,
  },
  contentBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: sizes._12sdp,
    padding: sizes._12sdp,
    gap: sizes._4sdp,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
    height: BOX_CONTENT_HEIGHT,
  },
  stepLabel: {
    textAlign: 'center',
    marginTop: sizes._2sdp,
  },
});
