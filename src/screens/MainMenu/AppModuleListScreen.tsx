import { dispatch, useAppTheme, useSelector } from '@src/common';
import {
  AppActivityIndicator,
  AppButton,
  AppText,
  Box,
  PageContainer,
} from '@src/components';
import { FacilityEntity } from '@src/models';
import { APP_SCREEN, navigate } from '@src/navigator';
import { onSelectFacility } from '@src/redux';
import { useFacilityQuery } from '@src/services';
import { _screen_width, sizes } from '@src/utils';
import React, { FC, useCallback, useEffect } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { FacilityItem } from './FacilityItem';
import { FacilityEmptyList } from './EmptyFacility';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface Props {}
export const AppModuleListScreen: FC<Props> = () => {
  const { Colors, Images } = useAppTheme();
  const { facility } = useSelector(x => x.facilityReducer);
  const { isFetching, data, refetch, isRefetching } = useFacilityQuery();
  const uiReady = data && data.length > 0;

  const handleSelectFacility = useCallback((value: FacilityEntity) => {
    dispatch(onSelectFacility(value));
  }, []);

  useEffect(() => {
    if (!facility && data && data?.length > 0) {
      dispatch(onSelectFacility(data[0]));
    }
  }, [data, facility]);

  return (
    <PageContainer padding>
      <Image source={Images.appLogo} style={styles.logo} />
      <Box style={styles.content}>
        {!uiReady && <FacilityEmptyList />}
        {uiReady && (
          <AppText
            translationKey="moduleScreen.select_facility"
            fontSize="18"
            fontFamily="content_semibold"
          />
        )}
        {isFetching ? (
          <AppActivityIndicator animating={isFetching} />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                tintColor={Colors.green} // iOS spinner color
                colors={[Colors.green]} // Android spinner colors
                progressViewOffset={sizes._12sdp} // khoảng cách spinner
              />
            }
            contentContainerStyle={{ gap: sizes._24sdp }}
            showsVerticalScrollIndicator={false}
          >
            {data?.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInRight.springify()
                  .damping(80)
                  .stiffness(500)
                  .delay(index * 50)}
                exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
              >
                <FacilityItem
                  onSelect={() => handleSelectFacility(item)}
                  item={item}
                  isSelect={facility?.id === item.id}
                />
              </Animated.View>
            ))}
          </ScrollView>
        )}
      </Box>
      {uiReady && facility && (
        <AppButton
          title="button.continue"
          onPress={() => navigate(APP_SCREEN.CUSTOMER_MODULE)}
        />
      )}
    </PageContainer>
  );
};

const LOGO_SIZE = _screen_width * 0.8;
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: sizes._24sdp,
    gap: sizes._24sdp,
    marginBottom: sizes._16sdp,
  },
  logo: {
    width: LOGO_SIZE,
    height: 'auto',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes._16sdp,
    width: '100%',
    paddingVertical: sizes._12sdp,
    paddingHorizontal: sizes._8sdp,
    borderRadius: sizes._12sdp,
    borderWidth: sizes._1sdp,
  },
});
