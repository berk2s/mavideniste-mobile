import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Alert} from 'react-native';
import {Body, Container, Content, Header, Left, Title, Fab} from 'native-base';
import CustomIcon from '../../../../../font/CustomIcon';
import SwitcherStore from '../../../../../store/SwitcherStore';
import Switcher from '../../../switcher/Switcher';
import Spinner from 'react-native-loading-spinner-overlay';
import AuthStore from '../../../../../store/AuthStore';
import {observer} from 'mobx-react';

import LocationIMG from '../../../../../img/location.png'
import DeleteLocImg from '../../../../../img/deletelocation.png'
import AddLocImg from '../../../../../img/addlocation.png'
import EmptyIMG from '../../../../../img/road.png';

import LocationAPI from '../../../../../locationapi'
import API from '../../../../../api'

import Ripple from 'react-native-material-ripple';


@observer
export default class AddresManagement extends Component {

    state = {
        loading:false,
        active:false,
        getData: []
    }

    componentDidMount() {
        this.setState({
            getData: [],
        });

        this.setState({
            getData:this.props.navigation.getParam('address'),
        });
    }


    _clickEvent = () => {
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

    _handleAddLocationClick = async() => {

        try{

            this.setState({
                loading:true,
            });


            const datas = await LocationAPI.get('/api/location/province');

           // console.log(datas.data)

            this.props.navigation.navigate('AddAddress', {provinces: datas.data});
            this.setState({
                loading:false,
            });

        }catch(e){
            alert(e)
        }
    }

    _handleRemoveAddress = async (id) => {
        try{
            Alert.alert(
                'Adresi sil',
                'Adresi silmeye emin misin?',
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

                            const getToken = AuthStore.getToken;
                            const getUserId = AuthStore.getUserID;

                            const deleteit = await API.delete(`/api/user/address/${getUserId}/${id}`, {
                                headers:{
                                    'x-access-token': getToken
                                }
                            });

                            this.setState({
                                getData: [],
                            });

                            this.state.getData = [...deleteit.data.data]

                            this.props.navigation.navigate('AddressList', {address: deleteit.data.data})

                            this.setState({
                                loading:false,
                            });

                        }
                    },
                ]
            );
        }catch(e){
            console.log(e);
        }
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
                    <Title style={styles.bodyTitleText}>Adreslerim</Title>
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

            <Ripple rippleSize={60} style={styles.fabAdd} onPress={this._handleAddLocationClick}>
                <Image
                    source={AddLocImg}
                    style={{width:28, height:28}}
                />
            </Ripple>

            <Content
                style={{display:'flex', flex:1,}}
                padder>
                <View style={styles.addressListArea}>

                    {this.state.getData.length == 0
                    ?
                        <View style={{display:'flex', height:Dimensions.get('window').height-200, justifyContent:'center', alignItems:'center'}}>
                            <Image source={EmptyIMG} style={{width:90, height:90}}/>
                            <Text style={{fontFamily:'Muli-ExtraBold', marginTop: 15, fontSize:20, color:'#304555'}}>Kayıtlı adresin yok</Text>
                            <Text style={{fontFamily:'Muli-SemiBold', marginTop:5, fontSize:15, color:'#304555'}}>zaman kazanmak için adres ekleyebilirsin</Text>
                        </View>
                    :
                        this.props.navigation.getParam('address').map((e, key) => {
                            return <TouchableOpacity ob style={styles.addressCard} key={key}>
                                <View style={styles.addressCardHeader}>
                                    <Image source={LocationIMG} style={{width:17, height:17}}/>
                                    <Text style={styles.infoText}>{e.address_title}</Text>
                                    <Text style={styles.infoText2}>({e.address_province.text}, {e.address_county.text})</Text>
                                    <Ripple onPress={() => this._handleRemoveAddress(e._id)} style={{position:'absolute', right:-6, top:-8, zIndex:999}}>
                                        <Image source={DeleteLocImg} style={{width:30, height:30}} />
                                    </Ripple>
                                </View>
                                <View style={styles.addressCardBody}>
                                    <Text style={styles.descText}>
                                        {e.address}
                                    </Text>
                                    <Text style={styles.descText}>
                                        {e.address_direction.trim() != '' ? <Text>({e.address_direction})</Text>: <></>}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        })

                    }

                </View>


            </Content>

        </Container>
    );
  }
}

const styles = StyleSheet.create({
    fabAdd:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        right:15,
        backgroundColor:'#F5F5F5',
        width:50,
        height:50,
        borderRadius:50,
        shadowColor: "#000000",
        marginBottom:20,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
        zIndex:9999,
    },

    infoText2:{
      fontFamily:'Muli-Light',
        fontSize:12,

    },
    adressBodyProvince:{
      display:'flex',
      flexDirection:'row'
    },
    descText:{
      fontFamily:'Muli-Regular',
        fontSize:13

    },
    addressCardBody:{
      display:'flex',
        paddingVertical: 5
    },
    infoText:{
      paddingHorizontal:5,
        fontFamily:'Muli-Bold'
    },
    addressCardHeader:{
      display:'flex',
      flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-end'
    },
    addressCard:{
        width:'100%',
        backgroundColor:'#fff',
        paddingVertical:10,
        paddingHorizontal: 10,
        borderRadius:6,
        zIndex:99,
        shadowColor: "#000000",
        marginBottom:20,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    addressListArea:{
        //height:'100%'
    },
    inputs:{
        marginBottom:10
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
        paddingLeft:15,
    },
    inputArea:{
        borderColor:'#fff',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        backgroundColor:'#fff',
        borderRadius:10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 5,
        elevation: 5,
    },
    inputFormArea:{
        marginVertical:15
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
        shadowColor: '#000',
        shadowOpacity:0.15,
        shadowRadius: 9,
        shadowOffset: {
            height: 0,
        },
        elevation:5,

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
