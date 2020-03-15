import {observable, action, runInAction, computed, configure} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import ProductStore from './ProductStore';
import API from '../api'
import {check} from 'react-native-permissions';

configure({
    enforceActions: 'observed'
})

class BasketStore {

    @observable products = [];
    @observable productsWithID = [];
    @observable totalPrice = 0;

    /*

        productsWithID stores {id: ..., count:...}
        products stores with its details

     */

    @action readyProducts = async () => {
        try{
            const productsFromStore = await AsyncStorage.getItem('products');
            if(productsFromStore != null){
                runInAction(() => {
                    this.productsWithID = JSON.parse(productsFromStore);
                });
                await this.fetchProducts();
            }
        }catch(e){
            alert(e);
        }
    }

    @action calcTotalPrice = async () => {
        try{
            this.totalPrice = 0;
            this.products.map(e => {

                if(e.product_discount != null)
                    this.totalPrice += (parseFloat(e.product_discount_price)*parseInt(e.count));
                else
                    this.totalPrice += (parseFloat(e.product_list_price)*parseInt(e.count));

            });
            return this.totalPrice
        }catch(e){
            console.log(e);
        }
    }

    @action fetchProducts = async () => {
        try{
                this.productsWithID.map(async e => {
                    const product_id = e.id;
                    const checkIndex = this.products.map(e => e.id).indexOf(product_id);
                    if(checkIndex === -1){
                        try{
                            const product = await API.get(`/api/product/get/${product_id}`);
                            const data = product.data.data;
                            runInAction(() => {

                                this.products.push({
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
                        }catch(e){
                            alert(e);
                        }
                    }
                })

        }catch(e){
            alert(e);
        }
    }

    @action addToBasket = async (product_id, count=1) => {
        try{
            const checkIndex = this.productsWithID.map(e => e.id).indexOf(product_id);
            if(checkIndex === -1){
                await runInAction(() => {
                    this.productsWithID.push({id: product_id, count:count});
                })
                await AsyncStorage.setItem('products', JSON.stringify(this.productsWithID));
                await this.readyProducts();
            }
        }catch(e){
            alert(e);
        }
    }

    @action removeFromBasket = async (product_id) => {
        try{
            let index = this.productsWithID.map(e => e.id).indexOf(product_id);
            if(index > -1){
                runInAction(() => {
                    let indexForDetails = this.products.map(e => e.id).indexOf(product_id);
                    this.products.splice(indexForDetails, 1);
                    this.productsWithID.splice(index, 1);
                });
                await AsyncStorage.setItem('products', JSON.stringify(this.productsWithID));
                await this.calcTotalPrice();
                await this.readyProducts();
            }
        }catch(e){
            alert(e);
        }
    }

    @computed get getTotalPrice() {
        return this.totalPrice
    }

    @action clearBasket = async () => {
        try{
            await AsyncStorage.removeItem('products');
            runInAction(() => {
                this.products = [];
                this.productsWithID = [];
                this.totalPrice = 0
            });
            this.fetchProducts()
        }catch(e){
            alert(e);
        }
    }

    @action decrementProduct = async (product_id) => {
        try{
            let index = this.productsWithID.map(e => e.id).indexOf(product_id)
            if(index > -1) {
                runInAction(() => {
                    let index = this.products.map(e => e.id).indexOf(product_id)
                    this.products[index].count--;
                });
            }
            await AsyncStorage.setItem('products', JSON.stringify(this.products));
            await this.calcTotalPrice()
            await this.readyProducts();
        }catch(e){
            alert(e);
        }
    }

    @action incrementProduct = async (product_id) => {
        try{
            let index = this.productsWithID.map(e => e.id).indexOf(product_id)
            if(index > -1) {
                runInAction(() => {
                    let index = this.products.map(e => e.id).indexOf(product_id)
                    this.products[index].count++;
                });
            }
            await AsyncStorage.setItem('products', JSON.stringify(this.products));
            await this.calcTotalPrice()
            await this.readyProducts()
        }catch(e){
            alert(e);
        }
    }

    @computed get getProducts(){
        return this.products
    }

}

export default new BasketStore();
