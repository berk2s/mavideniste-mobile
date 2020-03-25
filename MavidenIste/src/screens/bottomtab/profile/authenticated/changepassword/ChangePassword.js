import React, { Component } from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Card, CardItem, Container, Content, Header, Input, Item, Left, Switch, Title, ListItem, Right, Button} from 'native-base';
import CustomIcon from '../../../../../font/CustomIcon';
import SwitcherStore from '../../../../../store/SwitcherStore';
import Switcher from '../../../switcher/Switcher';
import Spinner from 'react-native-loading-spinner-overlay';
import {observer} from 'mobx-react';

import ChangePasswordForm from './ChangePasswordForm';
import AuthStore from '../../../../../store/AuthStore';

@observer
export default class ChangePassword extends Component {

    state = {
        loading:false,
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

    render() {
        return (
            <Container style={[styles.container, {backgroundColor:'#F6F6F6'}]}>
                <Header transparent style={styles.header}>
                    <Left style={styles.leftArea}>

                        <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                            <CustomIcon name="arrow-left" size={28} style={{color:'#003DFF'}} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.body}>
                        <Title style={styles.bodyTitleText}>Şifremi değiştir</Title>
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

                        <ChangePasswordForm />
                    </View>

                </Content>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    inputs:{
    //    marginBottom:10
    },
    inputInfoArea:{
        fontFamily:'Muli-Light',
        fontSize: 14,
        marginHorizontal:2,
      //  marginVertical: 10
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
     //   marginVertical:15
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
       // marginTop:15,
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
