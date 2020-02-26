import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

//Router
import Router from './src/Router';

import NavigationService from './src/NavigationService';


const App: () => React$Node = () => {

    useEffect(() => {
        SplashScreen.hide()
    }, []);

  return (
    <>
      <Router
          ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
          }}
      />
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
