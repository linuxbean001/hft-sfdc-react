import axios from 'axios';
import AuthService from './AuthService';
import { url } from '../const/url';

export default class CoursesService extends AuthService {
    constructor() {
        super();
    }

    getCourses() {
        return axios.get(url.GET_ALL_COURSES, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    getLiveCourses() {
        return axios.get(url.GET_ALL_LIVE_COURSES, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    getLessons(courseId) {
        return axios.get(url.GET_COURSE_LESSONS + courseId, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    getQuesForLesson(lessonId) {
        return axios.get(url.GET_QUES_FOR_LESSON + lessonId, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    getUserCourses(userId) {
        return axios.get(url.GET_USR_COURSES + userId, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    getUserCoursesFull() {
        return axios.get(url.GET_USR_COURSES_FULL, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }


    buyCourse(courseVo) {
        return axios.post(url.BUY_COURSE, courseVo)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    buyCourses(courses) {
        return axios.post(url.BUY_COURSES, courses)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    submitUsrKnowledgeCheck(answers) {
        return axios.post(url.SUBMIT_USR_ANS, answers)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getUserKnowledgeCheckResult(courseId, lessonId) {
        return axios.get(url.GET_USR_KC_RESULT + lessonId + '/' + courseId, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    getUserCompltedLesson(courseId) {
        return axios.get(url.GET_USR_COMPLETED_LESSONS + courseId, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }

    addUserCompletedLesson(lessonVo) {
        return axios.post(url.ADD_USR_COMPLETED_LESSONS, lessonVo, super.setTokenToRequest())
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getNoOfLessonByCourse() {
        return axios.get(url.GET_COURSE_LESSON_COUNT, super.setTokenToRequest())
            .then(res => {
                return (res);
            }).catch(err => {
                console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            });
    }
}
