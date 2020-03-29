import {observable, configure, action, runInAction, computed} from 'mobx';
import * as Keychain from 'react-native-keychain';

import NavigationService from '../NavigationService';
import API from '../api';
import axios from 'axios';
import {API_KEY, API_URL} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

import AddressStore from './AddressStore';
import BasketStore from './BasketStore';

import BranchStore from './BranchStore';

configure({
    enforceActions:'observed'
});

class AuthStore {
    @observable token = null;
    @observable push_token = null;
    @observable user_id = null;
    @observable name_surname = null;
    @observable phone_number = null;

    @action saveToken = async (user_id, token, name_surname) => {
        try{
          //  await this.deleteUser()
            await Keychain.setGenericPassword(user_id, token);
            runInAction(() => {
                this.token = token;
                this.user_id = user_id;
                this.name_surname = name_surname;
            });

            const notification_token = await AsyncStorage.getItem('token');

            await API.put('/api/user/token', {
                token:notification_token,
                user_id: this.user_id
            }, {
                headers:{
                    'x-access-token': this.token
                }
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

            await BranchStore.checkBranchExists();

            if(getToken != null && getUserId != null){

                const user_information = await API.get(`/api/user/detail/${getUserId}`, {
                    headers:{
                        'x-access-token': getToken
                    }
                });

                console.log(user_information.data)
                console.log(Object.keys(user_information.data).length)

                if(user_information.data.data !== null) {

                    runInAction(() => {
                        this.token = getToken;
                        this.user_id = getUserId;
                        this.name_surname = user_information.data.data.name_surname;
                        this.phone_number = user_information.data.data.phone_number;
                    });

                }else{
                    await this.deleteUser()
                }

                // checkpoint

                const data = await API.get(`/api/user/address/${getUserId}`, {
                    headers:{
                        'x-access-token': getToken
                    }
                })

                await AddressStore.setAddress(data.data.data);
                await BasketStore.updateSelectedAddress();

                await API.put('/api/user/branch', {user_id: this.user_id, branch: BranchStore.branchID}, {
                    headers:{
                        'x-access-token': getToken
                    }
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
            alert('asdd'+e);
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
            await API.put('/api/user/token', {
                token:null,
                user_id: this.user_id
            },{
                headers:{
                    'x-access-token': this.token
                }
            });
            await Keychain.resetGenericPassword();
            await AddressStore.clearAddress();
            await BasketStore.clearSelectedAddress();
            runInAction(() => {
               this.token = null;
               this.user_id = null;
               this.name_surname = null;
               this.phone_number = null;
            });
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

    @computed get getPhoneNumber(){
        return this.phone_number;
    }

    @computed get getToken(){
        return this.token;
    }

    @computed get getUserID(){
        return this.user_id;
    }

}

export default new AuthStore();
