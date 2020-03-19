import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CustomIcon from '../../font/CustomIcon';

import SwitcherStore from '../../store/SwitcherStore';

export default class BottomTab extends Component {

    componentDidMount() {
        console.log(this.props);

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
                                        SwitcherStore.setSwitcherClicked(false);
                                        SwitcherStore.setTabIndex(0);

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
                                        SwitcherStore.setSwitcherClicked(false);
                                        SwitcherStore.setTabIndex(1);

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

                                        SwitcherStore.setSwitcherClicked(false);
                                        SwitcherStore.setTabIndex(3);

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
                                        SwitcherStore.setSwitcherClicked(false);
                                        SwitcherStore.setTabIndex(4);

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
                                        SwitcherStore.getSwitcherClicked ? SwitcherStore.setSwitcherClicked(false) : SwitcherStore.setSwitcherClicked(true);
                                        this.props.jumpTo(this.props.navigation.state.routeKeyHistory[this.props.navigation.state.routeKeyHistory.length-1])}}
                                >
                                    <View style={styles.bottomPress}>
                                        <CustomIcon   name="us" size={38} style={{color: SwitcherStore.getSwitcherClicked ? activeTintColor : inactiveTintColor}} />
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                        })}

                    </View>
                </SafeAreaView>
            );
    }
}

const styles = StyleSheet.create({
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



        borderTopColor: 'transparent',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }
});
