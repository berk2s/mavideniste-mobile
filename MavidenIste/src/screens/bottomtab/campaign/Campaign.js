import React, { Component } from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Body, Container, Content, Header, Left, Title} from 'native-base';
import SwitcherStore from '../../../store/SwitcherStore';
import Switcher from '../switcher/Switcher';

import { observer } from 'mobx-react';
import CustomIcon from '../../../font/CustomIcon';
import Spinner from 'react-native-loading-spinner-overlay';
import LoginIMG from '../../../img/login.png';

@observer
export default class Campaign extends Component {

  state ={
    loading:false
  }

  _clickEvent = () => {
    this.setState({
      loading:true,
    });

    setTimeout(() => {
      if(SwitcherStore.whichSwitcher == 0) {
        this.props.navigation.navigate('Currier');
        SwitcherStore.setWhichSwitcher(1);
      }else {
        this.props.navigation.navigate('Category');
        SwitcherStore.setWhichSwitcher(0);
      }
      this.setState({
        loading:false,
      });

    }, 300)
  }

  render() {
    return (
        <Container style={[styles.container, {backgroundColor:'#F6F6F6'}]}>
          <Header transparent style={styles.header}>
            <Left style={styles.leftArea}>

              <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                <CustomIcon name="arrow-left" size={28} style={{color:'#003DFF'}} />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Title style={styles.bodyTitleText}>Kampanyalar</Title>
            </Body>
            <Body>
            </Body>

          </Header>

          {
            SwitcherStore.isSwitcherClicked
                ?
                <Switcher
                    clickEvent={this._clickEvent}
                />
                :
                <></>
          }
          <Spinner
              visible={this.state.loading}
              animation={'fade'}
              size={'small'}
          />
          <Content
              style={{display:'flex', flex:1, }}
              padder>


            <View style={styles.campaignArea}>
              <View style={styles.campaignCard}>
                <View style={styles.shadowImage}>
                  <Image
                    source={{uri: 'https://cdn.webrazzi.com/uploads/2015/08/getir-algida-kampanya-gorseli.jpg'}}
                    style={styles.campaignImage}
                  />
                </View>
                <View style={styles.campaingTextArea}>
                  <Text style={styles.campaignText}>10 Mart'a kadar yapacağınız alışverişlerde %10 indirim!</Text>
                </View>
              </View>
            </View>

            <View style={styles.campaignArea}>
              <View style={styles.campaignCard}>
                <View style={styles.shadowImage}>
                  <Image
                      source={{uri: 'https://cdn.webrazzi.com/uploads/2015/08/getir-algida-kampanya-gorseli.jpg'}}
                      style={styles.campaignImage}
                  />
                </View>
                <View style={styles.campaingTextArea}>
                  <Text style={styles.campaignText}>10 Mart'a kadar yapacağınız alışverişlerde %10 indirim!</Text>
                </View>
              </View>
            </View>


            <View style={styles.campaignArea}>
              <View style={styles.campaignCard}>
                <View style={styles.shadowImage}>
                  <Image
                      source={{uri: 'https://cdn.webrazzi.com/uploads/2015/08/getir-algida-kampanya-gorseli.jpg'}}
                      style={styles.campaignImage}
                  />
                </View>
                <View style={styles.campaingTextArea}>
                  <Text style={styles.campaignText}>10 Mart'a kadar yapacağınız alışverişlerde %10 indirim!</Text>
                </View>
              </View>
            </View>


            <View style={styles.campaignArea}>
              <View style={styles.campaignCard}>
                <View style={styles.shadowImage}>
                  <Image
                      source={{uri: 'https://cdn.webrazzi.com/uploads/2015/08/getir-algida-kampanya-gorseli.jpg'}}
                      style={styles.campaignImage}
                  />
                </View>
                <View style={styles.campaingTextArea}>
                  <Text style={styles.campaignText}>10 Mart'a kadar yapacağınız alışverişlerde %10 indirim!</Text>
                </View>
              </View>
            </View>



          </Content>

        </Container>
    );
  }
}

const styles = StyleSheet.create({
  campaignText:{
    fontFamily: 'Muli-SemiBold',
    color:'#304555',
    fontSize:14
  },
  campaingTextArea:{
    paddingHorizontal:15,
    paddingVertical:10
  },
  shadowImage:{
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 5,
  },
  campaignImage:{
    width:'100%',
    height:172,
    borderRadius: 15,

  },
  campaignCard:{
    width:'100%',
    minHeight:225,
    borderRadius:15,
    backgroundColor:'#fff',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:40
  },
  campaignArea:{
    display:'flex',
    justifyContent:'center',
    alignItems: 'center'
  },
  bodyTitleText:{
    fontFamily:'Muli-ExtraBold',
    color:'#003DFF'
  },
  leftArea:{
    maxWidth:'15%'
  },
  backBtn:{
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  body:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    maxWidth:'82%'
  }
});
