import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Body, Input, Item, Left, ListItem, Right, Textarea, Button} from 'native-base';

import {Formik} from 'formik'
import Spinner from 'react-native-loading-spinner-overlay';

import Snackbar from 'react-native-snackbar';
import CustomIcon from '../../../../../../font/CustomIcon';

export default class AddAddressForm extends Component {

    state = {
        loading: false,
    }

    _handleBlurNameSurname = async (value) => {
        try{
            if(value.trim().length < 4){
                Snackbar.show({
                    text: 'Lütfen gerçekci isim girin',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor:'#d32f2f',
                    textColor:'white',
                });
                return false
            }

            this.setState({
                loading:true,
            });

            const name_surname = value;
            const update = await API.put(`/api/user/name`, {
                name_surname: name_surname,
                user_id: AuthStore.getUserID
            });

            await AuthStore.setNameSurname(name_surname);

            this.setState({
                loading:false,
            });

        }catch(e){
            console.log(e)
        }
    }

    _handleBlurPermissionEMAIL = async (value) => {
        try{
            this.setState({
                loading:true,
            });

            const update = await API.put(`/api/user/permission/email`, {
                value: value,
                user_id: AuthStore.getUserID
            });

            this.setState({
                loading:false,
            });
        }catch(e){
            console.log(e)
        }
    }

    _handleBlurPermissionSMS = async (value) => {
        try{
            this.setState({
                loading:true,
            });

            const update = await API.put(`/api/user/permission/sms`, {
                value: value,
                user_id: AuthStore.getUserID
            });

            this.setState({
                loading:false,
            });
        }catch(e){
            console.log(e)
        }
    }

    render() {
        return (
            <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Spinner
                    visible={this.state.loading}
                    animation={'fade'}
                    size={'small'}
                />
                <Formik
                    initialValues={{
                        name_surname: '',
                        phone_number: '',
                        email_address: '',
                        permission_email: '',
                        permission_sms: ''
                    }}
                >
                    {({values, setFieldValue, handleChange}) => (
                        <View style={styles.inputFormArea}>
                            <View style={styles.inputs}>
                                <Text style={styles.inputInfoArea}>Adres başlığı <Text style={{color:'red'}}>*</Text></Text>
                                <Item
                                    style={styles.inputArea}>
                                    <Input
                                        style={[styles.input, {zIndex:9}]}
                                        value={values.name_surname}
                                        onChangeText={handleChange('name_surname')}
                                        onBlur={() => this._handleBlurNameSurname(values.name_surname)}
                                    />
                                    <View style={{marginRight:5}}>
                                        <Text style={styles.accIcon}>
                                            <CustomIcon
                                                name="edit-2"
                                                size={18}
                                                style={{color: '#616D7B'}}
                                            />
                                        </Text>
                                    </View>
                                </Item>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={styles.inputInfoArea}>İl <Text style={{color:'red'}}>*</Text></Text>
                                <Item
                                    style={styles.inputArea}>
                                    <Input
                                        style={[styles.input, {zIndex:9}]}
                                        value={values.phone_number}
                                        editable={false}
                                    />

                                </Item>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={styles.inputInfoArea}>İlçe <Text style={{color:'red'}}>*</Text></Text>
                                <Item
                                    style={styles.inputArea}>
                                    <Input
                                        style={[styles.input, {zIndex:9}]}
                                        value={values.email_address}
                                        editable={false}
                                    />
                                </Item>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={styles.inputInfoArea}>Mahalle <Text style={{color:'red'}}>*</Text></Text>
                                <Item
                                    style={styles.inputArea}>
                                    <Input
                                        style={[styles.input, {zIndex:9}]}
                                        value={values.email_address}
                                        editable={false}
                                    />
                                </Item>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={styles.inputInfoArea}>Adres <Text style={{color:'red'}}>*</Text></Text>
                                <Item
                                    style={[styles.inputArea, {height:100}]}>
                                    <Input
                                        style={[styles.input, {zIndex:9, height:100}]}
                                        value={values.email_address}
                                        editable={false}
                                    />

                                </Item>
                            </View>

                            <View style={styles.inputs}>
                                <Text style={styles.inputInfoArea}>Adres Tarifi</Text>
                                <Item
                                    style={[styles.inputArea, {height:100}]}>
                                    <Input
                                        style={[styles.input, {zIndex:9, height:100}]}
                                        value={values.email_address}
                                        editable={false}
                                    />

                                </Item>

                                <Button style={{backgroundColor:'#003DFF', borderRadius:12, marginVertical:25}} full>
                                    <Text style={{fontFamily:'Muli-ExtraBold', color:'#fff'}}>Kaydet</Text>
                                </Button>

                            </View>

                        </View>
                    )}
                </Formik>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        width:'100%',
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
});
