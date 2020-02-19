import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Container, Header, Button, Content, } from "native-base";

//components
import HeaderWithSearch from '../../components/HeaderWithSearch';
import Loading from '../../components/Loading';


export default class Feed extends Component {

    state = {
        loadingHeight: Dimensions.get('window').height-160,
        fetched:false
    }

  render() {
    return (
        <Container style={styles.container}>
            <HeaderWithSearch />
          <Content
              style={{display:'flex', flex:1}}
              padder>
              <View style={styles.content}>
                  {this.state.fetched
                      ?
                        <Text/>
                      :
                      <View style={[styles.loadingView, {height: this.state.loadingHeight}]}>
                          <Loading />
                      </View>
                  }
              </View>
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    loadingView:{
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    content:{
      display:'flex',
        flex:1,
    },
    container:{
        backgroundColor:'#F6F6F6',
        flex:1,
        display:'flex'
    }
});
