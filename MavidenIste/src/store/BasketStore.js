import {observable, action, runInAction, computed} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../api'

class BasketStore {
    @observable products = [];
    @observable clearProducts = [];

    @action getBasketProducts = async () => {
        try{
            const products = await AsyncStorage.getItem('products');
            runInAction(() => {
                this.products = JSON.parse(products);
            });
            this.fetchProducts();
            return this.products;
        }catch(e){
            alert(e);
        }
    }

    @action fetchProducts = () => {
        if(this.products.length != 0) {
            this.products.map(async (e) => {
                const product_id = e.id;
                const index = this.clearProducts.map(e => e.id).indexOf(product_id);
                if(index === -1) {
                    const products = await API.get(`/api/product/get/${product_id}`);
                    const data = products.data.data;
                    runInAction(() => {
                        this.clearProducts.push({
                            id: data._id,
                            product_discount: data.product_discount,
                            product_discount_price: data.product_discount_price,
                            product_list_price: data.product_list_price,
                            product_name: data.product_name,
                            product_amount: data.product_amount,
                            product_image: data.product_image,
                        })
                    })
                }
            });
            return this.clearProducts;
        }
    }

    @computed get getProducts(){
        return this.clearProducts
    }

    @action setBasketProductDecrement = async (product_id) => {
        try{
            runInAction(() => {
                const index = this.products.map(e => e.id).indexOf(product_id)
                this.products[index].count++;
            });
            await AsyncStorage.mergeItem('products', JSON.stringify(this.products));
        }catch(e){
            alert(e);
        }
    }

    @action setBasketProductIncrement = async (product_id) => {
        try{
            runInAction(() => {
                const index = this.products.map(e => e.id).indexOf(product_id)
                this.products[index].count++;
            });
            await AsyncStorage.mergeItem('products', JSON.stringify(this.products));
        }catch(e){
            alert(e);
        }
    }

    @action setBasketProduct = async (product_id, count=1) => {
        try{
            runInAction(() => {
                this.products.push({id: product_id, count: count});
            });
            this.fetchProducts()
            await AsyncStorage.setItem('products', JSON.stringify(this.products));
        }catch(e){
            alert(e);
        }
    }

    @action deleteBasketProduct = async (product_id) => {
        try{
            let index = this.products.map(e => e.id).indexOf(product_id);
            if(index > -1){
                runInAction(() => {
                    this.products.splice(index, 1);
                });
            }
            this.fetchProducts()
            await AsyncStorage.mergeItem('products', JSON.stringify(this.products));
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
