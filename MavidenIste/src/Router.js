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

// for the product listing
import ProductListScreen from './screens/product/Product';

const a = true;

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
        initialRouteName:'ForgotPassStep2'
    });

const bottomTabs = createBottomTabNavigator({
   Feed:{
       screen:createStackNavigator({
           Category:{
             screen:FeedScreen,
           },
           Product:{
               screen:ProductListScreen,
           }
       }, {
           headerMode:null
       }),
       navigationOptions:{
           tabBarLabel: () => (null),
           tabBarIcon: ({tintColor}) => <CustomIcon name="home-fill" size={25} style={{color: tintColor}} />
       }
   },
    Campaign:{
       screen:CampaignScreen,
        navigationOptions:{
            tabBarLabel: () => (null),
            tabBarIcon: ({tintColor}) => <CustomIcon name="star-fill" size={25} style={{color: tintColor}} />
        }
    },
    Switcher:{
       screen:SwitcherScreen,
        navigationOptions:{
            tabBarLabel: () => (null),
            tabBarIcon: ({tintColor}) => <CustomIcon name="us" size={38} style={{color: tintColor}} />
        }
    },
    ShopingCard:{
       screen:ShopingCardScreen,
        navigationOptions:{
            tabBarLabel: () => (null),
            tabBarIcon: ({tintColor}) => <CustomIcon name="shopping-cart-fill" size={25} style={{color: tintColor}} />
        }
    },
    Profile:{
       screen:a ? FeedScreen : ProfileScreen,
        navigationOptions:{
            tabBarLabel: () => (null),
            tabBarIcon: ({tintColor}) => <CustomIcon name="person-fill" size={25} style={{color: tintColor}} />
        }
    },
},{
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
    headerMode:null
});

export default createAppContainer(pages);
