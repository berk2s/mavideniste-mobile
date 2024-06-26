import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomIcon from '../../font/CustomIcon';
import {IMAGE_URL} from '../../constants';
import {observer} from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

import BasketStore from '../../store/BasketStore';

@observer
export default class ProductCard extends Component {

    state = {
        loading:false,
        isClicked:false
    }

    _handleProductAddToBasketClick = async (product_id) => {
        try{
            if(!this.state.isClicked) {
                this.setState({
                    loading: true,
                    isClicked: true
                });

                await this.props.BasketStore.addToBasket(product_id);
                setTimeout(async () => {
                    this.setState({
                        loading: false,
                        isClicked:false
                    });
                }, 500);
            }
        }catch(e){
            alert(e);
        }
    }

    _handleProductOutOfTHeBasketClick = async (product_id) => {
        try{
            if(!this.state.isClicked){
                this.setState({
                    loading:true,
                    isClicked:true
                });

                await this.props.BasketStore.removeFromBasket(product_id);

                setTimeout(async () => {
                    this.setState({
                        loading:false,
                        isClicked:false
                    });
                }, 500);

            }
        }catch(e){
            alert(e);
        }
    }

  render() {
      const {e} = this.props;
      const uri = IMAGE_URL+e.product_image;
    return (
        <View  key={e._id}>
            <Spinner
                visible={this.state.loading}
                size={'small'}
            />
        <View  style={styles.card} >
            <View style={styles.cardWhiteArea}>
                <FastImage
                    source={{uri: uri}}
                    style={styles.cardImage}
                />
            </View>
            <View style={styles.cardTextArea}>
                <View style={styles.cardTextAreaInfoArea}>
                    <View style={styles.infoAboutName}>
                        <Text style={styles.cardProductName}>{e.product_name.length > 45 ? e.product_name.substring(0, 45)+'...' : e.product_name}</Text>
                    </View>
                    <View style={styles.infoAboutPricing}>
                        {
                            e.product_discount != null
                                ?
                                <>
                                    <Text style={styles.cardAboutDiscountOldPrice}>{e.product_list_price}<Text style={{fontFamily:'Arial', fontSize:9}}>₺</Text></Text>
                                    <Text style={styles.cardAboutPricing}>{e.product_discount_price}<Text style={{fontFamily:'Arial', fontSize:9}}>₺</Text></Text>
                                </>
                                :
                                <Text style={styles.cardAboutPricing}>{e.product_list_price}<Text style={{fontFamily:'Arial', fontSize:9}}>₺</Text></Text>

                        }
                    </View>
                </View>

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

            <View style={styles.basketActionArea}>
                {
                    BasketStore.productsWithID.map(r => r.id).indexOf(e._id) !== -1
                        ?
                        <TouchableOpacity onPress={() => this._handleProductOutOfTHeBasketClick(e._id)}>
                            <View style={styles.addToBasketArea}>
                                <CustomIcon name="add" size={25} style={{color:'#FF0000'}} />
                                <Text style={{fontFamily:'Muli-SemiBold', color:'#EEFF00', fontSize:20, position:'absolute', top:2, right:10}}>-</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this._handleProductAddToBasketClick(e._id)}>
                            <View style={styles.addToBasketArea}>
                                <CustomIcon name="add" size={25} style={{color:'#00CFFF'}} />
                                <Text style={{fontFamily:'Muli-SemiBold', color:'#003DFF', position:'absolute', top:3, right:10}}>+</Text>
                            </View>
                        </TouchableOpacity>
                }
            </View>

        </View>
            </View>
    );
  }
}

const styles = StyleSheet.create({
    basketActionArea:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:30,
        height:30,
   //     position:'absolute',
        bottom:89,
        left:125,
        backgroundColor:"#fff",
        borderRadius:50,
       // overflow:'hidden',

        shadowColor: "#304555",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 1,
    },
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
        alignItems:'flex-end',
        position:'absolute',
        right:10,
        top:70,
        zIndex:9999
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
        alignItems:'center',
        shadowColor: "#304555",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 2,
    },
    addToBasketArea:{
        height:35,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:39,
    },
    cardAboutDiscountOldPrice:{
        fontFamily:'Muli-Bold',
        color:'#A5A5A5',
        fontSize:11,
        marginRight:5,
        textDecorationLine:'line-through',
        //textDecorationStyle: "solid",
        //textDecorationColor: "#A5A5A5",
    },
    infoAboutPricing:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    cardAboutPricing:{
        fontFamily:'Muli-ExtraBold',
        fontSize:11,
        color:'#003DFF',
        display:'flex',
        flexDirection:'column',
    },
    infoAboutName:{

    },
    cardProductName:{
        fontFamily: 'Muli-Bold',
        color:'#304555',
        fontSize: 11
    },

    cardTextAreaInfoArea:{
        width:'100%',
        height:54,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        // borderRightWidth:1,
        // borderRightColor:'#003DFF',
        paddingVertical:4,
        paddingHorizontal:12,

    },
    cardTextArea:{
        width:162,
        display:'flex',
        flexDirection:'row',
       // position:'absolute',
        backgroundColor:'#fff',
        height:55,
    //    borderBottomLeftRadius:20,
    //    borderBottomRightRadius:20,
        opacity:.89,
        bottom:0,

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
        //   paddingTop: 50
    },
    card:{
        width:162,
        marginBottom:30,
        shadowColor: "#304555",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.10,
        shadowRadius: 2,
        elevation: 1,
        //borderTopLeftRadius:20,
        //borderTopRightRadius:20,
        borderRadius:Platform.OS === 'ios' ? 20 : 0,
        overflow:'hidden',
        height:163
    },
    cardWhiteArea:{
        backgroundColor: '#fff',
        //borderTopLeftRadius:20,
        //borderTopRightRadius:20,
        width:162,
        height:105,
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        overflow:'hidden'
    },
    cardImage:{
        width:162,
        height:105,
       // borderTopLeftRadius:20,
       // borderTopRightRadius:20,
      //  borderRadius:20
    },
});
