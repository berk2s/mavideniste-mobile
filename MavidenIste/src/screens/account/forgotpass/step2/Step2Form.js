import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Form, Input, Item} from 'native-base';
import CustomIcon from '../../../../font/CustomIcon';
import LinearGradient from "react-native-linear-gradient";

export default class Step2Form extends Component {
  render() {
    return (
        <View>
            <Form>
                <View style={styles.inputsArea}>
                    <Item style={[styles.inputAreaFirst, styles.inputArea]}>
                        <View>
                            <Text style={styles.accIcon}>
                                <CustomIcon
                                    name="unlock"
                                    size={20}
                                    style={{color: '#616D7B'}}
                                />
                            </Text>
                        </View>
                        <Input
                            style={styles.input}
                            placeholder="Yeni şifre"
                            placeholderTextColor={'#B4B4B4'}
                        />
                    </Item>

                    <Item style={[styles.inputAreaLast, styles.inputArea]}>
                        <View>
                            <Text style={styles.accIcon}>
                                <CustomIcon
                                    name="unlock"
                                    size={20}
                                    style={{color: '#616D7B'}}
                                />
                            </Text>
                        </View>
                        <Input
                            style={styles.input}
                            placeholder="Yeni şifre tekrarı"
                            placeholderTextColor={'#B4B4B4'}
                        />
                    </Item>

                    <View style={styles.btnArea}>
                        <TouchableOpacity
                            style={styles.btn}
                        >
                            <LinearGradient
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={['#1100FF', '#4855FF', '#0077FF']} style={styles.btn}>

                                <Text style={{color:'#fff'}}>
                                    İlerle
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>
            </Form>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    helperTextArea:{
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:32,
        marginBottom:72
    },
    helperText1:{
        fontFamily:'Muli-Bold',
        color:'#787878'
    },
    helperText2:{
        fontFamily:'Muli-Bold',
        color:'#FF0000'
    },
    btn:{
        width:78,
        height:25,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
    btnArea:{
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    forgotPassArea:{
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    forgotPassText:{
        fontFamily:'Muli-SemiBold',
        color:'#FF0000',
        fontSize:10
    },
    container: {
        flex: 1,
    },
    subContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        paddingVertical: '10%',
    },
    logoArea: {
        marginVertical: 65,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 96,
        height: 89,
    },
    textArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#003DFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Muli-Bold',
    },
    input: {
        width: '100%',
        height: 34,
        fontSize: 13,
        paddingLeft: 15,
        fontFamily: 'Muli-SemiBold',
        color: '#B4B4B4',
    },
    inputAreaFirst: {
        marginTop: 50,
        marginBottom: 30,
    },
    inputAreaLast: {
        marginBottom: 30,
    },
    inputAreaLast1: {
        marginBottom: 10,
    },
    inputArea: {
        height: 34,
    },
    inputsArea: {
        marginHorizontal: '10%',
    },
    passIcon: {},
    accIcon: {
        fontFamily: 'fontello',
    },
});
