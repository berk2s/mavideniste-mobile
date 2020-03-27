import React, { Component } from 'react';
import {StyleSheet, Text, View, Button,  TouchableOpacity, Dimensions, Image} from 'react-native';

import {observer} from 'mobx-react';

import AuthStore from '../../../../store/AuthStore';

import {Body, Container, Content, Header, Left, Title, Card, CardItem, Icon, Right} from 'native-base';
import CustomIcon from '../../../../font/CustomIcon';

import Spinner from 'react-native-loading-spinner-overlay';
import LoginIMG from '../../../../img/login.png';
import API from '../../../../api';
import LocationAPI from '../../../../locationapi';
import Ripple from 'react-native-material-ripple';

import { Badge } from 'react-native-elements'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import ProfileAddressImg from '../../../../img/profile_address.png';
import ProfileOrdersImg from '../../../../img/profile_product.png';
import ProfileKeyImg from '../../../../img/profile_key.png';
import ProfileComplaintImg from '../../../../img/profile_complaint.png';
import ProfileLogoutImg from '../../../../img/profile_logout.png';
import RightArrow from '../../../../img/right-arrow.png'
import EmptyHeader from '../../../components/EmptyHeader';

@observer
export default class Profile extends Component {

    state = {
        loading:false
    }


    _handleProfileSettingsClick = async () => {
        try{
            this.setState({
                loading:true,
            });

            const token = AuthStore.getToken;
            const user_id = AuthStore.getUserID;

            const user_information = await API.get(`/api/user/detail/${user_id}`, {
                headers:{
                    'x-access-token': token
                }
            });

            this.setState({
                loading:false,
            });

            console.log('-=====================-')
            console.log(user_information.data)
            console.log('-=====================-')

            this.props.navigation.navigate('ProfileSettings', {userInfo: user_information.data.data})
        }catch(e){
            alert(e);
        }
    }

    _handleLogout = async () => {
        try{
            this.setState({
                loading:true,
            });
            await AuthStore.deleteUser();
            this.setState({
                loading:false,
            });

        }catch{
            console.log(e);
        }
    }

    _handleAddressClick = async () => {
        try{
            this.setState({
                loading:true,
            });
            //await AuthStore.deleteUser();

            const address = await API.get(`/api/user/address/${AuthStore.getUserID}`, {
                headers:{
                    'x-access-token': AuthStore.getToken
                }
            });

            const datas = await LocationAPI.get('/api/location/province');

            this.setState({
                loading:false,
            });

            this.props.navigation.navigate('AddressManagement', {address: address.data.data, provinces:datas.data})

        }catch{
            console.log(e);
        }
    }

    _handleOrdersClick = async () => {
        try{
            this.setState({
                loading:true,
            });
            //await AuthStore.deleteUser();

            const openedOrders = await API.get(`/api/orders/user/open/${AuthStore.getUserID}`, {
                headers: {
                    'x-access-token': AuthStore.getToken
                }
            });
            const historyOrders = await API.get(`/api/orders/user/history/${AuthStore.getUserID}`, {
                headers: {
                    'x-access-token': AuthStore.getToken
                }
            });

            this.setState({
                loading:false,
            });

            this.props.navigation.navigate('Orders', {opened_orders: openedOrders.data, history_orders:historyOrders.data})

        }catch{
            console.log(e);
        }
    }

    _handleComplaintClick = async () => {
        try{

            this.setState({
                loading:true,
            });

            const orders = await API.get(`/api/orders/user/history/${AuthStore.getUserID}`, {
                headers: {
                    'x-access-token': AuthStore.getToken
                }
            });

           // console.log(orders.data)

            this.props.navigation.navigate('Complaint', {orders: orders.data.data});

            this.setState({
                loading:false,
            });

        }catch(e){
            console.log(e);
        }
    }

  render() {
    return (
        <SafeAreaView style={[styles.container, {backgroundColor:'#F6F6F6', flex:1}]}>

            <EmptyHeader>
                <View style={{marginRight:30}}>
                    <TouchableOpacity style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}} onPress={() => this.props.navigation.goBack(null)}>
                        <CustomIcon name="arrow-left" size={28} style={{color:'#003DFF', marginTop:2}} />
                    </TouchableOpacity>
                </View>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Title style={{fontFamily:'Muli-ExtraBold', color:'#003DFF'}}>Profilim</Title>
                </View>
            </EmptyHeader>


            <Spinner
                visible={this.state.loading}
                animation={'fade'}
                size={'small'}
            />
            <Content
                style={{display:'flex', flex:1, }}
                padder>

                <View style={styles.profileArea}>

                    <View style={styles.profileInfo}>

                        <View style={styles.profileCircle}>
                            <CustomIcon
                                name="person-fill"
                                size={25}
                                style={{color: '#fff'}}
                            />
                        </View>

                        <View style={styles.profileIntoTextArea}>
                            <Text style={{fontFamily:'Muli-ExtraBold', color:'#304555', fontSize:17}}>{AuthStore.getNameSurname}</Text>
                        </View>

                        <TouchableOpacity onPress={this._handleProfileSettingsClick}>
                            <View style={styles.profileCircle}>
                                <CustomIcon
                                    name="edit-2"
                                    size={25}
                                    style={{color: '#fff'}}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.cardListArea, {borderRadius:15}]}>
                        <Card style={styles.card_}>
                            <Ripple rippleSize={100} rippleColor={'#8394CB'} onPress={this._handleAddressClick}>
                                <CardItem style={styles.card}>
                                    <Image
                                        source={ProfileAddressImg}
                                        style={{width:20, height:20, marginRight:14, marginLeft:-5}}
                                    />
                                    <Text style={styles.cardText}>Adreslerim</Text>
                                    <View style={{ position:'absolute', right:11 }}>
                                        <Image
                                            source={RightArrow}
                                            style={{width:13, height:13, }}
                                        />
                                    </View>
                                </CardItem>
                            </Ripple>
                            <Ripple rippleSize={100} rippleColor={'#8394CB'} onPress={this._handleOrdersClick}>
                                <CardItem style={styles.card}>
                                    <Image
                                        source={ProfileOrdersImg}
                                        style={{width:20, height:20, marginRight:14, marginLeft:-5}}
                                    />
                                    <Text style={styles.cardText}>Siparişlerim</Text>
                                    <View style={{ position:'absolute', right:11 }}>
                                        <Image
                                            source={RightArrow}
                                            style={{width:13, height:13, }}
                                        />
                                    </View>
                                </CardItem>
                            </Ripple>


                            <Ripple rippleSize={100} rippleColor={'#8394CB'} onPress={() => this.props.navigation.navigate('ChangePassword')}>
                                <CardItem style={styles.card}>
                                    <Image
                                        source={ProfileKeyImg}
                                        style={{width:20, height:20, marginRight:14, marginLeft:-5}}
                                    />
                                    <Text style={styles.cardText}>Şifremi değiştir</Text>
                                    <View style={{ position:'absolute', right:11 }}>
                                        <Image
                                            source={RightArrow}
                                            style={{width:13, height:13, }}
                                        />
                                    </View>
                                </CardItem>
                            </Ripple>

                            <Ripple rippleSize={100} rippleColor={'#8394CB'} onPress={this._handleComplaintClick}>

                                <CardItem style={styles.card}>
                                    <Image
                                        source={ProfileComplaintImg}
                                        style={{width:20, height:20, marginRight:14, marginLeft:-5}}
                                    />
                                    <Text style={styles.cardText}>Şikayette bulun</Text>
                                    <View style={{ position:'absolute', right:11 }}>
                                        <Image
                                            source={RightArrow}
                                            style={{width:13, height:13, }}
                                        />
                                    </View>
                                </CardItem>

                            </Ripple>
                            <TouchableOpacity onPress={this._handleLogout}>
                                <CardItem style={{borderRadius:15}}>
                                    <Image
                                        source={ProfileLogoutImg}
                                        style={{width:20, height:20, marginRight:14, marginLeft:-5}}
                                    />
                                    <Text style={styles.cardText}>Çıkış yap</Text>
                                    <View style={{ position:'absolute', right:11 }}>
                                        <Image
                                            source={RightArrow}
                                            style={{width:13, height:13, }}
                                        />
                                    </View>
                                </CardItem>
                            </TouchableOpacity>
                        </Card>
                    </View>


                </View>

            </Content>

        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        height:55,
        paddingLeft:10
    },
    cardText:{
      fontFamily:'Muli-Light'
    },
    card_:{
        shadowColor: '#304555',
        shadowOpacity:0.10,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
        },
        elevation:1,
        borderRadius:15,
    },
    card:{
      borderRadius:15,
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        width:'100%'
    },
    cardListArea:{
      marginVertical:30
    },
    profileIntoTextArea:{
      display:'flex',
        flexDirection:'column',
      justifyContent:'center',
        paddingHorizontal:15,
        width:'70%',
    },
    profileCircle:{
      width:50,
      height:50,
        borderRadius:50,
        backgroundColor:'#8394CB',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        shadowColor: '#304555',
        shadowOpacity:0.30,
        shadowRadius: 5,
        shadowOffset: {
            width:0,
            height: 0,
        },
        elevation:1,

        borderTopColor: 'transparent',

    },
    profileInfo:{
      display:'flex',
        flexDirection:'row',
    },
    profileArea:{
        marginTop:15,
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
