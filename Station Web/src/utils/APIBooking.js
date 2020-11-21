import axios from 'axios';
import * as Config from '../constants/Config';

export default function apiBooking(endpoint, method, body){
    return axios({
        method: method,
        url: `${Config.API_BOOKING_URL}/${endpoint}`,
        data : body,
    }).catch(err => {
        console.log(err.response);
    });
};

