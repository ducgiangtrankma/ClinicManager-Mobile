import { AppText, Box } from '@src/components';
import { RevenueStoreEntity } from '@src/models';
import React, { FC } from 'react';
import { SummaryContent } from './SummaryContent';
import { sizes } from '@src/utils';
import { useAppTheme } from '@src/common';

interface Props {
  store: RevenueStoreEntity;
}
export const DetailRevenue: FC<Props> = ({ store }) => {
  const { Colors } = useAppTheme();
  return (
    <Box
      style={{
        borderBottomWidth: sizes._1sdp,
        borderBottomColor: Colors.grayBackground,
        paddingBottom: sizes._16sdp,
        gap: sizes._6sdp,
      }}
    >
      <AppText
        fontSize="16"
        fontFamily="content_bold"
        style={{ marginBottom: sizes._8sdp }}
      >
        {store.storeName}:
      </AppText>
      <SummaryContent
        title="totalExpectedRevenue"
        value={store.expectedRevenue}
      />
      <SummaryContent title="totalActualRevenue" value={store.actualRevenue} />
      <SummaryContent title="totalProfit" value={store.profit} />
      <SummaryContent title="averageProfitMargin" value={store.profitMargin} />
      <SummaryContent title="totalCost" value={store.totalCost} />
      <SummaryContent title="totalDebt" value={store.totalDebt} />
    </Box>
  );
};
