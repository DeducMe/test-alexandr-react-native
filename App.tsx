import React from 'react';
import {Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import InitialNavigator from './source/navigation/InitialNavigator';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <InitialNavigator />
    </SafeAreaProvider>
  );
}

export default App;
