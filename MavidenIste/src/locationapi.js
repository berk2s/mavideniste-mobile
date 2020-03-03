import axios from 'axios';

//constants
import {LOCATION_API_URL, LOCATION_API_KEY} from './constants';

export default axios.create({
    baseURL: LOCATION_API_URL,
    headers:{
        'x-api-key': LOCATION_API_KEY
    }
});
