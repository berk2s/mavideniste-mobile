import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Container, Content, Header, Left, Title} from 'native-base';
import CustomIcon from '../../../../../../font/CustomIcon';
import SwitcherStore from '../../../../../../store/SwitcherStore';
import Switcher from '../../../../switcher/Switcher';
import Spinner from 'react-native-loading-spinner-overlay';
import OrderWaiting from '../../../../../../img/waiting_order.png';
import Ripple from 'react-native-material-ripple';
import OrderEnroute from '../../../../../../img/delivery-man.png';
import OrderPreparing from '../../../../../../img/orderpre.png';
import DoneIMG from '../../../../../../img/tick.png';
import NextIMG from '../../../../../../img/next.png';
import CancelIMG from '../../../../../../img/cross.png';

import Timeline from 'react-native-timeline-flatlist'

export default class OrderDetail extends Component {

    state = {
        loading:false,
    }

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
                    <Title style={styles.bodyTitleText}>Sipariş Detayı</Title>
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

                <View style={styles.headerAreaOrder}>
                    <Text style={styles.headerOrderText}>Sipariş - #5551232</Text>

                    <View style={styles.detailTexts}>
                        <Text style={styles.headerOrderText2}>Çarşamba</Text>

                        <View style={styles.area2}>
                            <Text style={styles.headerOrderText2}>14 Mayıs 2020</Text>
                            <Text style={styles.headerOrderText2}>Tutar: <Text style={{fontFamily:'Muli-ExtraBold', fontSize:16}}>20 TL</Text></Text>
                        </View>
                    </View>
                </View>

                <View>
                    <View style={styles.timeline}>
                        <Timeline
                            showTime={false}
                            innerCircle={'icon'}
                            listViewStyle={{width:160}}
                            circleSize={35}
                            circleColor={'#F6F6F6'}
                            lineWidth={3}
                            titleStyle={{fontFamily:'Muli-Bold', marginTop:-4, marginLeft:5}}
                            descriptionStyle={{height:50, fontFamily:'Muli-Regular', marginTop:3, marginLeft:5}}
                            data={[
                                {time: '09:00', lineColor:'#CDDC39', icon:DoneIMG, title: 'Teslim edildi',description: '13:00'},
                                {time: '09:00', lineColor:'#CDDC39', icon:OrderEnroute, title: 'Sipariş yolda',description: '12:56'},
                                {time: '09:00',  lineColor:'#CDDC39', icon:OrderPreparing, title: 'Hazırlanıyor',description: '12:53'},
                                {time: '09:00',  descriptionStyle:{height:20}, icon:OrderWaiting, title: 'Sipariş onayı', description: 'Onaylandı'},
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.productsArea}>
                    <View style={styles.productsAreaInfo}>
                        <Text style={styles.productsAreaText}>Ürünler</Text>
                    </View>

                    <View style={styles.currentOrdersListArea}>

                        <View style={styles.orderCard}>
                            <View style={styles.imageArea}>
                                <Image
                                    style={styles.cardImg}
                                    source={{uri: 'https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30116717/30116717_0_MC/8797075243058_1521460674849.jpg'}}
                                />
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.cardInfoText}>Çaykur Harman çay Rizeden Serisi 500g</Text>
                                <Text style={styles.cardInfoText2}>Miktar: 1</Text>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.imageArea}>
                                <Image
                                    style={styles.cardImg}
                                    source={{uri: 'https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30116717/30116717_0_MC/8797075243058_1521460674849.jpg'}}
                                />
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.cardInfoText}>Çaykur Harman çay Rizeden Serisi 500g</Text>
                                <Text style={styles.cardInfoText2}>Miktar: 1</Text>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.imageArea}>
                                <Image
                                    style={styles.cardImg}
                                    source={{uri: 'https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30116717/30116717_0_MC/8797075243058_1521460674849.jpg'}}
                                />
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.cardInfoText}>Çaykur Harman çay Rizeden Serisi 500g</Text>
                                <Text style={styles.cardInfoText2}>Miktar: 1</Text>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.imageArea}>
                                <Image
                                    style={styles.cardImg}
                                    source={{uri: 'https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30116717/30116717_0_MC/8797075243058_1521460674849.jpg'}}
                                />
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.cardInfoText}>Çaykur Harman çay Rizeden Serisi 500g</Text>
                                <Text style={styles.cardInfoText2}>Miktar: 1</Text>
                            </View>
                        </View>

                    </View>

                </View>

                <View style={[styles.productsArea, {marginVertical:5}]}>

                    <View style={styles.currentOrdersListArea}>

                        <View style={styles.orderCard}>
                            <View style={[styles.imageArea, {justifyContent:'flex-start', alignItems: 'center'}]}>
                                <Image
                                    style={styles.cardImg2}
                                    source={{uri: 'https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30116717/30116717_0_MC/8797075243058_1521460674849.jpg'}}
                                />
                            </View>

                            <View style={[styles.cardInfo, {justifyContent:'flex-start'}]}>
                                <Text style={[styles.cardInfoText, {width:'100%'}]}>Sipariş Adresi (Ev)</Text>
                                <Text style={{fontFamily:'Muli-Regular', color:'#6C7277', marginVertical:2, marginRight:5,}}>1625. ada d blok daire 5 15 temmuz camili mahallesi</Text>
                                <Text style={{fontFamily:'Muli-Regular', color:'#6C7277', marginVertical:2, marginRight:5}}>(Yunus marketin arkasindaki sari binalar)</Text>
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
    cardInfoText2:{
        fontFamily:'Muli-Regular',
        color:'#304555',
        fontSize:14,
        flexWrap:'wrap',
        width:'85%'
    },
    imageArea:{
      display:'flex',
      justifyContent:'center'
    },
    cardInfoText:{
      fontFamily:'Muli-Bold',
      color:'#304555',
      fontSize:16,
        flexWrap:'wrap',
        width:'85%'
    },
    cardInfo:{
        maxWidth:'100%',
        display:'flex',
        justifyContent:'space-between'
    },
    cardImg2:{
        width:30,
        height:30,
        marginRight:15
    },
    cardImg:{
      width:60,
      height:60,
        marginRight:15
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
        display:'flex',
        flexDirection:'row',
       // alignItems: 'center'
    },
    currentOrdersListArea:{
        display:'flex',
        flexDirection:'column',
        marginVertical:15
    },
    productsAreaText:{
      fontFamily:'Muli-ExtraBold',
      color:'#434F58',
      fontSize:22,
    },
    productsArea:{

    },
    timeline:{
        marginVertical:30
    },
    detailTexts:{
      marginVertical:10
    },
    headerOrderText2:{
        fontFamily:'Muli-Regular',
        color:'#434F58',
        marginVertical: 2
    },
    area2:{
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headerOrderText:{
      fontFamily: 'Muli-ExtraBold',
      fontSize:24,
      color:'#434F58'
    },
    headerAreaOrder:{
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
