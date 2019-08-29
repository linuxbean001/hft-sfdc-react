import axios from 'axios';
import AuthService from './AuthService';
import { url } from '../const/url';

export default class RegisterService extends AuthService {
    constructor() {
        super();
    }

    registerUser(userInfoVo) {
        return axios.post(url.REGISTER_USR, userInfoVo)
            .then((result) => {
                this.setToken(result.data.body);
                return Promise.resolve(result);
                //return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getSubscriberOptions() {
        return axios.get(url.GET_SUBSCRIBER_OPTIONS)
            .then(result => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    sendWelcomeEmail(emailVo) {
        return axios.post(url.SEND_WELCOME_EMAIL, emailVo)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getCreatedUser() {
        return JSON.parse(localStorage.getItem("createdUser"));
    }

    getCreatedUserCredentials() {
        return JSON.parse(localStorage.getItem("createdUserCredentials"));
    }

    setCreatedUser(user) {
        localStorage.setItem("createdUser", JSON.stringify(user));
    }

    setUsrCredentials(userCred) {
        localStorage.setItem("createdUserCredentials", JSON.stringify(userCred));
    }

    removeCreatedUser() {
        localStorage.removeItem("createdUser");
    }

    removeCreatedUserCredentials() {
        localStorage.removeItem("createdUserCredentials");
    }
}
