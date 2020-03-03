import axios from 'axios';

//constants
import {API_URL, API_KEY} from './constants';
import AuthStore from './store/AuthStore';
import {observer} from 'mobx-react';



export default axios.create({
    baseURL: API_URL,
    headers:{
        'x-api-key': API_KEY,
        //'x-access-token': AuthStore
    }
});
