import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useSelector } from '@src/common';
import { CreateFacilityScreen } from '@src/screens';
import { AppStack, AuthStack } from './AppStackNavigation';
import { APP_SCREEN, RootStackParamList } from './ScreenTypes';
const RootStack = createStackNavigator<RootStackParamList>();
export const RootNavigation = () => {
  const { accessToken } = useSelector(x => x.appReducer);
  return (
    <RootStack.Navigator>
      <>
        {!accessToken ? (
          <React.Fragment>
            <RootStack.Screen
              name={APP_SCREEN.AUTH_STACK}
              component={AuthStack}
              options={{
                animationTypeForReplace: 'pop',
                gestureEnabled: false,
                headerShown: false,
              }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <RootStack.Screen
              name={APP_SCREEN.DRAWER}
              component={AppStack}
              options={{
                animationTypeForReplace: 'pop',
                gestureEnabled: false,
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={APP_SCREEN.CREATE_FACILITY}
              component={CreateFacilityScreen}
              options={{
                animationTypeForReplace: 'pop',
                gestureEnabled: true,
                headerShown: false,
              }}
            />
          </React.Fragment>
        )}
      </>
    </RootStack.Navigator>
  );
};
