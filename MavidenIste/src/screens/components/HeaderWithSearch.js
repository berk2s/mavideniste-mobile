import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import {Header, Input, Item, Left, Right} from 'native-base';

import InputBg from '../../img/inputbg.png';
import MavidenIsteText from '../../img/mavidenistetext.png';
import CustomIcon from '../../font/CustomIcon';

export default class HeaderWithSearch extends Component {

  state = {
    isSearchClick: false,
    inputAreaWidth: new Animated.Value(1),
    close: new Animated.Value(0)
  }

  _handleSearchClick = () => {
    this.setState({
        isSearchClick: true,
    });

    Animated
        .spring(this.state.inputAreaWidth,{
          toValue:2,
          duration:300
        })
        .start();

    Animated
        .spring(this.state.close, {
          toValue:1,
          duration:300
        }).start()

  }

  _handleSearchBlur = () => {
    this.setState({
      isSearchClick: false,
    });

    Animated
        .timing(this.state.inputAreaWidth,{
          toValue:1,
          duration:300
        })
        .start();

    Animated
        .spring(this.state.close, {
          toValue:0,
          duration:300
        }).start()

  }

  render() {

    const inputWitdhInterpolate = this.state.inputAreaWidth.interpolate({
        inputRange: [1, 2],
        outputRange: [190, Dimensions.get('window').width-20]
    });

    const inputStype = {
      width: inputWitdhInterpolate,
      marginRight:20
    }

    const animatedClose = {
      opacity: this.state.close
    }


    return (
        <Header
            transparent
            style={styles.header}
        >

               <View style={styles.searchArea}>

                 <Animated.View
                    style={[styles.inputBg, inputStype]}

                 >

                   <Item
                       style={styles.inputArea}>

                     <View>
                       <Text style={styles.accIcon}>
                         <CustomIcon
                             name="Path-222"
                             size={16}
                             style={{color: '#616D7B'}}
                         />
                       </Text>
                     </View>

                     <Input
                         style={[styles.input, {zIndex:9}]}
                         placeholder="Arayın"
                         placeholderTextColor={'#CCC7C7'}
                         onChange={this._handleSearchClick}
                         onBlur={this._handleSearchBlur}
                         onFocus={this._handleSearchClick}
                     />

                     <Animated.View
                      style={[animatedClose]}
                     >

                             <TouchableOpacity style={{marginRight:5}}>
                               <Text style={styles.accIcon}>

                                 <CustomIcon
                                     name="close"
                                     size={24}
                                     style={{color: '#616D7B'}}
                                 />

                               </Text>
                             </TouchableOpacity>

                       </Animated.View>

                   </Item>
                 </Animated.View>

               </View>


                  <View style={styles.logoArea}>
                    <Image
                        source={MavidenIsteText}
                        style={styles.logo}
                    />
                  </View>

        </Header>
    );
  }
}

const styles = StyleSheet.create({
  inputBg:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:5
  },
  accIcon:{
    marginLeft: 10,
    marginRight: 5,
    marginTop:1
  },
  inputArea:{
    borderColor:'#fff',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:30,
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 7,

    elevation: 5,
  },
  input:{
    fontFamily:'Muli-SemiBold',
    fontSize:14,
  },
  header:{
    display:'flex',
    justifyContent:'space-between',
  },
  logoArea:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  searchArea:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  headerArea:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    marginTop:3
  }
});
