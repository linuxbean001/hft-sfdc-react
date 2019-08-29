import axios from 'axios';
import AuthService from './AuthService';
import { url } from '../const/url';

export default class ReviewPageService extends AuthService {
    constructor() {
        super();
    }

    addPartmaptStatus(req) {
       
        return axios.post(url.ADD_PARTSMAP_STATUS, req, super.setTokenToRequest()) 
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }
    addGroundingStatus(req) {
        return axios.post(url.ADD_GROUNDING_STATUS, req, super.setTokenToRequest()) 
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }
    addGNStatus(req) {
        return axios.post(url.ADD_GN_STATUS, req, super.setTokenToRequest()) 
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }
    
    addEDialogueStatus(req) {
        return axios.post(url.ADD_ED_STATUS, req, super.setTokenToRequest()) 
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }
    addSpStatus(req) {
        return axios.post(url.ADD_SP_STATUS, req, super.setTokenToRequest()) 
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }
}
