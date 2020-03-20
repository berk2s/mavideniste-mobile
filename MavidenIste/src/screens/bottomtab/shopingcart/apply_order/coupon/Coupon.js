import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import {Input, Item, Spinner} from 'native-base';
import Ripple from 'react-native-material-ripple';

import validationSchema from './validations'

import API from '../../../../../api';

import {Formik} from 'formik';
import AuthStore from '../../../../../store/AuthStore';
import Snackbar from 'react-native-snackbar';
import BasketStore from '../../../../../store/BasketStore';

export default class Coupon extends Component {

    _handleSubmit = async (values, bag) => {
        try{
            const {coupon} = values;

            const validateCoupon = await API.post('/api/coupon/validate',{
                user_id: AuthStore.getUserID,
                coupon_name:coupon,
                total_price: BasketStore.getTotalPriceWithCommite,
                products: BasketStore.getProducts,
            },{
                headers:{
                    'x-access-token': AuthStore.getToken
                }
            });

            if(validateCoupon.data.status.code == 'VC_1'){
                Snackbar.show({
                    text: validateCoupon.data.data,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor:'#d32f2f',
                    textColor:'white',
                });
                bag.setErrors({coupon: validateCoupon.data.data})
                return false
            }

            if(validateCoupon.data.status.code == 'VC_2'){
                Snackbar.show({
                    text: validateCoupon.data.data,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor:'#d32f2f',
                    textColor:'white',
                });
                bag.setErrors({coupon: validateCoupon.data.info})
                return false
            }

        }catch(e){
            console.log(e);
        }
    }

    render() {
    return (
      <View>
          <Formik
            initialValues={{
                coupon:''
            }}
            validationSchema={validationSchema}
            onSubmit={this._handleSubmit}
          >
              {({values, errors, handleSubmit, touched, setFieldTouched, handleChange, isSubmitting}) => (
                  <>
                  <Item style={[styles.inputAreaLast, styles.inputArea, {borderWidth:1, borderBottomColor:'#ddd', shadowColor:'#fff', borderRadius:0}]} error={errors.coupon && touched.coupon}>
                      <Input
                          style={[styles.input, {fontFamily:'Muli-Regular',color:'#304555', borderRadius:0, paddingLeft:0, paddingHorizontal:0, borderWidth:0}]}
                          placeholder="Kuponu girin"
                          placeholderTextColor={'#304555'}
                          returnKeyType={'go'}
                          value={values.coupon}
                          onBlur={() => setFieldTouched('coupon')}
                          onChangeText={handleChange('coupon')}
                      />
                  </Item>

                  <Ripple style={{marginTop:15, width:'100%'}} onPress={handleSubmit} rippleDuration={1000} rippleColor={'#fff'}>
                      <View style={[styles.paymentBtn, {width:'100%', height:33}]}>

                          {isSubmitting && <Spinner size={'small'} color={'#fff'} />}
                          {!isSubmitting && <Text style={[styles.actionText, {fontSize:14}]}>Uygula</Text>}

                      </View>
                  </Ripple>

                      {   (errors.coupon && touched.coupon)  && <Text style={styles.errorText}>{errors.coupon}</Text> }


                  </>
              )}
          </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    errorText:{
      fontFamily:'Muli-Regular',
      fontSize:13,
      color:'#ff0000',
        marginTop:15
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
