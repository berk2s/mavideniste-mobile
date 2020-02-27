import React, { Component } from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Title, Content} from 'native-base';
import CustomIcon from '../../../font/CustomIcon';

import { NavigationActions } from 'react-navigation';

import {observer, inject} from 'mobx-react';
import {IMAGE_URL} from '../../../constants';

@inject('BasketStore')
@observer
export default class ShopingCard extends Component {

    state = {
        fetched:false,
        datas:[]
    }

    componentDidMount = async () => {
        try{
            await this.props.BasketStore.getBasketProducts()
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
                        onPress: async () => await this.props.BasketStore.deleteBasket()
                    },
                ]
            );
        }catch(e){
            alert(e)
        }
    }

    render () {


    return (
        <Container style={styles.container}>
          <Header transparent style={styles.header}>
            <Left style={styles.leftArea}>

                <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                  <CustomIcon name="arrow-left" size={28} style={{color:'#003DFF'}} />
                </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Title style={styles.bodyTitleText}>Sepetim</Title>
            </Body>
            <Right >
                <TouchableOpacity onPress={() => this._handleBasketRemove()}>
                <View style={styles.removeBox}>
                    <Text style={styles.removeBoxText}>Sepeti Temizle</Text>
                    <CustomIcon name="trash" size={18} color={'#FF0000'} />
                </View>
                </TouchableOpacity>
            </Right>
          </Header>
          <Content
             style={{display:'flex', flex:1,}}
             padder>

              <View style={styles.basketArea}>
                  {
                          this.props.BasketStore.getProducts.map(e => {
                              const uri = IMAGE_URL+e.product_image;
                              return <View key={e.id} style={styles.basket}>
                                  <View style={styles.imageArea}>
                                      <Image
                                          source={{uri : uri}}
                                          style={styles.image}
                                      />
                                  </View>
                                  <View style={styles.infoArea}>
                                      <View style={styles.infoHead}>
                                          <Text style={styles.infoProductNameText}>{e.product_name}</Text>
                                          <TouchableOpacity>
                                              <CustomIcon name="trash" size={20} color={'#FF0000'} />
                                          </TouchableOpacity>
                                      </View>
                                      <View style={styles.infoBottom}>
                                          <View style={styles.priceArea}>
                                              <Text style={styles.priceAreaText}>{e.product_list_price}<Text style={{fontFamily:'Arial', fontSize:11}}>₺</Text></Text>
                                          </View>
                                          <View style={styles.priceCountArea}>
                                              <TouchableOpacity>
                                                  <Text style={{fontFamily:'Muli-SemiBold', fontSize:29, color:'#304555'}}>-</Text>
                                              </TouchableOpacity>
                                              <View style={styles.count}>
                                                  <Text style={{fontFamily:'Muli-Bold', fontSize:13, color:'#fff'}}>1</Text>
                                              </View>
                                              <TouchableOpacity>
                                                  <Text style={{fontFamily:'Muli-SemiBold', fontSize:29, color:'#304555'}}>+</Text>
                                              </TouchableOpacity>
                                          </View>
                                      </View>
                                  </View>
                              </View>
                          })



                  }

              </View>


              <View style={styles.actionArea}>
                  <TouchableOpacity style={{width:'55%'}}>
                      <View style={styles.resumeShopingBtn}>
                          <Text style={styles.actionText}>Alışverişe devam</Text>
                      </View>
                  </TouchableOpacity>

                  <View style={{width:'32%'}}>
                      <Text style={styles.resultCountPrice}>45 TL</Text>
                      <TouchableOpacity>
                          <View style={styles.paymentBtn}>
                              <Text style={styles.actionText}>Onayla</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>

          </Content>

        </Container>
    );
  }
}

const styles = StyleSheet.create({
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
        marginVertical:22
    },
    basketArea:{
        minHeight:'83%'
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
            height: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 7,
        elevation: 5,
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
