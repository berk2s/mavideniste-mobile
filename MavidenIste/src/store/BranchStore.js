import {observable, configure, action, runInAction, computed} from 'mobx';

import AsyncStorage from '@react-native-community/async-storage';

configure({
    enforceActions:'observed'
});

import LocationAPI from '../locationapi';

class BranchStore{

    @observable branch_id = null;
    @observable branch_name = null;
    @observable branch_province = null;
    @observable branch_county = null;
    @observable branch_committee = null;
    @observable branch_list = []

    @action fetchBranchList = async () => {
        try{
            const branchies = await LocationAPI.get(`/api/branch`);
            runInAction(() => {
                this.branch_list = [...branchies.data]
            });

        }catch(e){
            console.log(e);
        }
    }

    @action checkBranchExists = async () => {
        try{
            const branchID = await AsyncStorage.getItem('branch');
            if(branchID != null){
                const branchDetails = await LocationAPI.get(`/api/branch/${branchID}`);

                if(branchDetails.data.status == 'OK'){
                    await this.changeBranch(
                        branchID,
                        branchDetails.data.branch.branch_name,
                        branchDetails.data.branch.branch_province,
                        branchDetails.data.branch.branch_county,
                        branchDetails.data.branch.branch_committee,
                    );

                }else {
                    const branchDetailsAgain = await LocationAPI.get(`/api/branch/54`);

                    await this.changeBranch(
                        54,
                        branchDetailsAgain.data.branch.branch_name,
                        branchDetailsAgain.data.branch.branch_province,
                        branchDetailsAgain.data.branch.branch_county,
                        branchDetailsAgain.data.branch.branch_committee,
                    );
                }

            }else{
                const branchDetailsAgain = await LocationAPI.get(`/api/branch/54`);

                await this.changeBranch(
                    54,
                    branchDetailsAgain.data.branch.branch_name,
                    branchDetailsAgain.data.branch.branch_province,
                    branchDetailsAgain.data.branch.branch_county,
                    branchDetailsAgain.data.branch.branch_committee,
                );
            }
        }catch(e){
            console.log(e);
        }
    }

    @action changeBranch = async (branch_id, branch_name, branch_province, branch_county, branch_committee) => {
        try{
            await AsyncStorage.setItem('branch', JSON.stringify(branch_id));
            runInAction(() => {
                this.branch_id = parseInt(branch_id);
                this.branch_name = branch_name;
                this.branch_province = branch_province;
                this.branch_county = branch_county;
                this.branch_committee = branch_committee;
            });
        }catch(e){
            console.log(e);
        }
    }

    @computed get branchID(){
        return this.branch_id;
    }

    @computed get branchName(){
        return this.branch_name;
    }

    @computed get branchCommittee(){
        return this.branch_committee;
    }

    @computed get branchList(){
        return this.branch_list;
    }

}

export default new BranchStore();
