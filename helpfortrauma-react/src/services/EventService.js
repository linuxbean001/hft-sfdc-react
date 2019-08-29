import axios from 'axios';
import AuthService from './AuthService';
import { url } from '../const/url';

export default class EventService extends AuthService {
    constructor() {
        super();
    }

    addEvent(req) {
        let Apiurl = '';
        if (req.id) {
            Apiurl = url.UPDATE_EVENT + req.id;
        } else {
            Apiurl = url.ADD_EVENT;
        }
        return axios.post(Apiurl, req, super.setTokenToRequest()) 
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }

    getEventsById(id) {
        return axios.get(url.GET_EVENT_BY_ID + id, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    deleteEventById(id) {
        return axios.delete(url.DEL_EVENT_BY_ID + id, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);

            })
    }

    getCourses() {
        return axios.get(this.domain + '/sf/get/course', super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    getAssesment(assType) {
        return axios.get(url.GET_ASS + assType, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    saveAssResult(result) {

        return axios.post(url.SAVE_ASS_RESULT, result, super.setTokenToRequest()) 
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    requestAssessment(info) {
        return axios.post(url.REQUEST_ASS, info, super.setTokenToRequest()) 
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getAssResult() {
        return axios.get(url.GET_ASS_RESULT, super.setTokenToRequest()) 
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }
    getAssResult_home() {
        return axios.get(url.GET_ASS_RESULT_HOME, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }
    getReviewStatus() {
        return axios.get(url.GET_ASS_RESULT_STATUS, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }
    isUsrAllowedForAss(ass) {
        console.log('xxxxxxx xxxxxx xxxxxxxxxx ass start checking');
        
        return axios.get(url.IS_USR_ASS_ALLOWED + ass, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }
    addEventStatus(req) {
       
        return axios.post(url.ADD_EVENT_STATUS, req, super.setTokenToRequest()) 
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }
}
