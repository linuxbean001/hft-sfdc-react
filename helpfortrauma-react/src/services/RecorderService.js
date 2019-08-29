import axios from 'axios';
import AuthService from './AuthService';
import { url } from '../const/url';

export default class RecorderService extends AuthService {
    constructor() {
        super();
    }

    addUpdateRecording(recordingVo) {
        console.log('xxxxxx xxxxxxxxxx ', recordingVo);

        return axios.post(url.ADD_RECORDING, recordingVo, super.setTokenToRequest())
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getRecordingWithDrawing(eventId) {
        return axios.get(url.GET_RECORDING + eventId, super.setTokenToRequest())
            .then(result => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }



}
