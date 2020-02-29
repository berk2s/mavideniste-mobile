import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CustomIcon from './font/CustomIcon';


//screens

// for the mainstack screens
import LoginScreen from './screens/account/login/Login';
import RegisterScreen from './screens/account/register/Register';
import PhoneVerifactionScreen from './screens/account/phoneverifaction/PhoneVerifaction';
import OnboardingScreen from './screens/account/onboarding/Onboarding';
import ForgotPassStep1Screen from './screens/account/forgotpass/step1/Step1';
import ForgotPassStep2Screen from './screens/account/forgotpass/step2/Step2';

//for the bottomtabnavigator screens

import FeedScreen from './screens/bottomtab/feed/Feed';
import CampaignScreen from './screens/bottomtab/campaign/Campaign';
import SwitcherScreen from './screens/bottomtab/switcher/Switcher';
import ShopingCardScreen from './screens/bottomtab/shopingcart/ShopingCard';
import ProfileScreen from './screens/bottomtab/profile/Profile';
import ProfileUnauthticatedScreen from './screens/bottomtab/profile/Unauthenticated';
import BottomTab from './screens/bottomtab/BottomTab';
import Currier from './screens/bottomtab/currier/Currier';


// for the product listing
import ProductListScreen from './screens/product/Product';

let tintColorIndex = 0;

import SwitcherStore from './store/SwitcherStore';

const MainStack = createStackNavigator({
    Login:{
        screen:LoginScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    Register:{
        screen:RegisterScreen,
        navigationOptions:{
            headerShown: false
        }
    },
    PhoneVerifaction:{
        screen:PhoneVerifactionScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    Onboarding:{
        screen:OnboardingScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    ForgotPassStep1:{
        screen:ForgotPassStep1Screen,
        navigationOptions:{
            headerShown:false
        }
    },
    ForgotPassStep2:{
        screen:ForgotPassStep2Screen,
        navigationOptions:{
            headerShown:false
        }
    }
},
    {
        initialRouteName:'Login'
    });

const bottomTabs = createBottomTabNavigator({
   Feed:{
       screen:createStackNavigator({
           Category:{
             screen:FeedScreen,
           },
           Product:{
               screen:ProductListScreen,
           },
           Currier:{
               screen:Currier,
               navigationOptions:{
                   gestureEnabled: false,
               }
           }
       }, {
           headerMode:null,
       }),
       navigationOptions:{
           tabBarOnPress: ((obj) => {SwitcherStore.setTabIndex(0); obj.navigation.navigate('Feed')}),
           tabBarLabel: () => (null),
           tabBarIcon: ({focused}) => <CustomIcon name="home-fill" size={25} style={{color: focused ? '#003DFF' : '#304555'}} />
       }
   },
    Campaign:{
       screen:CampaignScreen,
        navigationOptions:{
            tabBarOnPress: ((obj) => {SwitcherStore.setTabIndex(1); obj.navigation.navigate('Campaign')}),
            tabBarLabel: () => (null),
            tabBarIcon: ({focused}) => <CustomIcon name="star-fill" size={25} style={{color: focused ? '#003DFF' : '#304555'}} />
        }
    },
    Switcher:{
        screen:Currier,
        navigationOptions:{
            tabBarOnPress: ((obj) => {obj.navigation.navigate('Switcher')}),
            tabBarLabel: () => (null),
            tabBarIcon: ({focused}) => <CustomIcon name="us" size={38} style={{color: focused ? '#003DFF' : '#304555'}} />
        }
    },
    ShopingCard:{
       screen:ShopingCardScreen,
        navigationOptions:{
            tabBarOnPress: ((obj) => {SwitcherStore.setTabIndex(3); obj.navigation.navigate('ShopingCard')}),
            tabBarLabel: () => (null),
            tabBarIcon: ({focused}) => <CustomIcon name="shopping-cart-fill" size={25} style={{color: focused ? '#003DFF' : '#304555'}} />
        }
    },
    Profile:{
       screen:ProfileUnauthticatedScreen,
        navigationOptions:{
            tabBarOnPress: ((obj) => {SwitcherStore.setTabIndex(4); obj.navigation.navigate('Profile')}),
            tabBarLabel: () => (null),
            tabBarIcon: ({focused}) => <CustomIcon name="person-fill" size={25} style={{color: focused ? '#003DFF' : '#304555'}} />
        }
    },
},{
    lazyLoad: false,
    backBehavior: 'history',
    tabBarComponent:BottomTab,
    tabBarOptions: {
        activeTintColor: '#003DFF',
        inactiveTintColor: '#304555',
        style: {
            shadowColor: '#000',
            shadowOpacity:0.15,
            shadowRadius: 9,
            shadowOffset: {
                height: 0,
            },
            elevation:8,
            backgroundColor: 'white',
            height: 55,
            borderTopColor: 'transparent',
            borderTopLeftRadius:25,
            borderTopRightRadius:25
        }
    },

});

const pages = createStackNavigator({
    bottomTabs:bottomTabs,
    MainStack:MainStack,
}, {
    headerMode:null,
});

export default createAppContainer(pages);
