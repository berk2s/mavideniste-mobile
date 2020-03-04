import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Container, Content, Header, Left, Title} from 'native-base';
import CustomIcon from '../../../../../../font/CustomIcon';
import SwitcherStore from '../../../../../../store/SwitcherStore';
import Switcher from '../../../../switcher/Switcher';
import Spinner from 'react-native-loading-spinner-overlay';
import EditAddressForm from './EditAddressForm';

export default class EditAddress extends Component {

    state = {
        loading:false
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
                    <Title style={styles.bodyTitleText}>Adres Düzenle</Title>
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

                <EditAddressForm {...this.props} />

            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
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
