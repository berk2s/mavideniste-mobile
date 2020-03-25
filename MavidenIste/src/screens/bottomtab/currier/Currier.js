import React, { Component } from 'react';
import {Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

import Swiper from 'react-native-swiper'
import Ripple from 'react-native-material-ripple';
import Modal, {ModalContent} from 'react-native-modals';
import Coupon from '../shopingcart/apply_order/coupon/Coupon';
import BranchIMG from '../../../img/supermarket.png';
import AddressStore from '../../../store/AddressStore';

import AuthStore from '../../../store/AuthStore';
import Snackbar from 'react-native-snackbar';
import API from '../../../api';
import BranchStore from '../../../store/BranchStore';

@observer
export default class Currier extends Component {

  state={
    loading:false,
    visibleAddress:false
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

  _handlePress = () => {

    if(AuthStore.getUserID == null){

      this.props.navigation.navigate('Profile');

      Snackbar.show({
        text: 'Devam etmek için giriş yapın',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor:'#FF9800',
        textColor:'white',
      });

      return false;
    }

    this.setState({
      visibleAddress:true,
    });

  }

  _handleAddressPress = async (e) => {
    const addressid = e._id;
    Alert.alert(
        'Mavi Kurye',
        'Kurye talep işleminizi onaylıyor musunuz?',
        [
          {
            text: 'Hayır',
            style: 'cancel',
          },
          {   text: 'Evet',
            onPress: async () => {
              this.setState({
                loading:true,
              });

              const sendOrder = await API.post('/api/orders', {
                user_id: AuthStore.getUserID,
                user_address: e,
                payload_type: null,
                products: null,
                price: null,
                order_note: null,
                is_bluecurrier: true,
                coupon: null,
                branch_id:BranchStore.branchID,
              }, {
                'x-access-token': AuthStore.getToken
              });

              Snackbar.show({
                text: 'İstekleriniz için sizi az sonra arayacağız',
                duration: 7000,
                backgroundColor:'#4CAF50',
                textColor:'white',
              });

              this.setState({
                loading:false,
                visibleAddress:false,
              });

            }
          },
        ]
    );
    alert(addressid)
  }

  componentDidMount() {
    this.setState({
      visibleAddress:false,
    });


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

            <Modal
                visible={this.state.visibleAddress}
                onTouchOutside={(event) => {
                  this.setState({ visibleAddress: false });
                }}
            >
              <ModalContent style={{width:270, height:270,}}>
                <View style={[{borderBottomColor: '#fff', marginVertical:0, marginBottom:0, paddingBottom:0}]}>
                  <Text style={{fontFamily:'Muli-Bold', color:'#304555', marginBottom:10, fontSize:16}}>Bir adres seçin</Text>
                </View>
                <View style={{height:200}}>
                  <Text style={{fontFamily:'Muli-Regular', color:'#304555', fontSize:12}}>Devam etmek için bir adres seçin</Text>

                  {
                    AddressStore.getAddress.length > 0
                        ?
                        <View style={{marginTop:10}}>
                            {AddressStore.getAddress.map(e => {
                            return <Ripple style={{height:40, display:'flex', justifyContent:'center'}} onPress={() => this._handleAddressPress(e)}>
                              <Text style={styles.selectAddressTitle}>{e.address_title}</Text>
                            </Ripple> })}
                        </View>
                        :
                        <View style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>

                          <Text style={{fontFamily:'Muli-Regular', color:'#304555', fontSize:14}}>Hiç adresin yok</Text>
                          <TouchableOpacity style={{marginTop:10}} onPress={() => {
                            this.setState({
                              visibleAddress:false,
                            });

                            this.props.navigation.navigate('Profile');
                          }}><Text style={{fontFamily:'Muli-Bold', color:'#00CFFF', fontSize:14}}>Adres ekle</Text></TouchableOpacity>

                        </View>

                  }


                </View>
              </ModalContent>
            </Modal>

            <View style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
            <Swiper autoplay={true} autoplayTimeout={2.5} showsPagination={true} style={{height:320}}>
              <View style={styles.circleArea}>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                      source={BakeryIMG}
                      />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Fırın</Text>
                </View>

                <View style={styles.circleTop}>
                      <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                        <Image
                          source={FishIMG}
                        />
                      </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Balık</Text>
                </View>

                <View style={styles.circleTop}>
                    <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                      <Image
                          source={CheeseIMG}
                      />
                    </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Peynir</Text>
                </View>

                <View style={styles.circleTop}>
                    <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                      <Image
                          source={FruitIMG}
                      />
                    </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Meyve</Text>
                </View>

                <View style={styles.circleTop}>
                      <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                        <Image
                            source={MilkIMG}
                        />
                      </Ripple>
                    <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Süt</Text>
                </View>

                <View style={styles.circleTop}>
                    <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                      <Image
                          source={VegetableIMG}
                      />
                    </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Sebze</Text>
                </View>

              </View>

              <View style={styles.circleArea}>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={BakeryIMG}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Fırın</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={FishIMG}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Balık</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={CheeseIMG}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Peynir</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={FruitIMG}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Meyve</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={MilkIMG}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Süt</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={VegetableIMG}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Sebze</Text>
                </View>

              </View>
            </Swiper>
            </View>

            <View style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:-5}}>

              <View>
                <View style={{display:'flex', justifyContent:'center',alignItems: 'center'}}>

                  <Text style={{fontFamily: 'Muli-Regular', color:'#00CFFF', textAlign:'center', width:300,}}>Kurye istekleriniz için yukarıdan seçebilir</Text>
                  <Text style={{fontFamily: 'Muli-Bold', color:'#00CFFF', textAlign:'center', width:300,}}>veya</Text>
                  <Text style={{fontFamily: 'Muli-Regular', color:'#00CFFF', textAlign:'center', width:300, marginBottom:20}}>özel istekleriniz için butona basabilirsiniz</Text>

                  <TouchableOpacity onPress={this._handlePress}>
                    <Image
                        source={LogoIMG}
                        style={{width:99, height:92}}
                      />
                  </TouchableOpacity>
                </View>
              </View>

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
    height:300
  },
  bodyTitleText:{
    fontFamily:'Muli-ExtraBold',
    color:'#003DFF'
  }
});
