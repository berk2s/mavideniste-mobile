import React, { Component } from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View, BackHandler, Alert} from 'react-native';
import {Body, Container, Content, Input, Item, Left, Right, Title,Textarea} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomIcon from '../../../../font/CustomIcon';
import Ripple from 'react-native-material-ripple';

import {inject, observer} from 'mobx-react';

import CouponIMG from '../../../../img/kupon.png'

import Modal, { ModalContent } from 'react-native-modals';
import Spinner from 'react-native-loading-spinner-overlay';

import AddressStore from '../../../../store/AddressStore';
import Coupon from './coupon/Coupon';

import PriceController from './PriceController';
import BasketStore from '../../../../store/BasketStore';
import Snackbar from 'react-native-snackbar';

import API from '../../../../api';

@inject('BasketStore', 'AuthStore', 'BranchStore')
@observer
export default class ApplyOrder extends Component {

    state = {
        visible:false,
        visibleCoupon:false,
        address:{},
        selectedPaymentType:1,
        orderNote:''
    }

    changeCouponVisibility = async (data) => {
        this.setState({
            visibleCoupon:data,
        });
    }

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {

        if(!this.state.visible && !this.state.visibleCoupon){
            this.props.navigation.goBack()
        }else{
            this.setState({
                visible:false,
                visibleCoupon:false
            });
        }

        return true;
    }

    componentDidMount = async () =>  {
        if(AddressStore.getAddress.length > 0){
            this.setState({
                address:{
                    id:AddressStore.getAddress[0]._id,
                    address:AddressStore.getAddress[0].address,
                    title:AddressStore.getAddress[0].address_title
                },
            });
        }

    }

    _handleSelectAddressClick = async (e) => {
        try{
            this.setState({
                loading:true,
            });

            await this.props.BasketStore.setSelectedAddress(e);

            setTimeout(() => {
                this.setState({
                    loading:false,
                    visible:false
                });
            }, 400);

        }catch(e){
            console.log(e);
        }
    }

    _cancelCoupon = async () => {
        try{
            Alert.alert(
                'Kuponu Sil',
                'Kuponu sepetten silmek için emin misiniz?',
                [
                    {
                        text: 'Hayır',
                        style: 'cancel',
                    },
                    {   text: 'Evet',
                        onPress: async () => {
                            this.setState({
                                loading:true,
                                waitPrice:true,
                            });

                            await this.props.BasketStore.cancelCoupon();
                            await this.props.BasketStore.readyProducts();

                            setTimeout(() => {
                                this.setState({
                                    loading:false,
                                    waitPrice:false
                                });
                            }, 1000)
                        }
                    },
                ]
            );


        }catch(e){
            console.log(e);
        }
    }

    _handleOrderApply = async () => {
        try{
            this.setState({
                loading:true,
            });

            if(this.props.BasketStore.getTotalPriceWithCommite <= 0){
                Snackbar.show({
                    text: 'Beklenmedik bir hata oluştu (KOD: MVDNZO)',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor:'#d32f2f',
                    textColor:'white',
                });
                return false;
            }

            if(this.props.BasketStore.getProducts.length == 0){
                Snackbar.show({
                    text: 'Beklenmedik bir hata oluştu (KOD: MVDNZOA)',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor:'#d32f2f',
                    textColor:'white',
                });
                return false;
            }

            if(this.props.BasketStore.getSelectedAddress.length == 0){
                Snackbar.show({
                    text: 'Beklenmedik bir hata oluştu (KOD: MVDNZOAA)',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor:'#d32f2f',
                    textColor:'white',
                });
                return false;
            }

            const sendOrder = await API.post('/api/orders', {
                user_id: this.props.AuthStore.getUserID,
                user_address: this.props.BasketStore.getSelectedAddress,
                payload_type: this.state.selectedPaymentType,
                products: this.props.BasketStore.getProducts,
                price: this.props.BasketStore.getTotalPriceWithCommite,
                order_note: this.state.orderNote,
                is_bluecurrier: false,
                coupon: this.props.BasketStore.couponStatus != null ? this.props.BasketStore.getCoupon : null,
                branch_id:this.props.BranchStore.branchID,
            }, {
                'x-access-token': this.props.AuthStore.getToken
            });


            this.setState({
                loading:false,
            });

            await this.props.BasketStore.clearBasket();
            await this.props.BasketStore.cancelCoupon();

            this.props.navigation.navigate('OrderSuccessfull')
            // urunler
            // user bilgileri
            // konum
            // tutar
            // kupon
        }catch(e){
            console.log(e);
        }
    }

    render() {
    return (
        <Container style={styles.container}>
            <SafeAreaView transparent style={styles.header}>
                <Left style={styles.leftArea}>

                    <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                        <CustomIcon name="arrow-left" size={28} style={{color:'#003DFF', marginTop:2}} />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.body}>
                    <Title style={styles.bodyTitleText}>Siparişi onayla </Title>
                </Body>
                <Right>
                    <TouchableOpacity onPress={() => {

                        if(this.props.BasketStore.hasCoupon){
                            Snackbar.show({
                                text: 'Sadece bir tane kupon uygulayabilirsiniz',
                                duration: Snackbar.LENGTH_LONG,
                                backgroundColor:'#FF9800',
                                textColor:'white',
                            });
                        }else{
                            this.setState({
                                visibleCoupon:true,
                            });
                        }

                    }}>
                        <Image
                            source={CouponIMG}
                            style={{width:35, height:30, marginTop:5, marginRight:10}}
                        />
                    </TouchableOpacity>
                </Right>
            </SafeAreaView>
            <Content
                style={{display:'flex', flex:1}}
                padder
            >

                <Spinner
                    visible={this.state.loading}
                    animation={'fade'}
                    size={'small'}
                />

                {this.props.BasketStore.getTotalPrice == 0 && <PriceController {...this.props} />}

                <Modal
                    visible={this.state.visibleCoupon}
                    onTouchOutside={(event) => {
                        this.setState({ visibleCoupon: false });
                    }}
                >
                    <ModalContent style={[styles.selectAddress2, {minHeight:140}]}>
                        <View style={[styles.selectAddressHeader, {borderBottomColor: '#fff', marginVertical:0, marginBottom:0, paddingBottom:0}]}>
                            <Text style={styles.selectAdressTitle}>Kupon uygula</Text>
                        </View>
                        <View style={[styles.selectAddressList, {paddingBottom:0}]}>

                            <Coupon
                                changeCouponVisibility={this.changeCouponVisibility}
                            />

                        </View>
                    </ModalContent>
                </Modal>

                <Modal
                    visible={this.state.visible}
                    onTouchOutside={(event) => {
                        this.setState({ visible: false });
                    }}

                >
                    <ModalContent style={[styles.selectAddress]}>
                        <View style={styles.selectAddressHeader}>
                            <Text style={styles.selectAdressTitle}>Kayıtlı adreslerim</Text>
                        </View>
                        <View style={styles.selectAddressList}>

                            {
                                AddressStore.getAddress.length > 0
                                    ?
                                        AddressStore.getAddress.map(e => {
                                            return <Ripple key={e._id} style={styles.selectAddressMap} onPress={() => this._handleSelectAddressClick(e)}>
                                                <Text style={styles.selectAddressTitle}>{e.address_title}</Text>
                                            </Ripple> })
                                    :
                                        <></>

                            }

                     </View>
                    </ModalContent>
                </Modal>

                <View style={{width:'100%', display:'flex', justifyContent:'center', flexDirection:'row'}}>
                    <View style={{width:'85%'}}>
                        <View style={styles.addressArea}>
                            <Ripple
                                onPress={() => {
                                    this.setState({
                                        loading:true,
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            loading:false,
                                        });

                                        this.props.navigation.navigate('Profile');
                                    }, 500)

                                }}
                                rippleColor={'#003DFF'}
                                style={styles.addNewAddress}>
                                <Text style={styles.addNewAddressText}>Yeni adres girin</Text>
                            </Ripple>

                            {
                                AddressStore.getAddress.length > 0

                                    ?
                                    <View style={styles.addressList}>
                                        <View style={styles.address}>
                                            <View style={styles.addressHeader}>
                                                <Text style={styles.addressHeaderText}>{this.props.BasketStore.getSelectedAddress.address_title} adresi</Text>
                                                <TouchableOpacity onPress={() => this.setState({
                                                    visible:true,
                                                })
                                                }>
                                                    <Text style={[styles.addressHeaderText, {color:'#1B52FE'}]}>Değiştir</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.addressBody}>

                                                <Item
                                                    style={styles.inputArea}>
                                                    <Input
                                                        style={[styles.input, {zIndex:9}]}
                                                        value={this.props.BasketStore.getSelectedAddress.address}
                                                        editable={false}
                                                    />
                                                    <View style={{marginRight:5}}>
                                                        <Text style={styles.accIcon}>
                                                            <CustomIcon
                                                                name="checkmark-circle-2"
                                                                size={24}
                                                                style={{color: '#1B52FE'}}
                                                            />
                                                        </Text>
                                                    </View>
                                                </Item>

                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <Text style={{fontFamily:'Muli-Regular', paddingTop:15, color:'#FF0000', paddingLeft:10, fontSize:12}}>Siparişe devam etmek için lütfen adres girin</Text>

                            }


                        </View>
                        <View style={styles.paymentArea}>
                            <View style={styles.paymentHeader}>
                                <Text style={styles.paymentHeaderText}>Ödeme şekli (Kapıda)</Text>
                            </View>
                            <View style={styles.paymentList}>

                                <View style={styles.payment}>
                                    <View style={styles.paymentHeaderBody}>

                                        <Item
                                            style={styles.inputArea}>

                                            <TouchableOpacity
                                                style={[{width:'65%', paddingLeft:10, zIndex:9,}]}
                                                onPress={() => {
                                                    this.setState({
                                                        selectedPaymentType:1,
                                                    });
                                                }}
                                                editable={false}
                                            >
                                                <Text style={{fontFamily:'Muli-SemiBold', color: this.state.selectedPaymentType == 1 ? '#1B52FE' : '#CBCDCF'}}>Nakit</Text>
                                            </TouchableOpacity>

                                            <View style={{marginRight:5}}>
                                                <Text style={styles.accIcon}>
                                                    <CustomIcon
                                                        name="checkmark-circle-2"
                                                        size={24}
                                                        style={{color: this.state.selectedPaymentType == 1 ? '#1B52FE' : '#CBCDCF'}}
                                                    />
                                                </Text>
                                            </View>
                                        </Item>

                                    </View>
                                </View>
                                <View
                                    style={styles.payment}
                                >

                                    <View style={styles.paymentHeaderBody}

                                    >

                                        <Item

                                            style={[styles.inputArea, {zIndex:999}]}>
                                            <TouchableOpacity
                                                style={[{width:'65%', paddingLeft:10, zIndex:9,}]}
                                                value={'Kart'}
                                                onPress={() => {
                                                    this.setState({
                                                        selectedPaymentType:2,
                                                    });
                                                }}
                                                editable={false}
                                            >
                                                <Text style={{fontFamily:'Muli-SemiBold', color: this.state.selectedPaymentType == 2 ? '#1B52FE' : '#CBCDCF'}}>Kart</Text>
                                            </TouchableOpacity>
                                            <View style={{marginRight:5}}>
                                                <Text style={styles.accIcon}>
                                                    <CustomIcon
                                                        name="checkmark-circle-2"
                                                        size={24}
                                                        style={{color: this.state.selectedPaymentType == 2 ? '#1B52FE' : '#CBCDCF'}}
                                                    />
                                                </Text>
                                            </View>
                                        </Item>

                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={[styles.servicePriceArea, {marginBottom:0}]}>
                            <Text style={styles.servicePriceText}>{this.props.BranchStore.branchCommittee} TL</Text>
                            <Text style={styles.servicePriceInfo}>hizmet bedeli</Text>
                        </View>

                        <View style={styles.noteArea}>

                            <View style={styles.addressList}>
                                <View style={styles.address}>
                                    <View style={styles.addressHeader}>
                                        <Text style={styles.addressHeaderText}>Not ekleyebilirsiniz</Text>
                                    </View>
                                    <View style={styles.addressBody}>


                                            <Textarea
                                                onChangeText={(val) => {

                                                    this.setState({
                                                        orderNote:val,
                                                    });

                                                }}
                                                rowSpan={1}
                                                style={[styles.input, styles.inputArea, {zIndex:9, height:50, color:'#304555', paddingTop:6, paddingRight:5}]}
                                            />


                                    </View>
                                </View>
                            </View>

                        </View>

                        <View style={styles.bottomArea}>

                            <View style={styles.totalPrice}>
                                <Text style={styles.totalPriceInfo}>Toplam Tutar</Text>
                                {this.props.BasketStore.couponStatus == true ? <Text style={[styles.totalPriceText, {fontSize:15, color:'#304555', textAlign:'left', textDecorationLine:'line-through'}]}>{parseFloat(this.props.BasketStore.oldTotalPriceWithCoupon)} TL</Text> : <></>}
                                <Text style={styles.totalPriceText}>{this.state.waitPrice ? <></> : parseFloat(this.props.BasketStore.getTotalPriceWithCommite)+ ' TL'} </Text>
                            </View>

                            <Ripple style={{marginTop:3}} onPress={() => {
                                if(AddressStore.getAddress.length == 0){
                                    Snackbar.show({
                                        text: 'Bir adres seçimi yapın',
                                        duration: Snackbar.LENGTH_LONG,
                                        backgroundColor:'#FF9800',
                                        textColor:'white',
                                    });
                                }else {
                                    if(this.state.orderNote.length > 400){
                                        Snackbar.show({
                                            text: 'Çok uzun not girdiniz',
                                            duration: Snackbar.LENGTH_LONG,
                                            backgroundColor:'#FF9800',
                                            textColor:'white',
                                        });
                                    }else{
                                        Alert.alert(
                                            'Siparişi Onayla',
                                            'Siparişi onaylamak için emin misiniz?',
                                            [
                                                {
                                                    text: 'Hayır',
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'Evet',
                                                    onPress: this._handleOrderApply
                                                },
                                            ]
                                        );
                                    }
                                }
                            }} rippleDuration={1000} rippleColor={'#fff'}>
                                <View style={styles.paymentBtn}>
                                    <Text style={styles.actionText}>Onayla</Text>
                                </View>
                            </Ripple>
                        </View>

                        {
                            this.props.BasketStore.relevantCoupon != null
                                ?
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}>
                                        <Text style={{fontFamily:'Muli-Regular', color:'#304555', marginBottom:5}}><Text style={{fontFamily:'Muli-Bold'}}>{this.props.BasketStore.relevantCoupon.coupon_name}</Text> kuponu uygulandı.  </Text>
                                        <TouchableOpacity onPress={this._cancelCoupon}>
                                            <Text style={[{fontSize:12, color:'#1B52FE'}]}>(Kuponu sil)</Text>
                                        </TouchableOpacity>
                                    </View>
                                :
                                    <></>
                        }

                    </View>
                </View>

            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    selectAddressTitle:{
      fontFamily:'Muli-Regular'
    },
    selectAddressList:{
      paddingVertical:10
    },
    selectAddressMap:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
        alignItems:'center',
        height:35,
        marginBottom:10
    },
    selectAdressTitle:{
      fontFamily:'Muli-Bold',
      color:'#304555'
    },
    selectAddressHeader:{
        paddingBottom: 10,
        borderBottomWidth:1,
        borderBottomColor:'#304555',
    },
    selectAddress2:{
        width:270,
        paddingTop:15
    },
    selectAddress:{
        height:300,
        width:270,
        paddingTop:15
    },
    paymentBtn:{
        backgroundColor:'#003DFF',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:105,
        height:38,
        borderRadius:18,

    },
    actionText:{
        fontFamily:'Muli-Bold',
        color:'#fff',
        fontSize:18
    },


    totalPriceText:{
        fontFamily:'Muli-SemiBold',
        color:'#1A51FE',
        fontSize:25,
        textAlign: 'left'
    },
    totalPriceInfo:{
        fontFamily:'Muli-Light',
        color:'#304555',
        fontSize:11
    },
    totalPrice:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
    },
    bottomArea:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
        alignItems:'center',
        marginVertical:25
    },
    servicePriceInfo:{
        fontFamily:'Muli-SemiBold',
        color:'#1B52FE',
        paddingLeft:10,
        fontSize:15
    },
    servicePriceText:{
        fontFamily:'Muli-SemiBold',
        color:'#1B52FE',
        fontSize:16,
        borderColor:'#1B52FE',
        borderWidth: 1,
        padding:5,
        borderRadius:10,
        width:65,
        textAlign:'center'
    },

    servicePriceArea:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-end',
        alignItems:'center',
        marginVertical:20
    },


    paymentHeader:{
        paddingHorizontal:10
    },
    paymentHeaderBody:{
        marginTop:10
    },
    paymentHeaderText:{
        fontFamily:'Muli-Light',
        color:'#304555',
        fontSize:12,
        marginTop:20
    },
    payment:{
      //  marginTop:20,
        width:'45%'
    },
    paymentList:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },





    addressHeader:{
      paddingHorizontal:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    addressBody:{
      marginTop:10
    },
    addressHeaderText:{
        fontFamily:'Muli-Light',
        color:'#304555',
        fontSize:12
    },
    address:{
      marginTop:20
    },
    addressList:{

    },
    addNewAddressText:{
      fontFamily: 'Muli-Light',
        fontSize:11,
        color:'#003DFF'
    },
    addNewAddress:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderColor:'#003DFF',
      borderWidth:1,
      borderRadius:20,
        width:130,
        height:28
    },
    header:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        height:Platform.OS == 'ios' ? 70 : 50,
        paddingLeft:10,
        paddingRight:10,
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
        maxWidth:'40%'
    },
    accIcon:{
        marginLeft: 10,
        marginRight: 5,
        marginTop:1
    },
    input:{
        fontFamily:'Muli-Light',
        fontSize:13,
        color:'#CBCDCF',
        paddingLeft:15,
    },
    inputArea:{
        borderColor:'#fff',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:34,
        backgroundColor:'#fff',
        borderRadius:20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 1,
    },
});
