import {observable, configure, action, runInAction, computed} from 'mobx';

import LocationAPI from '../locationapi'


configure({
    enforceActions:'observed'
});

class VersionStore {

    @observable version = 1.0

    @observable hasUpdate = false;
    @observable isUpdateRequired = false;

    @observable playStoreLink = null;
    @observable appStoreLink = null;

    @action checkVersion = async () => {
        try{
            const appsettings = await LocationAPI.get(`/api/appsettings`);


            if(appsettings.data[0].has_update){
                runInAction(() => {
                    this.hasUpdate = true;
                    this.isUpdateRequired = appsettings.data[0].is_update_required;
                    this.playStoreLink = appsettings.data[0].playstore_link;
                    this.appStoreLink = appsettings.data[0].appstore_link;
                })
            }

        }catch(e){
            console.log(e)
        }
    }

    @computed get getPlayStoreLink(){
        return this.playStoreLink
    }

    @computed get getAppStoreLink(){
        return this.appStoreLink
    }

    @computed get getHasUpdate(){
        return this.hasUpdate
    }

    @computed get getIsRequired(){
        return this.isUpdateRequired;
    }

}

export default new VersionStore();
