import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
  Button,
  ScrollView,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Body, Container, Content, Header, Left, Title} from 'native-base';
import SwitcherStore from '../../../store/SwitcherStore';
import Switcher from '../switcher/Switcher';

import { observer } from 'mobx-react';
import CustomIcon from '../../../font/CustomIcon';
import Spinner from 'react-native-loading-spinner-overlay';
import LoginIMG from '../../../img/login.png';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import API from '../../../api';
import {IMAGE_URL} from '../../../constants';

import RBSheet from "react-native-raw-bottom-sheet";

import Image_ from '../../../img/up-arrow.png'

@observer
export default class Campaign extends Component {

  state ={
    loading:false,
    campaigns:[],
    fetched:false
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

  componentDidMount = async () => {
    try {
      this.setState({
        loading: true,
      });

      const campaigns = await API.get('/api/campaign');

      this.state.campaigns = [...campaigns.data.data];

      this.setState({
        loading: false,
        fetched:true
      });

    }catch(e){
      console.log(e);
    }

  }


  render() {
    return (
        <Container style={[styles.container, {backgroundColor:'#F6F6F6', height:'100%', flex:1, paddingTop:0, marginTop:0}]}>
          <SafeAreaView transparent style={[styles.header]}>
            <Left style={styles.leftArea}>

              <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                <CustomIcon name="arrow-left" size={28} style={{color:'#003DFF', marginTop:2}} />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Title style={styles.bodyTitleText}>Kampanyalar</Title>
            </Body>
            <Body>
            </Body>

          </SafeAreaView>

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

            {
              this.state.fetched &&
                this.state.campaigns.map(e => {
                  const uri = IMAGE_URL+e.campaign_image;
                  return <View style={styles.campaignArea} key={e._id} onPress={() => {
                              if(e.campaign_type == 1){
                                this[RBSheet + e._id].open()
                              }
                            }}>

                    {e.campaign_type == 1
                        ?
                            <RBSheet
                                ref={ref => {
                                  this[RBSheet + e._id] = ref;
                                }}
                                closeOnPressMask={true}
                                closeOnPressBack={true}
                                customStyles={{
                                  draggableIcon: {
                                    backgroundColor: "#304555"
                                  },
                                  container:{
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                  }
                                }}
                                height={(Dimensions.get('window').height*65)/100}
                            >

                                <View style={{paddingHorizontal:15, paddingVertical:15}}>
                                  <Text style={{fontFamily:'Muli-ExtraBold', color:'#304555', fontSize:18, paddingBottom:10}}>Kampanya detayları</Text>
                                  <ScrollView contentContainerStyle={{minHeight:(Dimensions.get('window').height*60)/100}}><Text style={{fontFamily:'Muli-Regular', marginBottom:10, color:'#304555'}}>{e.campaign_desc}</Text></ScrollView>
                                </View>

                            </RBSheet>
                        :
                            <></>
                    }

                    <View style={styles.campaignCard}>
                      <View style={styles.shadowImage}>
                        <Image
                            source={{uri: uri}}
                            style={styles.campaignImage}
                        />
                        {e.campaign_type == 1 &&
                          <TouchableOpacity
                              onPress={() => {
                                this[RBSheet + e._id].open()
                              }}
                              style={{shadowColor: "#304555", shadowOffset: {width: 0, height: 0, }, shadowOpacity: 0.25, shadowRadius: 2, elevation: 1, position:'absolute', bottom:5, right:5, width:36, height:36, borderRadius:50, backgroundColor:'#fff', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Image source={Image_} style={{width:18, height:18}} />
                          </TouchableOpacity>
                        }
                      </View>
                      <View style={styles.campaingTextArea}>
                        <Text style={styles.campaignText}>{e.campaign_short_desc}</Text>
                      </View>
                    </View>
                  </View>
                })
            }


          </Content>

        </Container>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    height:Platform.OS == 'ios' ? 70 : 50,
    paddingLeft:10,
    paddingRight:10,
  },
  container:{
    paddingVertical: 0,
    marginVertical:0
  },
  campaignText:{
    fontFamily: 'Muli-SemiBold',
    color:'#304555',
    fontSize:14
  },
  campaingTextArea:{
    paddingHorizontal:15,
    paddingVertical:10
  },
  shadowImage:{
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 5,
  },
  campaignImage:{
    width:'100%',
    height:172,
    borderRadius: 15,

  },
  campaignCard:{
    width:'100%',
    minHeight:225,
    borderRadius:15,
    backgroundColor:'#fff',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:40
  },
  campaignArea:{
    display:'flex',
    justifyContent:'center',
    alignItems: 'center'
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
    maxWidth:'82%'
  }
});
