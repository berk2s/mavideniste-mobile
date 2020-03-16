import {observable, configure, action, runInAction, computed} from 'mobx';

configure({
    enforceActions:'observed'
})

class AddressStore{

    @observable address = [];

    @action setAddress = async (address) => {
        runInAction(() => {
            this.address = address;
        })
    }

    @action clearAddress = async () => {
        runInAction(() => {
            this.address = []
        })
    }

    @computed get getAddress(){
        return this.address;
    }

}

export default new AddressStore();
