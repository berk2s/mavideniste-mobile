import {observable, action, runInAction, computed, configure} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../api'
import {check} from 'react-native-permissions';

import AddressStore from './AddressStore';
import BranchStore from './BranchStore';
import Snackbar from 'react-native-snackbar';
configure({
    enforceActions: 'observed'
})

class BasketStore {

    @observable products = [];
    @observable productsWithID = [];
    @observable totalPrice = 0;
    @observable totalPriceWithCommitte = 0;
    @observable selectedAddress = AddressStore.getAddress.length > 0 ? AddressStore.getAddress[0] : null;

    @observable totalPriceWithCommitte_BeforeCoupon = 0;
    @observable hasCoupon = false;

    @observable relevantCoupon = null;
    /*

        productsWithID stores {id: ..., count:...}
        products stores with its details

     */

    @action cancelCoupon = async () => {
        if(this.hasCoupon){
            runInAction(() => {
                this.hasCoupon = false;
                this.relevantCoupon = null;
               // this.totalPriceWithCommitte = (this.totalPrice+4)
            });
        }
    }

    @action readyProducts = async () => {
        try{
            const productsFromStore = await AsyncStorage.getItem('products');
            if(productsFromStore != null){
                runInAction(() => {
                    this.productsWithID = JSON.parse(productsFromStore);
                });
                await this.cancelCoupon();
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
            //this.totalPriceWithCommitte = this.totalPrice+4;
                const mapPromise = this.productsWithID.map(async e => {
                    return new Promise((async (resolve, reject) => {
                        const product_id = e.id;
                        const checkIndex = this.products.map(e => e.id).indexOf(product_id);
                        if(checkIndex === -1){
                            try{
                                const product = await API.get(`/api/product/get/basket/${product_id}`);

                                if(product.data.data != null) {

                                    const data = product.data.data;

                                    if (data.branch_id != BranchStore.branchID) {
                                        await this.clearBasket();
                                        return false;
                                    }

                                    runInAction(() => {

                                        this.products.push({
                                            id: data._id,
                                            product_discount: data.product_discount == null ? null : parseFloat(data.product_discount),
                                            product_discount_price: data.product_discount == null ? null : parseFloat(data.product_discount_price),
                                            product_list_price: parseFloat(data.product_list_price),
                                            product_name: data.product_name,
                                            product_amount: data.product_amonut,
                                            product_image: data.product_image,
                                            product_category: data.category_id,
                                            count: e.count > 0 ? e.count : 1,
                                        });

                                        if (data.product_discount != null) {
                                            this.totalPrice += (parseFloat(data.product_discount_price) * parseInt(e.count));
                                        } else {
                                            this.totalPrice += (parseFloat(data.product_list_price) * parseInt(e.count));
                                        }

                                    })
                                }
                            }catch(e){
                                alert(e);
                            }
                        }
                        resolve(true);
                    }))
                });

                const promiseIt = await Promise.all(mapPromise);

                runInAction(() => {
                    this.totalPriceWithCommitte = this.totalPrice+BranchStore.branchCommittee;
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

            }else{
                alert('eheheh')
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
        return parseFloat(this.totalPrice).toFixed(2)
    }

    @computed get getTotalPriceWithCommite(){
        return parseFloat(this.totalPriceWithCommitte).toFixed(2)
    }

    @action setTotalPriceWithCommitte = async (price) => {
        runInAction(() => {
            this.totalPriceWithCommitte = price;
        })
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
                    let indexx = this.products.map(e => e.id).indexOf(product_id);

                    if(parseInt(this.products[indexx].count) < parseInt(this.products[indexx].product_amount)) {
                        this.products[indexx].count++;
                    }else{
                        Snackbar.show({
                            text: 'Bu üründen en fazla ' + this.products[indexx].count + ' tane alabilirsiniz',
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor:'#FF9800',
                            textColor:'white',
                        });
                    }

                });
            }
            await AsyncStorage.setItem('products', JSON.stringify(this.products));
            await this.calcTotalPrice()
            await this.readyProducts()
        }catch(e){
            alert(e);
        }
    }

    @action setSelectedAddress = async (address) => {
        runInAction(() => {
            this.selectedAddress = address;
        })
    }

    @action updateSelectedAddress = async () => {
        runInAction(() => {
            this.selectedAddress = AddressStore.getAddress.length > 0 ? AddressStore.getAddress[0] : null;
        })
    }

    @action clearSelectedAddress = async () => {
        runInAction(() => {
           this.selectedAddress = null
        });
    }

    @computed get getProducts(){
        return this.products
    }

    @computed get getSelectedAddress(){
        return this.selectedAddress;
    }

    @computed get oldTotalPriceWithCoupon(){
        return this.totalPriceWithCommitte_BeforeCoupon;
    }

    @computed get couponStatus(){
        return this.hasCoupon;
    }

    @computed get getCoupon(){
        return this.relevantCoupon;
    }

    @action setOldTotalPriceBeforeCoupon = async (price) => {
        this.totalPriceWithCommitte_BeforeCoupon = price;
    }

    @action setLastTotalPrice = async (price) => {
        this.totalPriceWithCommitte = price;
    }

    @action setCouponStatus = async (data) => {
        this.hasCoupon = data;
    }

    @action setCoupon = async (coupon) => {
        this.relevantCoupon = coupon;
    }
}

export default new BasketStore();
