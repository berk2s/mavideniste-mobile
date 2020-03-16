import React, { Component } from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Platform} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Title, Content, Card} from 'native-base';
import CustomIcon from '../../../font/CustomIcon';
import FastImage from 'react-native-fast-image';

import {NavigationActions, NavigationEvents} from 'react-navigation';

import {observer, inject} from 'mobx-react';
import {IMAGE_URL} from '../../../constants';

import EmptyIMG from '../../../img/empty.png'
import Spinner from 'react-native-loading-spinner-overlay';
import SwitcherStore from '../../../store/SwitcherStore';
import Switcher from '../switcher/Switcher';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BasketStore from '../../../store/BasketStore';
import Ripple from 'react-native-material-ripple';
import API from '../../../api';
import AuthStore from '../../../store/AuthStore';


@inject('BasketStore', 'AuthStore')
@observer
export default class ShopingCard extends Component {

    state = {
        fetched:false,
        datas:[],
        loading: false,
        totalPrice: 0,
    }

    componentDidMount = async () => {
        try{
            this.setState({
                loading:true,
            });

            await this.props.BasketStore.readyProducts()

            setTimeout(() => {
                this.setState({
                    loading:false,
                    fetched:true,
                    totalPrice: this.props.BasketStore.totalPrice
                });


            }, 1000)

        }catch(e){
            alert(e)
        }
    }

    _handleBasketRemove = async () => {
        try{
            Alert.alert(
                'Sepeti Temizle',
                'Sepeti temizlemeye emin misiniz?',
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

                            await this.props.BasketStore.clearBasket()
                            setTimeout(async () => {
                                this.setState({
                                    loading:false,
                                    fetched:true
                                });
                            }, 1000);
                        }
                    },
                ]
            );
        }catch(e){
            alert(e)
        }
    }

    _handleProductRemove = async (id) => {
        try{
            this.setState({
                loading:true,
               // fetched:false
            });

            await this.props.BasketStore.removeFromBasket(id);

            setTimeout(() => {
                this.setState({
                    loading:false,
                 //   fetched:true
                });
            }, 1000)

        }catch(e){
            alert(e);
        }
    }

    _handleProductDecrement = async (id, count) => {
        try{
            if(count > 1) {
                this.setState({
                    loading: true,
                });
                await this.props.BasketStore.decrementProduct(id);
                setTimeout(async () => {

                    this.setState({
                        loading: false,
                        totalPrice: this.props.BasketStore.totalPrice
                    });
                }, 600);
            }
        }catch(e){
            alert(e);
        }
    }

    _handleProductIncrement = async (id) => {
        try{
            this.setState({
                loading:true,
            });
            await this.props.BasketStore.incrementProduct(id);
            setTimeout(async () => {

                this.setState({
                    loading:false,
                    totalPrice: this.props.BasketStore.totalPrice
                });
            }, 600)
        }catch(e){
            alert(e);
        }
    }

    _handleCurrierClick = () => {
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

    _handleGoAheadClick = async () => {
        try{
            this.setState({
                loading:true,
            });

            if(this.props.AuthStore.token !== null){
                this.props.navigation.navigate('ApplyOrder')
            }else{
                this.props.navigation.navigate('Profile')
            }

            this.setState({
                loading:false,
            });

        }catch(e){
            console.log(e);
        }
    }

    render () {

    return (
        <Container style={styles.container}>
          <SafeAreaView transparent style={styles.header}>
            <Left style={styles.leftArea}>


                <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack(null)}>
                  <CustomIcon name="arrow-left" size={28} style={{color:'#003DFF', marginTop:2}} />
                </TouchableOpacity>


            </Left>
            <Body style={styles.body}>
              <Title style={styles.bodyTitleText}>Sepetim</Title>
            </Body>
            <Right>
                {
                    this.state.fetched
                        ?
                            this.props.BasketStore.getProducts.length == 0
                                ?
                                <></>
                                :
                                <TouchableOpacity onPress={() => this._handleBasketRemove()}>
                                    <View style={styles.removeBox}>
                                        <Text style={styles.removeBoxText}>Sepeti Temizle</Text>
                                        <CustomIcon name="trash" size={18} color={'#FF0000'} />
                                    </View>
                                </TouchableOpacity>
                        :
                        <></>
                }
            </Right>
          </SafeAreaView>
            {
                SwitcherStore.isSwitcherClicked
                    ?
                    <Switcher
                        clickEvent={this._handleCurrierClick}
                    />
                    :
                    <></>
            }

          <Content
             style={{display:'flex', flex:1,}}
             padder>
              <Spinner
                  visible={this.state.loading}
                  animation={'fade'}
                  size={'small'}
              />

              <View style={[styles.basketArea, {minHeight: Dimensions.get('window').height-245}]}>

                  {
                      this.state.fetched
                          ?
                          this.props.BasketStore.getProducts.length == 0
                              ?
                              <View style={{display:'flex', height:Dimensions.get('window').height-200, justifyContent:'center', alignItems:'center'}}>
                                  <Image source={EmptyIMG} style={{width:80, height:80}}/>
                                  <Text style={{fontFamily:'Muli-ExtraBold', marginTop: 15, fontSize:20, color:'#304555'}}>Hiç ürün yok</Text>
                                  <Text style={{fontFamily:'Muli-SemiBold', marginTop:5, fontSize:15, color:'#304555'}}>maviden iste, ayağına gelsin.</Text>
                              </View>
                              :
                              this.props.BasketStore.getProducts.map(e => {
                                  const uri = IMAGE_URL+e.product_image;
                                  return <View key={e.id} style={styles.basket}>
                                      <View style={styles.imageArea}>
                                          <FastImage
                                              source={{uri : uri}}
                                              style={styles.image}
                                          />
                                      </View>
                                      <View style={styles.infoArea}>
                                          <View style={styles.infoHead}>
                                              <Text style={styles.infoProductNameText}>{e.product_name}</Text>
                                              <TouchableOpacity onPress={() => this._handleProductRemove(e.id)}>
                                                  <CustomIcon name="trash" size={20} color={'#FF0000'} />
                                              </TouchableOpacity>
                                          </View>
                                          <View style={styles.infoBottom}>
                                              <View style={styles.priceArea}>
                                                  <Text style={styles.priceAreaText}>
                                                      {e.product_discount == null ? e.product_list_price : e.product_discount_price} <Text style={{fontFamily:'Arial', fontSize:11}}>₺</Text></Text>
                                              </View>
                                              <View style={styles.priceCountArea}>
                                                  <TouchableOpacity onPress={() => this._handleProductDecrement(e.id, e.count)}>
                                                      <Text style={{fontFamily:'Muli-SemiBold', fontSize:29, color:'#304555'}}>-</Text>
                                                  </TouchableOpacity>
                                                  <View style={styles.count}>
                                                      <Text style={{fontFamily:'Muli-Bold', fontSize:13, color:'#fff'}}>{e.count}</Text>
                                                  </View>
                                                  <TouchableOpacity onPress={() => this._handleProductIncrement(e.id)}>
                                                      <Text style={{fontFamily:'Muli-SemiBold', fontSize:29, color:'#304555'}}>+</Text>
                                                  </TouchableOpacity>
                                              </View>
                                          </View>
                                      </View>
                                  </View>
                              })
                          :
                          <></>

                  }

              </View>

              {
                  this.state.fetched
                      ?
                      this.props.BasketStore.getProducts.length == 0
                          ?
                          <></>
                          :
                          <View style={styles.actionArea}>
                              <Ripple  rippleDuration={1000} rippleColor={'#000'} style={{width:'55%'}} onPress={() => this.props.navigation.navigate('Feed')}>
                                  <View style={styles.resumeShopingBtn}>
                                      <Text style={styles.actionText}>Alışverişe devam</Text>
                                  </View>
                              </Ripple>

                              <View style={{width:'32%'}}>
                                  <Text style={styles.resultCountPrice}>{this.props.BasketStore.getTotalPrice} TL</Text>
                                  <Ripple  onPress={this._handleGoAheadClick} rippleDuration={1000} rippleColor={'#fff'}>
                                      <View style={styles.paymentBtn}>
                                          <Text style={styles.actionText}>Onayla</Text>
                                      </View>
                                  </Ripple>
                              </View>
                          </View>
                      :
                      <></>
              }


          </Content>

        </Container>
    );
  }
}

const styles = StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        height:Platform.OS == 'ios' ? 70 : 50,
        paddingLeft:10,
        paddingRight:10,
    },
    resultCountPrice:{
      position:'absolute',
        top:-35,
        right:5,
        fontFamily:'Muli-Light',
        color:'#304555',
        fontSize:22
    },
    paymentBtn:{
        backgroundColor:'#003DFF',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:38,
        borderRadius:18,

    },
    actionText:{
        fontFamily:'Muli-Bold',
        color:'#fff',
        fontSize:18
    },
    resumeShopingBtn:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1BD4FE',
        width:'100%',
        height:38,
        borderRadius:18
    },
    actionArea:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
        width:'100%',
        marginTop:52
    },
    basketArea:{
       // minHeight:'80%'
    },
    count:{
        width:23,
        height:25,
        backgroundColor:'#00CFFF',
        borderRadius:3,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5
    },
    priceCountArea:{
      display:'flex',
        flexDirection:'row',
      justifyContent:'space-between',
        alignItems:'center',
        width:'45%'
    },
    priceAreaText:{
        fontFamily:'Muli-Bold',
        color:'#fff',
        fontSize:13
    },
    priceArea:{
        backgroundColor:'#003DFF',
        width:'40%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:25,
        borderRadius:8,
        marginTop:5
    },
    infoBottom:{
      display:'flex',
        width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
        alignItems:'center'
    },
    infoProductNameText:{
        width:'85%',
      fontFamily:'Muli-Bold',
        color:'#304555',
        fontSize:11,
    },
    infoHead:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    infoArea:{
        width:'48%',
        padding:10,
        display:'flex',
        justifyContent:'space-between'
    },
    image:{
      height:139,
      borderRadius:15
    },
    imageArea:{
      width:'52%'
    },
    basket:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        height:139,
        backgroundColor:'#fff',
        borderRadius:15,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 2,
        marginBottom:30
    },
    removeBoxText:{
        fontFamily:'Muli-ExtraBold',
        color:'#FF0000',
        fontSize:9
    },
    removeBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#fff',
        height:28,
        width:96,
        backgroundColor:'#fff',
        borderRadius:25,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 7,
        elevation: 5,
    },
    container:{
        backgroundColor:'#F6F6F6',
        flex:1,
        display:'flex'
    },
    rightArea:{
      maxWidth:'65%'
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
        maxWidth:'22%'
    }
});
