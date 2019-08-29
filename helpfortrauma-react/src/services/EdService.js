import axios from 'axios';
import { url } from '../const/url';
import AuthService from './AuthService';

export default class EdService extends AuthService {
    constructor() {
        super();
    }
    AddDialogue(dataVo) {
        return axios.post(url.ADD_CHAT, dataVo, super.setTokenToRequest())
            .then((result) => {
                return (result);
            }).catch(err => {

                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    editDialogue(dataVo) {
        return axios.post(url.EDIT_CHAT, dataVo, super.setTokenToRequest())
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    deleteDialogue(id) {
        return axios.post(url.DELETE_CHAT + id, super.setTokenToRequest())
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
    getDialogueTitle() {
        return axios.get(url.GET_CHAT, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }


}
