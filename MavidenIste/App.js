import React, {useEffect} from 'react';
import {
    StyleSheet,
    Text,
    StatusBar, Platform,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

//Router
import Router from './src/Router';

import store from './src/store/index';

import {Provider} from 'mobx-react';

import NavigationService from './src/NavigationService';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App: () => React$Node = () => {

    useEffect(() => {
        SplashScreen.hide()
    }, []);

  return (
    <Provider {...store}>
        <SafeAreaProvider>
      <Router
          ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
          }}
      />
        </SafeAreaProvider>
    </Provider>
  );
};







const styles = StyleSheet.create({

});

export default App;
