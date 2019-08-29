import decode from 'jwt-decode';
import axios from 'axios';
import { url } from '../const/url';
export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = 'https://hft-sfdc.herokuapp.com'; // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff 
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    getDomain() {
        return this.domain;
    }

    setTokenToRequest() {
        axios.interceptors.request.use(
            config => {
                const token = this.getToken();
                console.log('sadddddd' + token);

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

    }

    forgetPassword(email) {
        return axios.post(url.FORGOT_PASS, {
            email: email,
        }).then(res => {
            return (res);
        }).catch(err => {
            console.log('xxxxxxx xxxxx error is ', err);
        })
    }

    resetPassword(pass, token) {
        let axiosConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        };
        return axios.post(url.RESET_PASS, {
            pass: pass,
        }, axiosConfig).then(res => {
            return (res);
        }).catch(err => {
            console.log('xxxxxxx xxxxx error is ', err);
        })
    }

    setTokenToRequest() {
        console.log('xxx token request');
        if (this.getToken()) {
            console.log('if');
            axios.defaults.headers['Authorization'] = 'Bearer ' + this.getToken();
            console.log('xxx xxx xx xx auth ', axios.defaults.headers);

        } else {
            console.log('else')
            axios.defaults.headers['Authorization'] = null; 
        }
    }

    login(username, password) {
        return axios.post(url.LOGIN, {
            email: username,
            pass: password
        })
            .then(result => {
                console.log(result);
                this.setToken(result.data.body);
                return Promise.resolve(result);
            });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', JSON.stringify(idToken))
    }

    getToken() {
        // Retrieves the user token from localStorage
        let token = '';
        if (localStorage.getItem('id_token')) {
            token = JSON.parse(localStorage.getItem('id_token'));
        }
        return token
    }

    logout() {
        // Clear user token and profile data from localStorage
        // localStorage.clear() 
        localStorage.removeItem('id_token');
        localStorage.removeItem('event');
        localStorage.removeItem('names');
        localStorage.removeItem('RECORDER');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        console.log('xxxxxxxxxx-,', decode(this.getToken()));
        return decode(this.getToken());
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
