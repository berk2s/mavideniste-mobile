import {observable, configure, action, runInAction, computed} from 'mobx';
import * as Keychain from 'react-native-keychain';

import NavigationService from '../NavigationService';

configure({
    enforceActions:'observed'
})

class AuthStore {
    @observable token = null;
    @observable user_id = null;

    @action saveToken = async (user_id, token) => {
        try{
            await Keychain.setGenericPassword(user_id, token);
            runInAction(() => {
                this.token = token;
                this.user_id = user_id;
            });
            await this.authSync();
        }catch(e){
            alert(e);
        }
    }

    @action authSync = async () => {
        try{
            const getToken = await this.getTokenFromRepo();
            const getUserId = await this.getUserIdFromRepo();
            if(getToken != null && getUserId != null){
                runInAction(() => {
                    this.token = getToken;
                    this.user_id = getUserId;
                });
                NavigationService.navigate('authticatedBottomScreens');
            }else{
                runInAction(() => {
                    this.token = null;
                    this.user_id = null
                })
                NavigationService.navigate('unAuthticatedBottomScreens');
            }
        }catch(e){
            alert('asd'+e);
        }
    }

    @action getTokenFromRepo = async () => {
        try{
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                return credentials.password;
            } else {
                return null;
            }
        }catch(e){
            alert(e);
        }
    }

    @action getUserIdFromRepo = async () => {
        try{
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                return credentials.username;
            } else {
                return null;
            }
        }catch(e){
            alert(e);
        }
    }

    @action deleteUser = async () => {
        try{
            await Keychain.resetGenericPassword();
            runInAction(() => {
                this.token = null;
                this.user_id = null;
            })
            await this.authSync();
        }catch(e){
            alert(e);
        }
    }

    @computed get getToken(){
        return this.token;
    }

    @computed get getUserID(){
        return this.user_id;
    }
}

export default new AuthStore();
