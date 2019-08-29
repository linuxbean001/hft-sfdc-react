import RecorderService from './RecorderService';
const recService = new RecorderService();

export default class DataCacheService {
    constructor() {
    }

    getRecorderSlides(eventId) {
        recService.getRecordingWithDrawing(eventId)
            .then(data => {
                console.log('xxxxxxxx serv', data);
                localStorage.setItem('RECORDER', JSON.stringify(data));
            }).catch(err => {
                console.log('xxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx error is ', err);

            });
    }
}
