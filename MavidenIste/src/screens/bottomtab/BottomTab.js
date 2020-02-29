import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
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
                        return <CustomIcon key={route.key} onPress={() => {SwitcherStore.setSwitcherClicked(false); SwitcherStore.setTabIndex(0); navigation.navigate(route)}} name="home-fill" size={25} style={{color: tintColor}} />
                    }else if(route.key == 'Campaign'){
                        return <CustomIcon key={route.key}  onPress={() => {SwitcherStore.setSwitcherClicked(false); SwitcherStore.setTabIndex(1); navigation.navigate(route)}} name="star-fill" size={25} style={{color: tintColor}} />
                    }else if(route.key == 'ShopingCard'){
                        return <CustomIcon key={route.key} onPress={() => {focused ? false : true; SwitcherStore.setSwitcherClicked(false); SwitcherStore.setTabIndex(3); navigation.navigate(route)}} name="shopping-cart-fill" size={25} style={{color: tintColor}} />
                    }else if(route.key == 'Profile'){
                        return <CustomIcon key={route.key} onPress={() => {SwitcherStore.setSwitcherClicked(false); SwitcherStore.setTabIndex(4); navigation.navigate(route)}} name="person-fill" size={25} style={{color: tintColor}} />
                    }else{
                        return <CustomIcon key={route.key} onPress={() => {SwitcherStore.getSwitcherClicked ? SwitcherStore.setSwitcherClicked(false) : SwitcherStore.setSwitcherClicked(true); this.props.jumpTo(this.props.navigation.state.routeKeyHistory[this.props.navigation.state.routeKeyHistory.length-1])}} name="us" size={38} style={{color: SwitcherStore.getSwitcherClicked ? activeTintColor : inactiveTintColor}} />
                    }
                })}

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    tabArea:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height: 55,
        width:'100%'
    },
    tab:{
        shadowColor: '#000',
        shadowOpacity:0.15,
        shadowRadius: 9,
        shadowOffset: {
            height: 0,
        },
        elevation:8,
        backgroundColor: 'white',

        borderTopColor: 'transparent',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    }
});
