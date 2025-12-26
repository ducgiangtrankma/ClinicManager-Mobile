import { PlusIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppText,
  BottomSheetModalContainer,
  BottomSheetModalRef,
  Box,
  EmptyList,
  globalLoading,
  PageContainer,
  showErrorMessage,
  showSuccessMessage,
} from '@src/components';
import { SuggestionKey } from '@src/models';
import { SuggestionService, useSuggestionQuery } from '@src/services';
import { _screen_width, sizes } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SuggestionListItem, SuggestionTabItem } from './components';

interface TabConfig {
  key: SuggestionKey;
  title: TranslationKeys;
}

const TABS: TabConfig[] = [
  {
    key: SuggestionKey.MEDICAL_HISTORY,
    title: 'suggestion_tab_medical_history',
  },
  { key: SuggestionKey.PRE_TREATMENT, title: 'suggestion_tab_pre_treatment' },
  { key: SuggestionKey.SKIN_CONDITION, title: 'suggestion_tab_skin_condition' },
  { key: SuggestionKey.ROUTINE, title: 'suggestion_tab_routine' },
  { key: SuggestionKey.DIAGNOSTIC, title: 'suggestion_tab_diagnostic' },
  { key: SuggestionKey.NOTE, title: 'suggestion_tab_note' },
];

export const SuggestionManagerScreen: FC = () => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<SuggestionKey>(
    SuggestionKey.MEDICAL_HISTORY,
  );
  const [newSuggestion, setNewSuggestion] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tabMenuActive, setTabMenuActive] = useState<number>(0);
  const addSuggestionSheetRef = useRef<BottomSheetModalRef>(null);
  const tabMenuRef = useRef<FlatList>(null);

  const { data: suggestionsData, refetch } = useSuggestionQuery();

  const currentSuggestions = suggestionsData?.[activeTab] || [];

  useEffect(() => {
    const activeIndex = TABS.findIndex(tab => tab.key === activeTab);
    if (activeIndex !== -1 && tabMenuRef.current) {
      setTabMenuActive(activeIndex);
      tabMenuRef.current.scrollToIndex({
        animated: true,
        index: activeIndex,
        viewPosition: 0.5,
      });
    }
  }, [activeTab]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      // Error handling is done by query
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const handleOpenAddSheet = useCallback(() => {
    setNewSuggestion('');
    addSuggestionSheetRef.current?.open();
  }, []);

  const handleAddSuggestion = useCallback(async () => {
    if (!newSuggestion.trim()) return;

    try {
      globalLoading.show();
      await SuggestionService.addSuggestionToKey({
        key: activeTab,
        items: [newSuggestion.trim()],
      });
      setNewSuggestion('');
      addSuggestionSheetRef.current?.close();
      showSuccessMessage('notification', 'suggestion_add_success');
      refetch();
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [newSuggestion, activeTab, refetch]);

  const handleDeleteSuggestion = useCallback(
    async (item: string) => {
      try {
        globalLoading.show();
        await SuggestionService.deleteSuggestionByKey({
          key: activeTab,
          items: [item],
        });
        showSuccessMessage('notification', 'suggestion_delete_success');
        refetch();
      } catch (error: any) {
        showErrorMessage('error.title', error.message);
      } finally {
        globalLoading.hide();
      }
    },
    [activeTab, refetch],
  );

  const renderTabItem = useCallback(
    ({ item, index }: { item: TabConfig; index: number }) => (
      <TouchableOpacity
        onPress={() => {
          setActiveTab(item.key);
          setTabMenuActive(index);
        }}
      >
        <SuggestionTabItem
          title={item.title}
          isActive={activeTab === item.key}
        />
      </TouchableOpacity>
    ),
    [activeTab],
  );

  const renderListItem = useCallback(
    ({ item }: { item: string }) => (
      <SuggestionListItem item={item} onDelete={handleDeleteSuggestion} />
    ),
    [handleDeleteSuggestion],
  );

  const tabKeyExtractor = useCallback((item: TabConfig) => item.key, []);

  const listKeyExtractor = useCallback(
    (item: string, index: number) => `${item}-${index}`,
    [],
  );

  return (
    <PageContainer>
      <AppHeader
        title="suggestion_manager_title"
        showBack={false}
        rightContent={
          <TouchableOpacity
            onPress={handleOpenAddSheet}
            hitSlop={{
              top: sizes._12sdp,
              bottom: sizes._12sdp,
              left: sizes._12sdp,
              right: sizes._12sdp,
            }}
          >
            <PlusIcon color={Colors.green} />
          </TouchableOpacity>
        }
      />
      <Box style={styles.container}>
        {/* Tabs */}
        <Box style={[styles.tabWrapper, { backgroundColor: Colors.white }]}>
          <FlatList
            ref={tabMenuRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={TABS}
            keyExtractor={tabKeyExtractor}
            renderItem={renderTabItem}
          />
        </Box>

        {/* List */}
        <Box style={styles.listContainer}>
          <FlatList
            data={currentSuggestions}
            renderItem={renderListItem}
            keyExtractor={listKeyExtractor}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={Colors.green}
                colors={[Colors.green]}
              />
            }
            ListEmptyComponent={
              <EmptyList description="suggestion_empty_list" />
            }
            contentContainerStyle={[
              styles.listContent,
              currentSuggestions.length === 0 && styles.emptyList,
            ]}
          />
        </Box>
      </Box>

      {/* Add Suggestion Bottom Sheet */}
      <BottomSheetModalContainer
        ref={addSuggestionSheetRef}
        title="suggestion_add_button"
        currentSnapPoints={['40%']}
      >
        <Box style={styles.sheetContent}>
          <Box gap={sizes._16sdp} style={{ marginTop: sizes._16sdp }}>
            <AppText
              translationKey="suggestion_add_placeholder"
              fontFamily="content_regular"
              fontSize="14"
            />
            <AppInput
              value={newSuggestion}
              onChangeText={setNewSuggestion}
              placeholder={t('suggestion_add_placeholder')}
              clearButtonMode="while-editing"
            />
            <AppButton
              title="suggestion_add_button"
              onPress={handleAddSuggestion}
              disabled={!newSuggestion.trim()}
              style={styles.confirmButton}
            />
          </Box>
        </Box>
      </BottomSheetModalContainer>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabWrapper: {
    width: _screen_width,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: sizes._8sdp,
    paddingBottom: sizes._16sdp,
  },
  emptyList: {
    flex: 1,
  },
  sheetContent: {
    paddingHorizontal: sizes._16sdp,
    paddingBottom: sizes._16sdp,
  },
  confirmButton: {
    borderRadius: sizes._12sdp,
    marginTop: sizes._8sdp,
  },
});
