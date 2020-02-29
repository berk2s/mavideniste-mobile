import React, { Component } from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Container, Content, Header, Left, Title} from 'native-base';
import CustomIcon from '../../../font/CustomIcon';
import SwitcherStore from '../../../store/SwitcherStore';
import Switcher from '../switcher/Switcher';
import LoginIMG from '../../../img/login.png';
import {observer} from 'mobx-react'

import BakeryIMG from '../../../img/bakery.png'
import FishIMG from '../../../img/fish.png'
import CheeseIMG from '../../../img/cheese.png'
import FruitIMG from '../../../img/fruit.png'
import MilkIMG from '../../../img/milk.png'
import VegetableIMG from '../../../img/vegetable.png'
import LogoIMG from '../../../img/logo.png'
import Spinner from 'react-native-loading-spinner-overlay';

@observer
export default class Currier extends Component {

  state={
    loading:false,
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
          <Header transparent>
            <Body style={styles.body}>
              <Title style={styles.bodyTitleText}>mavi<Text style={{color:'#00CFFB'}}>kurye</Text></Title>
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
              style={{display:'flex', flex:1,}}
              padder>

            <View style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
              <View style={styles.circleArea}>

                <View style={styles.circleTop}>
                  <View style={styles.circle}>
                    <Image
                      source={BakeryIMG}
                      />
                  </View>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Fırın</Text>
                </View>

                <View style={styles.circleTop}>
                  <View style={styles.circle}>
                    <Image
                        source={FishIMG}
                    />
                  </View>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Balık</Text>
                </View>

                <View style={styles.circleTop}>
                  <View style={styles.circle}>
                    <Image
                        source={CheeseIMG}
                    />
                  </View>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Peynir</Text>
                </View>

                <View style={styles.circleTop}>
                  <View style={styles.circle}>
                    <Image
                        source={FruitIMG}
                    />
                  </View>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Meyve</Text>
                </View>

                <View style={styles.circleTop}>
                  <View style={styles.circle}>
                    <Image
                        source={MilkIMG}
                    />
                  </View>
                    <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Süt</Text>
                </View>

                <View style={styles.circleTop}>
                  <View style={styles.circle}>
                    <Image
                        source={VegetableIMG}
                    />
                  </View>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Sebze</Text>
                </View>

              </View>
            </View>

            <View style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:-5}}>

              <TouchableOpacity>
                <View style={{display:'flex', justifyContent:'center',alignItems: 'center'}}>
                  <Image
                      source={LogoIMG}
                      style={{width:99, height:92}}
                    />
                    <Text style={{fontFamily: 'Muli-Regular', color:'#00CFFF', textAlign:'center', width:150, marginTop:20}}>Butona basarak isteklerinizi konuşarak anlatabilirsiniz.</Text>
                </View>
              </TouchableOpacity>

            </View>

          </Content>

        </Container>
    );
  }
}

const styles = StyleSheet.create({
  circleTop:{
    marginBottom:50,
    width:'33%',
    display:'flex',
    justifyContent:'center',
    alignItems: 'center'
  },
  circle:{
    width:82,
    height:82,
    borderRadius:50,
    borderColor:'#003DFF',
    borderWidth:1,
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
  },
  circleArea:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    flexWrap:'wrap',
  },
  bodyTitleText:{
    fontFamily:'Muli-ExtraBold',
    color:'#003DFF'
  }
});
