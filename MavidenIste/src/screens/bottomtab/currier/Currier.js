import React, { Component } from 'react';
import {Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Container, Content, Header, Left, Title} from 'native-base';
import CustomIcon from '../../../font/CustomIcon';

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
import EmptyHeader from '../../components/EmptyHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

import BagelImg from '../../../img/currier/bagel.png'
import PastaImg from '../../../img/currier/cake.png'
import ScaleImg from '../../../img/currier/scale.png'
import PharmacyImg from '../../../img/currier/pharmacy.png'
import Kargomg from '../../../img/currier/truck.png'
import Cosmetic from '../../../img/currier/eye-makeup.png'
import Soup from '../../../img/currier/soup.png'
import Coffe from '../../../img/currier/food.png'
import Burger from '../../../img/currier/burguer.png'
import Pizza from '../../../img/currier/pizza.png'
import Kebab from '../../../img/currier/kebab.png'
import Waffle from '../../../img/currier/waffles.png'
import Comp from '../../../img/currier/laptop.png'
import Adapter from '../../../img/currier/adapter.png'
import Cablo from '../../../img/currier/hdmi-cable.png'
import Silicon from '../../../img/currier/silicone.png'
import Terzi from '../../../img/currier/sew.png'
import Petshop from '../../../img/currier/petshop.png'
import Vitamin from '../../../img/currier/vitamins.png'
import Sports from '../../../img/currier/sports.png'
import Sexual from '../../../img/currier/sex.png'
import Tahta from '../../../img/currier/clean.png'
import Evesya from '../../../img/currier/evesya.png'
import Belge from '../../../img/currier/belge.png'
import Doc from '../../../img/currier/doc.png'

@observer
export default class Currier extends Component {

  state={
    loading:false,
    visibleAddress:false
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
                headers:{
                  'x-access-token': AuthStore.getToken
                }
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
  }

  componentDidMount() {
    this.setState({
      visibleAddress:false,
    });


  }

  render() {
    return (
        <SafeAreaView style={[styles.container, {backgroundColor:'#F6F6F6', flex:1}]}>

          <EmptyHeader>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', flex:1}}>
              <Title style={{fontFamily:'Muli-ExtraBold', color:'#003DFF'}}>
                <Text style={{textAlign:'center'}}>
                  <Text style={{color:'#003DFF'}}>mavi</Text><Text style={{color:'#00CFFF'}}>kuryem</Text>
                </Text>
              </Title>
            </View>
          </EmptyHeader>

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
                      source={BagelImg}
                      style={{width:50, height:50}}
                      />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Taze sıcak</Text>
                </View>

                <View style={styles.circleTop}>
                      <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                        <Image
                          source={PastaImg}
                          style={{width:50, height:50}}
                        />
                      </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Pasta</Text>
                </View>

                <View style={styles.circleTop}>
                    <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                      <Image
                          source={ScaleImg}
                          style={{width:50, height:50}}
                      />
                    </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Kasap</Text>
                </View>

                <View style={styles.circleTop}>
                    <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                      <Image
                          source={PharmacyImg}
                          style={{width:50, height:50}}
                      />
                    </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Eczane</Text>
                </View>

                <View style={styles.circleTop}>
                      <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                        <Image
                            source={Kargomg}
                            style={{width:50, height:50}}
                        />
                      </Ripple>
                    <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Kargo</Text>
                </View>

                <View style={styles.circleTop}>
                    <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                      <Image
                          source={Cosmetic}
                          style={{width:50, height:50}}
                      />
                    </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Kozmetik</Text>
                </View>

              </View>

              <View style={styles.circleArea}>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Soup}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Çorba</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Coffe}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Kahve</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Burger}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Hamburger</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Pizza}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Pizza</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Kebab}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Dürüm</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Waffle}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Waffle</Text>
                </View>

              </View>

              <View style={styles.circleArea}>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Comp}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Bilgisayar</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Adapter}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', width:'100%',color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Telefon</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Cablo}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Kablo</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Silicon}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Nalbur</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Terzi}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Terzi</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Petshop}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Petshop</Text>
                </View>

              </View>

              <View style={styles.circleArea}>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Vitamin}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Sağlık</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Sports}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Sporcu gıdası</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Sexual}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Cinsel ürünler</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Tahta}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Tahtakale</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Belge}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Belge</Text>
                </View>

                <View style={styles.circleTop}>
                  <Ripple rippleContainerBorderRadius={50} style={styles.circle} onPress={this._handlePress}>
                    <Image
                        source={Doc}
                        style={{width:50, height:50}}
                    />
                  </Ripple>
                  <Text style={{fontFamily: 'Muli-ExtraBold', color:'#304555', fontSize:15, textAlign:'center', marginTop:7}}>Doküman</Text>
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

        </SafeAreaView>
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
