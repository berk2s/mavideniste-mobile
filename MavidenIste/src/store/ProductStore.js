import {observable, action, runInAction, computed, configure} from 'mobx';

import BasketStore from './BasketStore';

import API from '../api'

configure({
    enforceActions: 'observed'
});

class ProductStore {

    @observable products = [];

    @action fetchProducts = async (category_id, branch_id) => {
        try{
            const products = await API.get(`/api/product/get/${branch_id}/${category_id}`);

            products.data.data.map(async e => {
               // e.isInTheBasket = false;
                const productsFromStorage = await BasketStore.validateIfProductInBasket(e._id);
                if(productsFromStorage != -1){
                    e.isInTheBasket = true;
                }else{
                    e.isInTheBasket = false;
                }
            });

            setTimeout(() => {
                this.products = [...products.data.data];
            }, 300)
        }catch(e){
            alert(e);
        }
    }

    @computed get getProducts() {
        return this.products;
    }

}

export default new ProductStore();
