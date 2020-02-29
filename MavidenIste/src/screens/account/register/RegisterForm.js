import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Form, Input, Item} from 'native-base';
import CustomIcon from '../../../font/CustomIcon';
import LinearGradient from "react-native-linear-gradient";

import {Formik} from 'formik';

import { TextInputMask } from 'react-native-masked-text'

export default class RegisterForm extends Component {
  render() {
    return (
      <View>
              <View style={styles.inputsArea}>

                  <Formik
                    initialValues={{
                        nameSurname:'',
                        emailAddress:'',
                        password:'',
                        passwordConfirm:'',
                        phoneNumber:'',
                    }}
                  >
                      {({values, handleChange}) => (
                        <>
                            <Item style={[styles.inputAreaFirst, styles.inputArea]}>
                                <Text style={styles.passIcon}>
                                    <CustomIcon
                                        name="person"
                                        size={20}
                                        style={{color: '#616D7B'}}
                                    />
                                </Text>
                                <Input
                                    style={styles.input}
                                    placeholder="Adın soyadın"
                                    placeholderTextColor={'#B4B4B4'}
                                    autoCorrect={false}
                                    returnKeyType={'next'}

                                    value={values.nameSurname}
                                    onChangeText={handleChange('nameSurname')}
                                    onSubmitEditing={() => this.emailAddress._root.focus()}
                                />
                            </Item>

                            <Item style={[styles.inputAreaLast, styles.inputArea]}>
                                <View>
                                    <Text style={styles.accIcon}>
                                        <CustomIcon
                                            name="at"
                                            size={20}
                                            style={{color: '#616D7B'}}
                                        />
                                    </Text>
                                </View>
                                <Input
                                    style={styles.input}
                                    placeholder="E-Mail adresi"
                                    placeholderTextColor={'#B4B4B4'}
                                    returnKeyType={'next'}
                                    keyboardType={'email-address'}
                                    autoCapitalize={false}

                                    value={values.emailAddress}
                                    onChangeText={handleChange('emailAddress')}
                                    onSubmitEditing={() => this.phoneNumber.getElement().focus()}

                                    ref={(ref) => this.emailAddress = ref}
                                />
                            </Item>

                            <Item style={[styles.inputAreaLast, styles.inputArea]}>
                                <Text style={styles.passIcon}>
                                    <CustomIcon
                                        name="phone"
                                        size={20}
                                        style={{color: '#616D7B'}}
                                    />
                                </Text>
                                <TextInputMask
                                    style={styles.input}
                                    placeholder="Telefon numarası"
                                    placeholderTextColor={'#B4B4B4'}
                                    autoCorrect={false}
                                    returnKeyType={'next'}

                                    type={'custom'}
                                    options={{
                                        mask: '0 (999) 999 9999',
                                        getRawValue: function(value, settings) {
                                            return value.replace(/\D/g,'');
                                        },
                                    }}

                                    value={values.phoneNumber}
                                    onChangeText={handleChange('phoneNumber')}
                                    onSubmitEditing={() => this.password._root.focus()}

                                    ref={(ref) => this.phoneNumber = ref}
                                />
                            </Item>

                            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

                                <Item style={[styles.inputAreaLast, styles.inputArea, {width:'45%'}]}>
                                    <Text style={styles.passIcon}>
                                        <CustomIcon
                                            name="unlock"
                                            size={20}
                                            style={{color: '#616D7B'}}
                                        />
                                    </Text>
                                    <Input
                                        style={styles.input}
                                        placeholder="Şifre"
                                        placeholderTextColor={'#B4B4B4'}
                                        secureTextEntry
                                        returnKeyType={'next'}
                                        autoCapitalize={false}
                                        autoCorrect={false}

                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onSubmitEditing={() => this.passwordConfirm._root.focus()}

                                        ref={(ref) => this.password = ref}
                                    />
                                </Item>

                                <Item style={[styles.inputAreaLast, styles.inputArea, {width:'45%'}]}>
                                    <Text style={styles.passIcon}>
                                        <CustomIcon
                                            name="unlock"
                                            size={20}
                                            style={{color: '#616D7B'}}
                                        />
                                    </Text>
                                    <Input
                                        style={styles.input}
                                        placeholder="Şifre Tekrarı"
                                        placeholderTextColor={'#B4B4B4'}
                                        secureTextEntry
                                        returnKeyType={'go'}
                                        autoCapitalize={false}
                                        autoCorrect={false}

                                        value={values.passwordConfirm}
                                        onChangeText={handleChange('passwordConfirm')}

                                        ref={ref => this.passwordConfirm = ref}
                                    />
                                </Item>

                            </View>



                            <View style={styles.btnArea}>
                                <TouchableOpacity
                                    style={styles.btn}
                                >
                                    <LinearGradient
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        colors={['#1100FF', '#4855FF', '#0077FF']} style={styles.btn}>

                                        <Text style={{color:'#fff'}}>
                                            Kayıt
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </>
                      )}

                  </Formik>
                  <View style={styles.helperTextArea}>

                      <Text style={styles.helperText1}>Zaten hesabınız var mı? </Text>
                      <TouchableOpacity>
                          <Text style={styles.helperText2}>Giriş yapın.</Text>
                      </TouchableOpacity>
                  </View>
              </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    helperTextArea:{
        display:'flex',
        flexDirection: 'row',
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
        width:60,
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
        marginTop:35
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
        color: '#304555',
    },
    inputAreaFirst: {
        marginTop: 30,
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
