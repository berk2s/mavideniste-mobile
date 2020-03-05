import React, { Component } from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Container, Content, Header, Left, Title} from 'native-base';
import CustomIcon from '../../../../../font/CustomIcon';
import SwitcherStore from '../../../../../store/SwitcherStore';
import Switcher from '../../../switcher/Switcher';
import Spinner from 'react-native-loading-spinner-overlay';
import EmptyIMG from '../../../../../img/noorder.png';
import Ripple from 'react-native-material-ripple';

import OrderWaiting from '../../../../../img/waiting_order.png';
import OrderPreparing from '../../../../../img/orderpre.png';
import OrderEnroute from '../../../../../img/delivery-man.png';
import NextIMG from '../../../../../img/next.png';
import DoneIMG from '../../../../../img/tick.png';
import CancelIMG from '../../../../../img/cross.png';


export default class OrderList extends Component {

  state = {
    loading:false
  }


  /*

   <View style={{display:'flex', height:Dimensions.get('window').height-200, justifyContent:'center', alignItems:'center'}}>
      <Image source={EmptyIMG} style={{width:90, height:90}}/>
      <Text style={{fontFamily:'Muli-ExtraBold', marginTop: 15, fontSize:20, color:'#304555'}}>Hiç siparişin yok</Text>
      <Text style={{fontFamily:'Muli-SemiBold', marginTop:5, fontSize:15, color:'#304555'}}>maviden iste, ayağına gelsin</Text>
   </View>

   */
  render() {
    return (
        <Container style={[styles.container, {backgroundColor:'#F6F6F6'}]}>
          <Header transparent style={styles.header}>
            <Left style={styles.leftArea}>

              <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack(null)}>
                <CustomIcon name="arrow-left" size={28} style={{color:'#003DFF'}} />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Title style={styles.bodyTitleText}>Siparişlerim</Title>
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

            <View style={styles.orderList}>

              <View style={styles.currentOrders}>


                <View style={styles.currentOrdersListArea}>

                  <View style={styles.orderCard}>

                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>Sipariş - #5912321</Text>
                      <Text style={styles.cardHeaderText2}>Başyazıcı dana eti afyon sucuğu 500g ve 4 ürün daha</Text>
                    </View>


                    <View style={styles.orderStatus}>

                      <Image
                        source={OrderWaiting}
                        style={styles.orderImage}
                      />

                      <Text style={styles.orderStatusText}>Onay bekliyor</Text>

                    </View>

                    <View style={styles.cardBottom}>

                      <Ripple onPress={() => this.props.navigation.navigate('OrderDetail')}>
                        <View style={styles.detailOrder}>
                          <Text style={styles.detailOrderText}>Detaylar</Text>
                        </View>
                      </Ripple>

                    </View>

                  </View>
                  <View style={styles.orderCard}>

                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>Sipariş - #5912321</Text>
                      <Text style={styles.cardHeaderText2}>Başyazıcı dana eti afyon sucuğu 500g ve 4 ürün daha</Text>
                    </View>


                    <View style={styles.orderStatus}>

                      <Image
                          source={OrderEnroute}
                          style={styles.orderImage}
                      />

                      <Text style={styles.orderStatusText}>Siparişin yolda!</Text>

                    </View>

                    <View style={styles.cardBottom}>

                      <Ripple>
                        <View style={styles.detailOrder}>
                          <Text style={styles.detailOrderText}>Detaylar</Text>
                        </View>
                      </Ripple>

                    </View>

                  </View>
                  <View style={styles.orderCard}>

                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>Sipariş - #5912321</Text>
                      <Text style={styles.cardHeaderText2}>Başyazıcı dana eti afyon sucuğu 500g ve 4 ürün daha</Text>
                    </View>


                    <View style={styles.orderStatus}>

                      <Image
                          source={OrderPreparing}
                          style={styles.orderImage}
                      />

                      <Text style={styles.orderStatusText}>Hazırlanıyor</Text>

                    </View>

                    <View style={styles.cardBottom}>

                      <Ripple>
                        <View style={styles.detailOrder}>
                          <Text style={styles.detailOrderText}>Detaylar</Text>
                        </View>
                      </Ripple>

                    </View>

                  </View>

                </View>

              </View>

              <View style={styles.currentOrders}>

                <View style={styles.infoTextArea}>
                  <Text style={styles.infoText}>Geçmiş Siparişler</Text>
                </View>

                <View style={styles.currentOrdersListArea}>

                  <View style={styles.orderCard}>

                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>Sipariş - #5912321</Text>
                      <Text style={[styles.cardHeaderText2, {marginVertical:10}]}>16 Mayıs 2020, 5 ürün, 14:50</Text>
                    </View>

                    <View style={[styles.orderStatus, {marginVertical: 0, paddingVertical:0}]}>

                      <Image
                          source={DoneIMG}
                          style={[styles.orderImage, {width:20, height:20}]}
                      />

                      <Text style={styles.orderStatusText}>Teslim edildi!</Text>

                    </View>

                    <View style={styles.nextArrowArea}>
                      <TouchableOpacity>
                        <Image
                          source={NextIMG}
                          style={{width:22, height:22}}
                        />
                      </TouchableOpacity>
                    </View>

                  </View>
                  <View style={styles.orderCard}>

                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>Sipariş - #5912321</Text>
                      <Text style={[styles.cardHeaderText2, {marginVertical:10}]}>16 Mayıs 2020, 5 ürün, 14:50</Text>
                    </View>

                    <View style={[styles.orderStatus, {marginVertical: 0, paddingVertical:0}]}>

                      <Image
                          source={CancelIMG}
                          style={[styles.orderImage, {width:20, height:20}]}
                      />

                      <Text style={styles.orderStatusText}>İptal edildi!</Text>

                    </View>

                    <View style={styles.nextArrowArea}>
                      <TouchableOpacity>
                        <Image
                            source={NextIMG}
                            style={{width:22, height:22}}
                        />
                      </TouchableOpacity>
                    </View>

                  </View>
                  <View style={styles.orderCard}>

                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>Sipariş - #5912321</Text>
                      <Text style={[styles.cardHeaderText2, {marginVertical:10}]}>16 Mayıs 2020, 5 ürün, 14:50</Text>
                    </View>

                    <View style={[styles.orderStatus, {marginVertical: 0, paddingVertical:0}]}>

                      <Image
                          source={DoneIMG}
                          style={[styles.orderImage, {width:20, height:20}]}
                      />

                      <Text style={styles.orderStatusText}>Teslim edildi!</Text>

                    </View>

                    <View style={styles.nextArrowArea}>
                      <TouchableOpacity>
                        <Image
                            source={NextIMG}
                            style={{width:22, height:22}}
                        />
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>

              </View>

            </View>

          </Content>

        </Container>
    );
  }
}

const styles = StyleSheet.create({
  nextArrowArea:{
    position:'absolute',
    right:15,
    top:'55%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  orderImage:{
    width:25,
    height:25
  },
  orderStatusText:{
    fontFamily:'Muli-Bold',
    fontSize:14,
    paddingTop:2,
    paddingHorizontal: 8,
    color:'#434F58'
  },
  orderStatus:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingVertical: 10
  },
  detailOrderText:{
    fontFamily:'Muli-Regular',
    fontSize:15,
    color:'#fff'
  },
  cardBottom:{
    display:'flex',
    alignItems:'flex-start'
  },
  detailOrder:{
    backgroundColor:'#8BC34A',
    width:130,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5,
    height:35
  },
  cardHeaderText2:{
    fontFamily:'Muli-Regular',
    color:'#304555',
    fontSize:14,
    paddingVertical:5
  },
  cardHeaderText:{
    fontFamily:'Muli-Bold',
    color:'#304555',
    fontSize:16
  },
  cardHeader:{

  },
  orderCard:{
    minHeight:100,
    backgroundColor:'#fff',
    shadowColor: "#304555",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    padding:15,
    borderRadius:5,
    marginVertical: 10
  },
  currentOrdersListArea:{
    display:'flex',
    flexDirection:'column',
    //marginVertical:15
  },
  infoText:{
    fontFamily:'Muli-Bold',
    color:'#304555',
    fontSize:18
  },
  infoTextArea:{
    marginTop:10,
    marginBottom:10,
    paddingHorizontal: 5
  },
  currentOrders:{
    display:'flex',
    flexDirection: 'column',
    //marginBottom:20
  },
  orderList:{
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
    maxWidth:'84.9%'
  },
});