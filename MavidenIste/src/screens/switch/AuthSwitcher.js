import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Loading from '../components/Loading';

import AuthStore from '../../store/AuthStore';

export default class  extends Component {
    componentDidMount = async () => {
         await AuthStore.authSync();
    }

    render() {
    return (
      <View style={{backgroundColor:'#F6F6F6', display:'flex', justifyContent:'center', alignItems:'center', height: Dimensions.get('window').height}}>
          <Loading />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
