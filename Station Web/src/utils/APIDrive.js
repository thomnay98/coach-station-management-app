import axios from 'axios';
import * as Config from '../constants/Config';

export default function apiDrive(endpoint, method = 'GET', body){
    
    return axios({
        method: method,
        url: `${Config.API_DRIVE_URL}/${endpoint}`,
        headers: {
            'Cookie': '__cfduid=df8e80eef8c8d17095cbed3bf0b795c9c1597580737'
        },
        data: body,
    }).catch(err => {
        console.log(err);
    });
};