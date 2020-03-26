import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback,TouchableOpacity, Keyboard } from 'react-native';
import CustomIcon from '../../font/CustomIcon';

import SwitcherStore from '../../store/SwitcherStore';
import Switcher from './switcher/Switcher';
import Ripple from 'react-native-material-ripple';

export default class BottomTab extends Component {

    componentDidMount() {
      //  console.log(this.props);

    }

    state = {
        isSwitcherClicked:false,
        whichSwitch:0
    }



    render() {
        const { navigation, renderIcon, activeTintColor, inactiveTintColor } = this.props;
        const { routes } = navigation.state;

            return (

                <SafeAreaView style={styles.tab}>

                    <View style={styles.tabArea}>
                        {routes && routes.map((route, index) => {
                            let focused = index === navigation.state.index;
                            let tintColor = focused ? activeTintColor : inactiveTintColor;
                            let tintColorx = focused ? activeTintColor : inactiveTintColor;
                            if(route.key == 'Feed'){
                                return <TouchableWithoutFeedback
                                    key={route.key}
                                    onPress={() => {
                                        this.setState({isSwitcherClicked:false,});
                                        if(!focused){
                                            navigation.navigate(route)
                                        }
                                    }}
                                >
                                    <View  style={styles.bottomPress}>
                                        <CustomIcon   name="home-fill" size={25} style={{color: tintColor}} />
                                    </View>
                                </TouchableWithoutFeedback>
                            }else if(route.key == 'Campaign'){
                                return <TouchableWithoutFeedback
                                    key={route.key}
                                    onPress={() => {
                                        this.setState({isSwitcherClicked:false,});
                                        if(!focused){
                                            navigation.navigate(route)
                                        }
                                    }}
                                >
                                    <View style={styles.bottomPress}>
                                        <CustomIcon  name="star-fill" size={25} style={{color: tintColor}} />
                                    </View>
                                </TouchableWithoutFeedback>
                            }else if(route.key == 'ShopingCard'){
                                return <TouchableWithoutFeedback
                                    key={route.key}
                                    onPress={() => {
                                        this.setState({isSwitcherClicked:false,});
                                        if(!focused){
                                            navigation.navigate(route)
                                        }
                                    }}
                                >
                                    <View style={styles.bottomPress}>
                                        <CustomIcon  name="shopping-cart-fill" size={25} style={{color: tintColor}} />
                                    </View>
                                </TouchableWithoutFeedback>
                            }else if(route.key == 'Profile'){
                                return <TouchableWithoutFeedback

                                    key={route.key}
                                    onPress={() => {
                                        this.setState({isSwitcherClicked:false,});
                                        if(!focused){
                                            navigation.navigate(route)
                                        }
                                    }}
                                >
                                    <View style={styles.bottomPress}>
                                        <CustomIcon style={{height:55, width:100}}  name="person-fill" size={25} style={{color: tintColor}} />
                                    </View>
                                </TouchableWithoutFeedback>
                            }else{
                                return <TouchableWithoutFeedback
                                    key={route.key}
                                    onPress={() => {
                                        this.setState({isSwitcherClicked:!this.state.isSwitcherClicked,});
                                        this.props.jumpTo(this.props.navigation.state.routeKeyHistory[this.props.navigation.state.routeKeyHistory.length-1])}
                                    }
                                >
                                    <View style={styles.bottomPress}>
                                        <CustomIcon   name="us" size={38} style={{color: this.state.isSwitcherClicked ? activeTintColor : inactiveTintColor}} />
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                        })}

                    </View>


                    {this.state.isSwitcherClicked
                    &&
                    <View style={styles.topContainer}>
                        <View style={styles.container}>
                            {
                                this.state.whichSwitch == 0
                                    ?
                                    <View style={{height:30, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                        <View style={styles.box}>
                                            <Text style={styles.activeText}>mavideniste</Text>
                                        </View>
                                            <TouchableOpacity style={styles.box}  onPressIn={() => alert('e')}>
                                                <View style={{}}>

                                                <Text style={styles.text}>mavikurye</Text>
                                                </View>

                                            </TouchableOpacity>
                                    </View>
                                    :
                                    <>
                                        <TouchableOpacity style={styles.box} onPress={() => alert('b')}>
                                            <Text style={styles.text}>mavideniste</Text>
                                        </TouchableOpacity>
                                        <View style={styles.box}>
                                            <Text style={styles.activeText}>mavikurye</Text>
                                        </View>
                                    </>
                            }
                        </View>
                    </View>
                    }
                </SafeAreaView>
            );
    }
}

const styles = StyleSheet.create({
    text:{
        color:'#BCBCBC',
        fontFamily:'Muli-ExtraBold',
        fontSize:15,
        height:20
    },
    box:{
        width:117,
        height:31,
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:20,
        marginHorizontal:5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 4,
    },
    activeText:{
        color:'#003DFF',
        fontFamily:'Muli-ExtraBold',
        fontSize:15,
    },
    container2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'transparent'
    },
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    topContainer:{
        bottom:65,

        zIndex:1,

        backgroundColor:'#000',

        position:'absolute',
        right:'50%',
        left:'50%'
    },




    bottomPress:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        height:55,
    },
    tabArea:{
        width:'100%',

        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        height:55,

        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor: 'white',
        elevation:5,
    },
    tab:{
        shadowColor: '#000',
        shadowOpacity:0.15,
        shadowRadius: 9,
        shadowOffset: {
            height: 0,
        },
        elevation:5,
        backgroundColor: 'white',


        position:'relative',

        borderTopColor: 'transparent',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }
});
