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
            const productCheckPromise = new Promise((resolve, reject) => {
                this.products = [...products.data.data];
                this.products.map(async e => {
                   // const productsFromStorage = await BasketStore.validateIfProductInBasket(e._id);
                  //  if(productsFromStorage != -1){
                  //      e.isInTheBasket = true;
                  //      resolve(true);
                  //  }else{
                  //      e.isInTheBasket = false;
                  //      resolve(true);
                  //  }

                    resolve(true)
                })
            })
            await productCheckPromise;
        }catch(e){
            alert(e);
        }
    }

    @computed get getProducts() {
        return this.products;
    }

    @action outOfTheBasket = async (product_id) => {
     //   const index = this.products.map(e => e._id).indexOf(product_id);
     //   this.products[index].isInTheBasket = false;
    }

    @action addTheBasket = async (product_id) => {
        const index = this.products.map(e => e._id).indexOf(product_id);
        this.products[index].isInTheBasket = true;
    }

    @action outOfTheAllProducts = async () => {
        this.products.map(e => {
           e.isInTheBasket = false;
        });
    }
}

export default new ProductStore();
