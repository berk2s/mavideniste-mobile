import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

const App: () => React$Node = () => {

    useEffect(() => {
        SplashScreen.hide()
    }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <Text>asd</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
