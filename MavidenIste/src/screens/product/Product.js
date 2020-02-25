import React, { Component } from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { Container, Header, Button, Content, } from "native-base";
import API from '../../api';
import {BRANCH_ID, IMAGE_URL} from '../../constants';
import FastImage from 'react-native-fast-image';
import Loading from '../components/Loading';


export default class ProductList extends Component {

    state = {
        loadingHeight: Dimensions.get('window').height-160,
        datas: [],
        fetched: false
    }

    componentDidMount = async () => {
        try{
            const category_id = this.props.navigation.getParam('category_id');
            const products = await API.get(`/api/product/get/${BRANCH_ID}/${category_id}`);
            console.log(products)
            this.state.datas = [...products.data.data];
            setTimeout(() => {
                this.setState({
                    fetched: true,
                });
            }, 1000)
        }catch(e){
            console.log(e);
        }
    }

    render() {
    return (
        <Container style={styles.container}>
            <HeaderWithSearch
                subView={true}
                navigation={this.props.navigation}
            />
            <Content
                style={{display:'flex', flex:1}}
                padder>
                <View style={styles.content}>
                    {this.state.fetched
                        ?
                        <View style={styles.cardArea}>
                            {
                                this.state.datas.map(e => {
                                    const uri = IMAGE_URL+e.product_image;
                                    return <TouchableOpacity key={e._id} onPress={() => this.props.navigation.navigate('ProductDetail', {category_id: e._id})}>
                                        <View style={styles.card} >
                                            <View style={styles.cardWhiteArea}>
                                                <FastImage
                                                    source={{uri: uri}}
                                                    style={styles.cardImage}
                                                />
                                            </View>
                                            <View style={styles.cardTextArea}>
                                                <Text style={styles.cardText}>{e.product_name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                })
                            }

                        </View>
                        :
                        <View style={[styles.loadingView, {height: this.state.loadingHeight}]}>
                            <Loading />
                        </View>
                    }
                </View>
            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    loadingView:{
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    content:{
        display:'flex',
        flex:1,
    },
    container:{
        backgroundColor:'#F6F6F6',
        flex:1,
        display:'flex'
    },
    cardArea:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        paddingTop: 25
    },
    card:{
        width:110,
        marginBottom:25
    },
    cardWhiteArea:{
        backgroundColor: '#fff',
        borderRadius:20,
        width:110,
        height:92,
        display:'flex',
        justifyContent:'center',
        alignItems: 'center'
    },
    cardImage:{
        width:100,
        height:84,
        borderRadius: 20
    },
    cardTextArea:{
        width:110,
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        paddingVertical:5,
    },
    cardText:{
        fontFamily:'Muli-ExtraBold',
        color:'#304555',
        fontSize:11
    },
});
