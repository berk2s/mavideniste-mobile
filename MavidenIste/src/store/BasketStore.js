import {observable, action, runInAction, computed, configure} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../api'

configure({
    enforceActions: 'observed'
})

class BasketStore {
    @observable products = [];
    @observable clearProducts = [];
    @observable totalPrice = 0;


    @action getBasketProducts = async () => {
        try{
            const products = await AsyncStorage.getItem('products');
            if(products !== null) {
                runInAction(() => {
                    this.products = JSON.parse(products);
                });
            }
            this.fetchProducts();
            return this.products;
        }catch(e){
            alert(e);
        }
    }

    @action fetchProducts = () => {
        if(this.products.length != 0) {
            runInAction(() => {
                this.clearProducts = [];
                this.totalPrice = 0;
            });
            let clearProducts_ = [];
            this.products.map(async (e) => {
                const product_id = e.id;
                const index = this.clearProducts.map(e => e.id).indexOf(product_id);
                if(index === -1) {
                    const products = await API.get(`/api/product/get/${product_id}`);
                    const data = products.data.data;
                    runInAction(() => {
                        this.clearProducts.push({
                            id: data._id,
                            product_discount: data.product_discount == null ? null : parseFloat(data.product_discount),
                            product_discount_price: data.product_discount == null ? null : parseFloat(data.product_discount_price),
                            product_list_price: parseFloat(data.product_list_price),
                            product_name: data.product_name,
                            product_amount: data.product_amount,
                            product_image: data.product_image,
                            count: e.count > 0 ? e.count : 1
                        });

                        if(data.product_discount != null)
                            this.totalPrice += (parseFloat(data.product_discount_price)*parseInt(e.count));
                        else
                            this.totalPrice += (parseFloat(data.product_list_price)*parseInt(e.count));
                    })
                }
            });

            return this.clearProducts;
        }else if(this.products.length == 0){
            runInAction(() => {
                this.clearProducts = [];
            })
        }
    }

    @action validateIfProductInBasket = async (product_id) => {
        try{
            let result = false;
            const products_ = await AsyncStorage.getItem('products');
            const products = JSON.parse(products_);
            const inStorage = [];
            const findIndex = products.map(e => e.id).indexOf(product_id);
            return findIndex;
        }catch(e){
            return inStorage;
        }
    }

    @computed get getProducts(){
        return this.clearProducts;
    }

    @computed get getTotalPrice(){
        return this.totalPrice;
    }

    @action setBasketProductDecrement = async (product_id) => {
        try{
            let index = this.products.map(e => e.id).indexOf(product_id)
            if(index > -1) {
                runInAction(() => {
                    let index = this.products.map(e => e.id).indexOf(product_id)
                    this.products[index].count--;
                });
            }
            await AsyncStorage.setItem('products', JSON.stringify(this.products));
            this.fetchProducts()
        }catch(e){
            alert(e);
        }
    }

    @action setBasketProductIncrement = async (product_id) => {
        try{
            let index = this.products.map(e => e.id).indexOf(product_id)
            if(index > -1) {
                runInAction(() => {
                    let index = this.products.map(e => e.id).indexOf(product_id)
                    this.products[index].count++;
                });
            }
            await AsyncStorage.setItem('products', JSON.stringify(this.products));
            this.fetchProducts()
        }catch(e){
            alert(e);
        }
    }

    @action setBasketProduct = async (product_id, count=1) => {
        try{
            let index = this.products.map(e => e.id).indexOf(product_id);
            if(index === -1) {
                runInAction(() => {
                    this.products.push({id: product_id, count: 1});
                });
            }
            await AsyncStorage.setItem('products', JSON.stringify(this.products));
            this.fetchProducts()
        }catch(e){
            alert(e);
        }
    }

    @action deleteBasketProduct = async (product_id) => {
        try{
            let index = this.products.map(e => e.id).indexOf(product_id);
            if(index > -1){
                runInAction(() => {
                    let index = this.products.map(e => e.id).indexOf(product_id);
                    this.products.splice(index, 1);
                });
                await AsyncStorage.setItem('products', JSON.stringify(this.products));
                this.fetchProducts()
            }
        }catch(e){
            alert(e);
        }
    }

    @action deleteBasket = async () => {
        try{
            await AsyncStorage.removeItem('products');
            runInAction(() => {
                this.products = [],
                this.clearProducts = []
            })
            this.fetchProducts()
        }catch(e){
            alert(e);
        }
    }

}

export default new BasketStore();
