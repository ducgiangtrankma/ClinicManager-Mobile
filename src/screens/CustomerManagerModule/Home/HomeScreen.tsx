import {
  AppHeader,
  AppText,
  PageContainer,
  TabbarPlusButton,
} from '@src/components';

import React, { FC } from 'react';

interface Props {}
export const CustomerHomeScreen: FC<Props> = () => {
  return (
    <PageContainer>
      <AppHeader title="customer.home.title" showBack={false} />
      <AppText translationKey="customer.home.title" />
      <TabbarPlusButton />
    </PageContainer>
  );
};
