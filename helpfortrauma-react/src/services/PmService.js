import axios from 'axios';
import { url } from '../const/url';
import AuthService from './AuthService';

export default class PmService extends AuthService {
    constructor() {
        super();
    }

    getFonts() {
        return axios.get(url.GET_FONTS)
            .then(result => {
                console.log('xxxxxxx xxxxxxx xxxxxxxx font array is ', result);
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    addPmImage(pmVo) {
        return axios.post(url.ADD_PM, pmVo, super.setTokenToRequest())
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getPmImage() {
        return axios.get(url.GET_PM, super.setTokenToRequest())
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
}
