import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Platform,
    Image,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import {Container, Header, Button, Content, Input, Item} from 'native-base';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
// API
import API from '../../../api'

import {inject, observer} from 'mobx-react';

//brach fake
import {BRANCH_ID, IMAGE_URL} from '../../../constants'

//components
import HeaderWithSearch from '../../components/HeaderWithSearch';
import Loading from '../../components/Loading';
import CategoryCard from './components/CategoryCard';

import FastImage from 'react-native-fast-image'
import { NavigationEvents } from "react-navigation";
import Switcher from '../switcher/Switcher';
import SwitcherStore from '../../../store/SwitcherStore';
import Spinner from 'react-native-loading-spinner-overlay';

import PushNotification from 'react-native-push-notification'
import firebase from 'react-native-firebase';

import AsyncStorage from '@react-native-community/async-storage';

import AuthStore from '../../../store/AuthStore';
const messaging = firebase.messaging();
import type { RemoteMessage, NotificationOpen } from "react-native-firebase";
import CustomIcon from '../../../font/CustomIcon';

import HeaderForFeed from '../../components/HeaderForFeed';

import ProductCard from '../../components/ProductCard';
import EmptyIMG from '../../../img/search_result.png';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import Geolocation from '@react-native-community/geolocation';

import ChangeIMG from '../../../img/changebranch.png'
import BranchIMG from '../../../img/supermarket.png'
import Modal, {ModalContent} from 'react-native-modals';

@inject('BasketStore', 'ProductStore')
@observer

export default class Feed extends Component {

    state = {
        loadingHeight: Dimensions.get('window').height-160,
        fetched:false,
        datas: [],
        loading :false,
        headerSeacrh:false,
        searchKey:null,
        searchResults:[],
        visibleBranchChange:false
    }


    componentDidMount = async () => {
        try{

            Geolocation.requestAuthorization()

            const categories = await API.get(`/api/category/current/${BRANCH_ID}`);
            this.state.datas = [...categories.data.data]

            await this.props.BasketStore.readyProducts()
            /*
                categories.data.data._id,
                categories.data.data.category_name,
                categories.data.data.category_image,
             */
            setTimeout(() => {
                this.setState({
                    fetched: true,
                });
            }, 1000)

            console.log(categories.data.data);

        }catch(e){
            console.log(e)
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

    _handleSearchChange = (val) => {
        this.setState({
            loading:false,
        });

    }

    _handleOnBlur = async (val) => {
        try{
            if(val == null){
                this.setState({
                    loading: true
                });

                setTimeout(() => {
                    this.setState({
                        loading: false,
                        headerSearch: false,
                        searchResults:[]
                    });

                }, 500)
            }else {
                this.setState({
                    headerSearch: true,
                    loading: true,
                    searchKey:val
                });

                const results = await API.get(`/api/product/search/${val.trim()}`);

                this.state.searchResults = [...results.data.data]

                console.log(results.data)

                this.setState({
                    loading:false,
                });


            }
        }catch(e){
            console.log(e);
        }
    }

    render() {
    return (
        <SafeAreaView style={styles.container}>
            {this.state.fetched
                ?
                   <HeaderForFeed
                       onChange={this._handleSearchChange}
                       onBlur={this._handleOnBlur}
                   />
                :
                    <></>
            }

            {
                SwitcherStore.isSwitcherClicked
                    ?
                    <Switcher
                        clickEvent={this._handleCurrierClick}
                    />
                    :
                    <></>
            }

            <Spinner
                visible={this.state.loading}
                animation={'fade'}
                size={'small'}
            />

            <Modal
                visible={this.state.visibleBranchChange}
                onTouchOutside={(event) => {
                    this.setState({ visibleBranchChange: false });
                }}
            >
                <ModalContent style={{width:270, height:270,}}>
                    <View style={[{borderBottomColor: '#fff', marginVertical:0, marginBottom:0, paddingBottom:0}]}>
                        <Text style={{fontFamily:'Muli-Bold', color:'#304555', marginBottom:10, fontSize:16}}>Şube değiştir</Text>
                    </View>
                    <View style={{height:200}}>

                        <FlatList
                            data={[
                                {text:'Serdivan'},
                                {text:'Düzce'},
                                {text:'Kütahya'},
                                {text:'Adana'},
                                {text:'Van'},
                                {text:'Manisa'},

                            ]}
                            renderItem={({ item, index }) => (

                                <Ripple style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', height:50, marginBottom:1}}>
                                    <Image source={BranchIMG} style={{width:25, height:25, marginRight:10}} />
                                    <Text style={{fontFamily:'Muli-Bold', color:'#304555',}}>{item.text}</Text>
                                </Ripple>
                            )}
                            keyExtractor={item => ''.concat(Math.random())}/>
                    </View>
                </ModalContent>
            </Modal>

          <Content
              style={{display:'flex', flex:1, height:'100%'}}
              padder>

              <NavigationEvents
                  onWillBlur={payload => {
                    //  console.log(payload);
                  }}
                  />


              <View style={[styles.content, {height:'100%'}]}>
                  {this.state.fetched
                      ?
                        this.state.headerSearch
                            ?
                            <>

                                {this.state.searchResults.length > 0
                                    ?
                                    <>
                                    <View style={styles.searchResultArea}>
                                        <View style={styles.searchInfoArea}>
                                            <Text style={styles.infoTexts}>Tüm ürünlerde <Text style={styles.infoSearchText}>{this.state.searchKey}</Text> için sonuçlar </Text>
                                        </View>
                                    </View>

                                    <View style={styles.cardArea2}>
                                        {this.state.searchResults.map(e => {
                                                return <ProductCard key={e._id} e={e} {...this.props} />
                                            })}
                                    </View>
                                    </>
                                    :
                                    <View style={{display:'flex', height:Dimensions.get('window').height-200, justifyContent:'center', alignItems:'center'}}>
                                        <Image source={EmptyIMG} style={{width:80, height:80}}/>
                                        <Text style={{fontFamily:'Muli-ExtraBold', marginTop: 15, fontSize:20, color:'#304555'}}>Hiç ürün bulamadık</Text>
                                        <Text style={{fontFamily:'Muli-SemiBold', marginTop:5, fontSize:15, color:'#304555'}}>üzgünüz, en kısa sürede tedarik edeceğiz</Text>
                                    </View>
                                }
                            </>
                            :
                                    <View style={{flex:1}}>
                                        <View style={{marginBottom:20, display:'flex', flexDirection:'row', justifyContent:'flex-end', paddingHorizontal:5}}>
                                            <TouchableOpacity style={{dipslay:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} onPress={() => {
                                                this.setState({
                                                    visibleBranchChange:true,
                                                });

                                            }}>
                                                <View style={{display:'flex', flexDirection:'row'}}>
                                                    <Text style={{fontFamily:'Muli-ExtraBold', color:'#003DFF', fontSize:16}}>Serd</Text>
                                                    <Text style={{fontFamily:'Muli-ExtraBold', color:'#00CFFF', fontSize:16}}>ivan</Text>
                                                </View>
                                                <Image
                                                    source={ChangeIMG}
                                                    style={{width:16, height:16, marginLeft:10}}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    <View style={styles.cardArea}>
                                        {
                                            this.state.datas.map(e => {
                                                const uri = IMAGE_URL+e.category_image;
                                                return <View

                                                    key={e._id}

                                                >
                                                    <View style={styles.card} >
                                                        <Ripple
                                                            rippleSize={300}
                                                            rippleDuration={1000}
                                                            rippleColor={'#fff'}
                                                            onPress={() => this.props.navigation.navigate('Product', {category_id: e._id, category_name:e.category_name})}
                                                            style={styles.cardWhiteArea}>
                                                            <FastImage
                                                                source={{uri: uri}}
                                                                style={styles.cardImage}
                                                            />
                                                        </Ripple>
                                                        <View style={styles.cardTextArea}>
                                                            <Text style={styles.cardText}>{e.category_name}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            })
                                        }
                                    </View>
                                    </View>
                      :
                      <View style={[styles.loadingView, {height: this.state.loadingHeight}]}>
                          <Loading />
                      </View>
                  }
              </View>
              </Content>

        </SafeAreaView>
    );
  }
}

messaging.hasPermission()
    .then((enabled) => {
        if (enabled) {
            messaging.getToken()
                .then(async token => {

                    const postToken = await API.post(`/api/notification/token`, {
                        token:token,
                        platform: Platform.OS
                    });

                    await AsyncStorage.setItem('token', token);

                 })
                .catch(error => { /* handle error */ });
        } else {
            messaging.requestPermission()
                .then(() => { /* got permission */ })
                .catch(error => { /* handle error */ });
        }
    })
    .catch(error => { /* handle error */ });

firebase.notifications().onNotification((notification) => {
    const { title, body } = notification;


        PushNotification.localNotification({
            title: title,
            message: body, // (required),
        });


});

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log("TOKEN:", token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: notification => {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
   senderID: "98899191986",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
});


const styles = StyleSheet.create({
    cardArea2:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
         paddingTop: 25
    },
    infoSearchText:{
      fontFamily:'Muli-Bold',
        color:'#00CFFF'
    },
    infoTexts:{
      fontFamily:'Muli-ExtraBold',
      fontSize:20,
      color:'#003DFF'
    },
    searchInfoArea:{
      display:'flex',
        flexDirection:'row',
       // justifyContent:'center'
    },
    searchResultArea:{
      display:'flex',
    },
    headerArea:{
      paddingHorizontal:15,
        paddingVertical:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    inputInfoArea:{
        fontFamily:'Muli-Light',
        fontSize: 14,
        marginHorizontal:2,
        marginVertical: 10
    },
    accIcon:{
        marginLeft: 10,
        marginRight: 5,
        marginTop:1
    },
    input:{
        fontFamily:'Muli-SemiBold',
        fontSize:13,
    },
    inputArea:{
        borderColor:'#fff',
        display:'flex',
        marginLeft:-2,
        height:28,
        width:'50%',
        backgroundColor:'#fff',
        borderRadius:20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 5,
        elevation: 1,
    },
    cardArea:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        //paddingTop: 25
    },
    card:{
        width:110,
        marginBottom:25,


    },
    cardWhiteArea:{
        backgroundColor: '#fff',
        borderRadius:20,
        width:110,
        height:92,
        display:'flex',
        justifyContent:'center',
        alignItems: 'center'
    },
    cardImage:{
        width:100,
        height:84,
        borderRadius: 20
    },
    cardTextArea:{
      width:110,
      display:'flex',
      alignItems:'center',
      justifyContent: 'center',
      paddingVertical:5,
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
        display:'flex',
        paddingBottom:0,
        marginBottom:0
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});
