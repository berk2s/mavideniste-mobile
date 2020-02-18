import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//screens

import LoginScreen from './screens/account/login/Login';
import RegisterScreen from './screens/account/register/Register';
import PhoneVerifactionScreen from './screens/account/phoneverifaction/PhoneVerifaction';
import OnboardingScreen from './screens/account/onboarding/Onboarding';
import ForgotPassStep1Screen from './screens/account/forgotpass/step1/Step1';
import ForgotPassStep2Screen from './screens/account/forgotpass/step2/Step2';


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

export default createAppContainer(MainStack);
