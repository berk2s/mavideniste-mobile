import React, { Component } from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { Container, Header, Button, Content, } from "native-base";
import API from '../../api';
import {BRANCH_ID, IMAGE_URL} from '../../constants';
import FastImage from 'react-native-fast-image';
import Loading from '../components/Loading';
import CustomIcon from '../../font/CustomIcon';

import {observer, inject} from 'mobx-react'
import Spinner from 'react-native-loading-spinner-overlay';

@inject('BasketStore', 'ProductStore')
@observer
export default class ProductList extends Component {

    state = {
        loadingHeight: Dimensions.get('window').height-160,
        datas: [],
        fetched: false,
        loading: false
    }

    componentDidMount = async () => {
        try{
            const category_id = this.props.navigation.getParam('category_id');
            await this.props.ProductStore.fetchProducts(category_id, BRANCH_ID);
            setTimeout(() => {
                this.setState({
                    fetched: true,
                });
            }, 1000)
        }catch(e){
            console.log(e);
        }
    }

    handleProductClick = async (product_id) => {
        try{
            this.setState({
                loading:true,
            });

            setTimeout(async () => {
                await this.props.BasketStore.setBasketProduct(product_id);
             //   const index = this.state.datas.map(e => e._id).indexOf(product_id);
             //   this.state.datas[index].isInTheBasket = true;
                this.setState({
                    loading:false,
                });

            }, 500);

        }catch(e){
            alert(e);
        }
    }

    render() {
    return (
        <Container style={styles.container}>
            <HeaderWithSearch
                subView={true}
                navigation={this.props.navigation}
            />

            <Content
                style={{display:'flex', flex:1}}
                padder>
                <View style={styles.content}>
                    <Spinner
                        visible={this.state.loading}
                        animation={'fade'}
                        size={'small'}
                    />
                    {this.state.fetched
                        ?
                        <>
                            <View style={styles.basketInfoArea}>
                                <TouchableOpacity>
                                    <View style={styles.basketInfoBox}>
                                        <View style={{position:'absolute', left:-10}}>
                                            <CustomIcon name="add" size={30} style={{color:'#00CFFF'}} />
                                        </View>
                                        <Text style={styles.basketText}>145<Text style={{fontFamily:'Arial', fontSize:11}}>₺</Text></Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.allCountText}>Toplam Tutar</Text>
                            </View>
                            <View style={styles.cardArea}>
                                {
                                    this.props.ProductStore.getProducts.map(e => {
                                        const uri = IMAGE_URL+e.product_image;
                                        return <View  key={e._id} style={styles.card} >
                                                <View style={styles.cardWhiteArea}>
                                                    <FastImage
                                                        source={{uri: uri}}
                                                        style={styles.cardImage}
                                                    />
                                                </View>
                                                <View style={styles.cardTextArea}>
                                                    <View style={styles.cardTextAreaInfoArea}>
                                                        <View style={styles.infoAboutName}>
                                                            <Text style={styles.cardProductName}>{e.product_name}</Text>
                                                        </View>
                                                        <View style={styles.infoAboutPricing}>
                                                            {
                                                                e.product_discount != null
                                                                    ?
                                                                    <>
                                                                        <Text style={styles.cardAboutDiscountOldPrice}>{e.product_list_price}<Text style={{fontFamily:'Arial', fontSize:4}}>₺</Text></Text>
                                                                        <Text style={styles.cardAboutPricing}>{e.product_discount_price}<Text style={{fontFamily:'Arial', fontSize:8}}>₺</Text></Text>
                                                                    </>
                                                                    :
                                                                    <Text style={styles.cardAboutPricing}>{e.product_list_price}<Text style={{fontFamily:'Arial', fontSize:8}}>₺</Text></Text>

                                                            }
                                                               </View>
                                                    </View>
                                                    <TouchableOpacity onPress={() => this.handleProductClick(e._id)}>
                                                        <View style={styles.addToBasketArea}>
                                                            <CustomIcon name="add" size={25} style={{color:'#00CFFF'}} />
                                                            <Text style={{fontFamily:'Muli-SemiBold', color:'#003DFF', position:'absolute', top:3, right:10}}>+</Text>
                                                            {
                                                                e.isInTheBasket == true
                                                                    ?
                                                                    <Text style={{fontFamily:'Muli-SemiBold', color:'#FF0000', fontSize:5}}>Sepetten cikar</Text>
                                                                    :
                                                                    <Text style={{fontFamily:'Muli-SemiBold', color:'#003DFF', fontSize:5}}>Sepete ekle</Text>

                                                            }

                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    e.product_discount != null
                                                    ?
                                                        <View style={styles.discountPercentage}>
                                                            <Text style={styles.discountText}>{parseInt(e.product_discount).toFixed(0)}%</Text>
                                                        </View>
                                                        :
                                                        <></>
                                                }

                                            </View>

                                    })
                                }

                            </View>
                        </>
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
    allCountText:{
      paddingTop: 5,
        fontFamily:'Muli-Light',
        color:'#304555',
        fontSize:7,
        textAlign:'center',
        width:87
    },
    basketText:{
        fontFamily:'Muli-ExtraBold',
        color:'#fff',
        fontSize:13
    },
    basketInfoArea:{
      display:'flex',
        flexDirection:'column',
        alignItems:'flex-end'
    },
    basketInfoBox:{
        width:87,
        height:28,
        backgroundColor:'#003DFF',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,

    },
    discountText:{
        color:'#003DFF',
        fontFamily:'Muli-ExtraBold',
        fontSize:10,
        textAlign:'center'
    },
    discountPercentage:{
        width:30,
        height:30,
        backgroundColor:'#fff',
        borderRadius:50,
        position:'absolute',
        top:5,
        right:5,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    addToBasketArea:{
      height:35,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
        width:39
    },
    cardAboutDiscountOldPrice:{
        fontFamily:'Muli-Bold',
        color:'#A5A5A5',
        fontSize:7,
        marginRight:5,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#A5A5A5",
    },
    infoAboutPricing:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    cardAboutPricing:{
      fontFamily:'Muli-ExtraBold',
        fontSize:9,
        color:'#003DFF',
        display:'flex',
        flexDirection:'column',
    },
    infoAboutName:{

    },
    cardProductName:{
        fontFamily: 'Muli-Bold',
        color:'#304555',
        fontSize: 7
    },

    cardTextAreaInfoArea:{
      width:123,
        height:40,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        borderRightWidth:1,
        borderRightColor:'#003DFF',
        paddingVertical:4,
        paddingHorizontal:12
    },
    cardTextArea:{
        width:162,
        display:'flex',
        flexDirection:'row',
        position:'absolute',
        backgroundColor:'#fff',
        height:40,
        borderRadius:20,
        opacity:.89,
        bottom:-20,
    },
    cardText:{
        fontFamily:'Muli-ExtraBold',
        color:'#304555',
        fontSize:11
    },
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
    },
    cardArea:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        paddingTop: 15
    },
    card:{
        width:162,
        marginBottom:44
    },
    cardWhiteArea:{
        backgroundColor: '#fff',
        borderRadius:20,
        width:162,
        height:111,
        display:'flex',
        justifyContent:'center',
        alignItems: 'center'
    },
    cardImage:{
        width:162,
        height:111,
        borderRadius: 20
    },

});
