import axios from 'axios';
import AuthService from './AuthService';
import { url } from '../const/url';

export default class DCanvasService extends AuthService { 
    constructor() {
        super();
    }

    getImageFromText(addTextVo) {
        return axios.post(url.GET_IMG_FROM_TEXT, addTextVo)
            .then((response) => {
                console.log(response);
                return response;
            }).catch((error) => {
                console.log(error);
            });
    }

    addDrawing(drawingVo) {
        return axios.post(url.ADD_DRAWING, drawingVo, super.setTokenToRequest()) 
            .then((response) => {
                console.log('xxxxxxxxx xxxxxxxxxxxx xxxxxxxxxxxxx object is xxxxx xxxxxxx', drawingVo);
                return response;
            }).catch((error) => {
                console.log(error);
            });
    }

    getDrawing(eventId) {
        return axios.get(url.GET_DRAWING + eventId, super.setTokenToRequest())
            .then((response) => {
                return response;
            }).catch((error) => {
                console.log(error);
            });
    }

    getDrawingPdf(eventId) {
        axios({
            url: this.domain + '/gn/pdf/' + eventId,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
        });
    }

    removeDrawingById(eventId) {
        return axios.delete(url.REMOVE_DRAWING_BY_ID + eventId, super.setTokenToRequest())
            .then((response) => {
                console.log(response);
                return response;
            }).catch((error) => {
                console.log(error);
            });
    }

    updateDrawingTitle(updateTitleVo) {
        return axios.post(url.UPDATE_DRAWING_TITLE, updateTitleVo, super.setTokenToRequest())
            .then((response) => {
                console.log('xxxxxxxxx xxxxxxxxxxxx xxxxxxxxxxxxx object is xxxxx xxxxxxx', updateTitleVo);
                return response;
            }).catch((error) => {
                console.log(error);
            });
    }
}
