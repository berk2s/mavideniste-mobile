import {observable, configure, action, runInAction, computed} from 'mobx';
import * as Keychain from 'react-native-keychain';

import NavigationService from '../NavigationService';
import API from '../api';
import axios from 'axios';
import {API_KEY, API_URL} from '../constants';

configure({
    enforceActions:'observed'
})

class AuthStore {
    @observable token = null;
    @observable user_id = null;
    @observable name_surname = null;

    @action saveToken = async (user_id, token, name_surname) => {
        try{
            await Keychain.setGenericPassword(user_id, token);
            runInAction(() => {
                this.token = token;
                this.user_id = user_id;
                this.name_surname = name_surname;
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

            console.log('===============')
            console.log(getToken)
            console.log(getUserId)
            console.log(getUserId)
            console.log('===============')

            if(getToken != null && getUserId != null){

                const user_information = await API.get(`/api/user/detail/${getUserId}`, {
                    headers:{
                        'x-access-token': getToken
                    }
                });

                runInAction(() => {
                    this.token = getToken;
                    this.user_id = getUserId;
                    this.name_surname = user_information.data.data.name_surname;
                });



                NavigationService.navigate('authticatedBottomScreens');
            }else{
                runInAction(() => {
                    this.token = null;
                    this.user_id = null;
                    this.name_surname = null;
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
                runInAction(() => {
                    this.token = credentials.password;
                });
                return credentials.password;
            } else {
                runInAction(() => {
                    this.token = null;
                });
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
                runInAction(() => {
                    this.user_id = credentials.username;
                });
                return credentials.username;
            } else {
                runInAction(() => {
                    this.user_id = null;
                });
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
                this.name_surname = null;
            })
            await this.authSync();
        }catch(e){
            alert(e);
        }
    }

    @action async setNameSurname(name_surname){
        this.name_surname = name_surname;
    }

    @computed get getNameSurname(){
        return this.name_surname;
    }

    @computed get getToken(){
        return this.token;
    }

    @computed get getUserID(){
        return this.user_id;
    }

}

export default new AuthStore();
