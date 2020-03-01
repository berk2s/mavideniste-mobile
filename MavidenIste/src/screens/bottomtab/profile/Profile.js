import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Dimensions, Image} from 'react-native';

import {observer} from 'mobx-react';

import AuthStore from '../../../store/AuthStore';

import {Body, Container, Content, Header, Left, Title, Card, CardItem, Icon, Right} from 'native-base';
import CustomIcon from '../../../font/CustomIcon';
import SwitcherStore from '../../../store/SwitcherStore';
import Switcher from '../switcher/Switcher';
import Spinner from 'react-native-loading-spinner-overlay';
import LoginIMG from '../../../img/login.png';

@observer
export default class Profile extends Component {

    state = {
        loading:false
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
                    <Title style={styles.bodyTitleText}>Profilim</Title>
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
                            <Text style={{fontFamily:'Muli-ExtraBold', color:'#304555', fontSize:17}}>Berk Topcu</Text>
                        </View>

                        <View style={styles.profileCircle}>
                            <CustomIcon
                                name="edit-2"
                                size={25}
                                style={{color: '#fff'}}
                            />
                        </View>
                    </View>

                    <View style={[styles.cardListArea, {borderRadius:15}]}>
                        <Card style={styles.card_}>
                            <CardItem style={styles.card}>
                                <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                <Text style={styles.cardText}>Adreslerim</Text>
                                <Right>
                                    <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                </Right>
                            </CardItem>
                            <CardItem style={styles.card}>
                                <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                <Text style={styles.cardText}>Siparişlerim</Text>
                                <Right>
                                    <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                </Right>
                            </CardItem>

                            <CardItem style={styles.card}>
                                <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                <Text style={styles.cardText}>Alışveriş listem</Text>
                                <Right>
                                    <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                </Right>
                            </CardItem>

                            <CardItem style={styles.card}>
                                <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                <Text style={styles.cardText}>İndirim kuponlarım</Text>
                                <Right>
                                    <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                </Right>
                            </CardItem>
                            <CardItem style={styles.card}>
                                <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                <Text style={styles.cardText}>Şifremi değiştir</Text>
                                <Right>
                                    <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                </Right>
                            </CardItem>
                            <CardItem style={styles.card}>
                                <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                <Text style={styles.cardText}>Şikayette bulun</Text>
                                <Right>
                                    <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                </Right>
                            </CardItem>
                            <CardItem style={{borderRadius:15}}>
                                <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                <Text style={styles.cardText}>Çıkış yap</Text>
                                <Right>
                                    <CustomIcon name="person-fill" size={25} style={{color: '#fff'}} />
                                </Right>
                            </CardItem>
                        </Card>
                    </View>


                </View>

            </Content>

        </Container>
    );
  }
}

const styles = StyleSheet.create({
    cardText:{
      fontFamily:'Muli-Light'
    },
    card_:{
        shadowColor: '#000',
        shadowOpacity:0.10,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
        },
        elevation:5,
        borderRadius:15,
    },
    card:{
      borderRadius:15,
        borderBottomWidth:1,
        borderBottomColor:'#eee',
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
