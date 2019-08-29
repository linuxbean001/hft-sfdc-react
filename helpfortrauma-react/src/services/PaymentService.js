import axios from 'axios';
import AuthService from './AuthService';
import { url } from '../const/url';

export default class PaymentService extends AuthService {
    constructor() {
        super();
    }

    goToStripe(token) {
        console.log('xxxxx xxxxxxxx token is ', token);
        
        return axios.post(url.GO_TO_STRIPE, token)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
}
