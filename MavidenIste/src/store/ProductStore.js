import {observable, action, runInAction, computed, configure} from 'mobx';

import BasketStore from './BasketStore';

import API from '../api'

configure({
    enforceActions: 'observed'
});

class ProductStore {

    @observable products = [];
    @observable sub_categories = [];
    @observable selected_tags = [];

    @action fetchProducts = async (category_id, branch_id) => {
        try{
            runInAction(() => {
                this.selected_tags = []
            })
            const products = await API.get(`/api/product/get/${branch_id}/${category_id}`);

            const sub_categories = await API.get(`/api/subcategory/${category_id}`);

            const productCheckPromise = new Promise((resolve, reject) => {
                runInAction(() => {
                    this.products = [...products.data.data];
                    if(this.products.length !=0) {
                        this.products.map(async e => {
                            resolve(true)
                        })
                    }else{
                        resolve(true)
                    }
                });
            })
            const subPromise = new Promise((resolve, reject) => {
                runInAction(() => {
                    this.sub_categories = [...sub_categories.data.data];
                    if(this.sub_categories.length != 0) {
                        this.sub_categories.map(async e => {
                            resolve(true)
                        })
                    }else{
                        resolve(true)
                    }
                });
            })
            await subPromise;

            await productCheckPromise;
        }catch(e){
            alert(e);
        }
    }

    @action fetchProductsWithSubCategory = async (sub_category_id) => {
        try {
            runInAction(() => {
                this.products = [];
                this.selected_tags.push(sub_category_id);
            })

           // const products = await API.get(`/api/product/sub/${sub_category_id}`);

            runInAction(() => {
                // this.products = [...products.data.data]
                this.products = this.products.filter(e => e.sub_category_id == sub_category_id)
            });

           // await productsPromise;

        }catch(e){
            console.log(e);
        }
    }

    @action clearSubCategory = async (sub_category_id) => {
        try{
            const findIndex = this.selected_tags.indexOf(sub_category_id);
            runInAction(() => {
                this.selected_tags.splice(findIndex, 1)
            })
        }catch(e){
            console.log(e);
        }
    }

    @computed get getProducts() {
        return this.products;
    }

    @computed get subCategories(){
        return this.sub_categories
    }

    @computed get selectedTags(){
        return this.selected_tags;
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
