import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Formik} from 'formik';
import validationSchema from './validations';
import {Button, Input, Item} from 'native-base';
import CustomIcon from '../../../../../../font/CustomIcon';
import RNPickerSelect from "react-native-picker-select";
import LocationAPI from '../../../../../../locationapi';
import AuthStore from '../../../../../../store/AuthStore';
import API from '../../../../../../api';

export default class EditAddressForm extends Component {

    state=  {
        loading:false,
        provinces: [],
        counties:[],
        districts: [],
        selectedProvince: null,
        selectedCounty: null,
        selectedDistrict:null,
        addressProvince:{label:'', value:{text:'', value:0}},
        addressCounty:{label:'', value:{text:'', value:0}},
    }

    _handleProvinceDone = async () => {
        try{
            const provinceID = this.state.selectedProvince;
            const datas = await LocationAPI.get(`/api/location/county/${provinceID}`);
            this.setState({
                counties: [],
                addressCounty: {label:'Bir ilçe seçin', value:{text:'', value:0}},
            });
            datas.data.map(e => {
                this.state.counties.push({label: e.ilce_adi, value:{text:e.ilce_adi, value: e.id}})
            });
            // this.countySelect.togglePicker()
        }catch(e){
            console.log(e)
        }
    }

    _handleCountyDone = async () => {
        this.address._root.focus()
    }

    componentDidMount = async () => {
        try {
            const province = this.props.navigation.getParam('address_province');
            const county = this.props.navigation.getParam('address_county');


            const provinces = this.props.navigation.getParam('provinces');
            provinces.map(e => {
                if (parseInt(e.id) == parseInt(province.value)) {
                    this.setState({
                        addressProvince: {label: e.il_adi, value: {text: e.il_adi, value: e.id}},
                    });
                } else {
                    this.state.provinces.push({label: e.il_adi, value: {text: e.il_adi, value: e.id}})
                }
            });

            const provinceID = province.value;
            const datas = await LocationAPI.get(`/api/location/county/${provinceID}`);
            this.setState({
                counties: [],
            });
            datas.data.map(e => {
                if (parseInt(e.id) == parseInt(county.value)) {
                    this.setState({
                        addressCounty: {label: e.ilce_adi, value: {text: e.ilce_adi, value: e.id}},
                    });
                } else {
                    this.state.counties.push({label: e.ilce_adi, value: {text: e.ilce_adi, value: e.id}})
                }
            });
        }catch(e){
            alert(e)
        }
    }

    _handleSubmit = async(values) => {
        try{
            const id = this.props.navigation.getParam('id')
            const  { title_address,address,desc_address,province,county } = values;
            const userid = await AuthStore.getUserIdFromRepo();
            const postit = await API.put(`/api/user/address`, {id:id, address_title:title_address,address:address,address_direction:desc_address,address_province:province,address_county:county, user_id:userid}, {
                headers:{
                    'x-access-token': AuthStore.getToken
                }
            });
            this.props.navigation.navigate('AddressList', {address: postit.data.data});
        }catch(e){
            console.log(e)
        }
    }

    render() {
    return (
        <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Spinner
                visible={this.state.loading}
                size={'small'}
            />
            <Formik
                initialValues={{
                    title_address: this.props.navigation.getParam('address_title'),
                    address: this.props.navigation.getParam('address'),
                    desc_address: this.props.navigation.getParam('address_direction'),
                    province:'',
                    county:''
                }}
                validationSchema={validationSchema}
                onSubmit={this._handleSubmit}
            >
                {({values, setFieldValue, handleChange, touched, setFieldTouched, errors, handleSubmit, isSubmitting}) => (
                    <View style={styles.inputFormArea}>
                        <View style={styles.inputs}>
                            <Text style={styles.inputInfoArea}>Adres başlığı {(errors.title_address && touched.title_address) ? <Text style={{color:'red'}}>*</Text> : <></>} </Text>
                            <Item
                                style={styles.inputArea}>
                                <Input
                                    style={[styles.input, {zIndex:9}]}
                                    value={values.title_address}
                                    onChangeText={handleChange('title_address')}
                                    returnKeyType={'next'}
                                    onBlur={() => setFieldTouched('title_address')}
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
                            <Text style={styles.inputInfoArea}>İl {(!!errors.province) ? <Text style={{color:'red'}}>*</Text> : <></>}  </Text>
                            <Item
                                style={styles.inputAreaForPicker}>
                                <RNPickerSelect
                                    onValueChange={(value) => {this.setState({selectedProvince:value.value,}); setFieldValue('province', value)}}
                                    style={pickerStyle}
                                    value={values.province}
                                    items={this.state.provinces}
                                    placeholder={this.state.addressProvince}
                                    doneText={'Tamam'}
                                    onDonePress={this._handleProvinceDone}
                                    ref={ref => this.provinceSelect = ref}
                                    placeholderTextColor={'#000'}
                                />
                            </Item>

                        </View>
                        <View style={styles.inputs}>
                            <Text style={styles.inputInfoArea}>İlçe {(!!errors.county) ? <Text style={{color:'red'}}>*</Text> : <></>}</Text>
                            <Item
                                style={styles.inputAreaForPicker}>
                                <RNPickerSelect
                                    onValueChange={(value) => {setFieldValue('county', value)}}
                                    value={values.county}
                                    style={pickerStyle}
                                    items={this.state.counties}
                                    placeholder={this.state.addressCounty}
                                    onDonePress={this._handleCountyDone}
                                    placeholderTextColor={'#000'}
                                    useNativeAndroidPickerStyle={true}
                                    ref={ref => this.countySelect = ref}
                                />
                            </Item>
                        </View>

                        <View style={styles.inputs}>
                            <Text style={styles.inputInfoArea}>Adres {(errors.address && touched.address) ? <Text style={{color:'red'}}>*</Text> : <></>}</Text>
                            <Item
                                style={[styles.inputArea, {height:100}]}>
                                <Input
                                    style={[styles.input, {zIndex:9, height:100}]}
                                    value={values.address}
                                    onChangeText={handleChange('address')}
                                    ref={ref => this.address = ref}
                                    returnKeyType={'next'}
                                    onBlur={() => setFieldTouched('address')}
                                    onSubmitEditing={() => this.desc_address._root.focus()}
                                />

                            </Item>
                        </View>

                        <View style={styles.inputs}>
                            <Text style={styles.inputInfoArea}>Adres Tarifi  {(errors.desc_address && touched.desc_address) ? <Text style={{color:'red'}}>*</Text> : <></>}</Text>
                            <Item
                                style={[styles.inputArea, {height:100}]}>
                                <Input
                                    style={[styles.input, {zIndex:9, height:100}]}
                                    value={values.desc_address}
                                    onChangeText={handleChange('desc_address')}
                                    returnKeyType={'go'}
                                    onBlur={() => setFieldTouched('desc_address')}
                                    ref={ref => this.desc_address = ref}
                                />

                            </Item>

                            <Button
                                onPress={handleSubmit}
                                style={{backgroundColor:'#003DFF', borderRadius:12, marginVertical:25}} full>

                                {isSubmitting && <ActivityIndicator /> }
                                {!isSubmitting && <Text style={{fontFamily:'Muli-ExtraBold', color:'#fff'}}>Kaydet</Text> }

                            </Button>

                        </View>

                    </View>
                )}
            </Formik>
        </View>
    );
  }
}

const pickerStyle = StyleSheet.create({
    inputIOS: {
        minWidth:'100%',
        color:'#000',
        fontFamily:'Muli-Bold'
    },
    inputAndroid: {
        minWidth:'106%',
        color:'#000',
        fontFamily:'Muli-Bold',
        marginTop:-15,
        marginLeft:-10
    },
})

const styles = StyleSheet.create({
    inputAreaForPicker:{
        borderColor:'#fff',
        paddingHorizontal:13,
        paddingTop:11,
        height:40,
        width:'100%',
        backgroundColor:'#fff',
        borderRadius:10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
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
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
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
