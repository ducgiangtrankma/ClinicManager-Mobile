import { AppText, PageContainer, Box } from '@src/components';
import { APP_SCREEN } from '@src/navigator';
import { useAppTheme } from '@src/common';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

interface Props {}
export const AppModuleListScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <PageContainer>
      <Box style={styles.container}>
        {/* Header với drawer button */}
        <Box style={styles.header}>
          <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
            <AppText fontSize="16" color={Colors.green}>
              ☰ Menu
            </AppText>
          </TouchableOpacity>
        </Box>

        {/* Content area */}
        <Box style={styles.content}>
          <AppText
            fontSize="24"
            fontFamily="content_bold"
            textAlign="center"
            margin={{ mb: sizes._24sdp }}
          >
            Select Module
          </AppText>

          <TouchableOpacity
            style={[styles.moduleButton, { backgroundColor: Colors.green }]}
            onPress={() =>
              navigation.navigate(APP_SCREEN.CUSTOMER_MODULE as never)
            }
          >
            <AppText
              fontSize="18"
              color={Colors.while}
              fontFamily="content_semibold"
            >
              Customer Module
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.moduleButton,
              { backgroundColor: Colors.green, opacity: 0.8 },
            ]}
            onPress={() =>
              navigation.navigate(APP_SCREEN.WAREHOUSE_MODULE as never)
            }
          >
            <AppText
              fontSize="18"
              color={Colors.while}
              fontFamily="content_semibold"
            >
              Warehouse Module
            </AppText>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: sizes._16sdp,
    paddingBottom: sizes._24sdp,
  },
  drawerButton: {
    paddingHorizontal: sizes._16sdp,
    paddingVertical: sizes._8sdp,
    borderRadius: sizes._8sdp,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleButton: {
    width: '100%',
    paddingVertical: sizes._16sdp,
    paddingHorizontal: sizes._24sdp,
    borderRadius: sizes._12sdp,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: sizes._8sdp,
  },
});
