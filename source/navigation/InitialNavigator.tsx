import React from 'react';

import useTheme from '../hooks/useTheme';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';

import DefaultStackNavigator from './DefaultStackNavigator';
import {AppProvider} from '../providers/AppProvider';
export const navigationRef = createNavigationContainerRef();

const InitialNavigator: React.FC<IAppProps> = props => {
  const theme = useTheme();

  return (
    <NavigationContainer ref={navigationRef}>
      <AppProvider>
        <DefaultStackNavigator />
      </AppProvider>
    </NavigationContainer>
  );
};
export interface IAppProps {}
export default InitialNavigator;
