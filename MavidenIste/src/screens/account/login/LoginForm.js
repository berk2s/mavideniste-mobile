import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Form, Input, Item} from 'native-base';
import CustomIcon from '../../../font/CustomIcon';
import LinearGradient from "react-native-linear-gradient";

export default class LoginForm extends Component {
  render() {
    return (
      <View>
          <Form>
              <View style={styles.inputsArea}>
                  <Item style={[styles.inputAreaFirst, styles.inputArea]}>
                      <View>
                          <Text style={styles.accIcon}>
                              <CustomIcon
                                  name="person"
                                  size={20}
                                  style={{color: '#616D7B'}}
                              />
                          </Text>
                      </View>
                      <Input
                          style={styles.input}
                          placeholder="E-Mail adresi"
                          placeholderTextColor={'#B4B4B4'}
                      />
                  </Item>
                  <Item style={[styles.inputAreaLast, styles.inputArea]}>
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
                      />
                  </Item>

                  <View style={styles.forgotPassArea}>

                      <TouchableOpacity>
                          <Text style={styles.forgotPassText}>Şifremi Unuttum</Text>
                      </TouchableOpacity>

                  </View>

                  <View style={styles.btnArea}>
                      <TouchableOpacity
                          style={styles.btn}
                      >
                          <LinearGradient
                              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                              colors={['#1100FF', '#4855FF', '#0077FF']} style={styles.btn}>

                              <Text style={{color:'#fff'}}>
                                  Giriş
                              </Text>
                          </LinearGradient>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.helperTextArea}>

                      <Text style={styles.helperText1}>Hesabınız yok mu? </Text>
                      <TouchableOpacity>
                          <Text style={styles.helperText2}>Hemen kayıt olun.</Text>
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
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:32
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
        color: '#B4B4B4',
    },
    inputAreaFirst: {
        marginTop: 30,
        marginBottom: 30,
    },
    inputAreaLast: {
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
