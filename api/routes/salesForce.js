const express = require('express');
const router = express.Router();
const conSf = require('../controller/con-sf');
const checkAuth = require('../middleware/check-auth');


/* ****************************Login User and Authenticate**************************** */
router.get('/get/subscriber', conSf.getSubscriber);

/* *******************************Get Courses************************************* */
router.get('/get/course', conSf.getCourse);

/* *******************************Get Live Courses************************************* */
router.get('/get/live/courses', conSf.getLiveCourses);

/* ********************* Get Lessons of a course **************************** */
router.get('/get/lessons/:courseId', checkAuth, conSf.getLessons);

/* ********************** Get the questions for the lesson ************************* */
router.get('/get/questions/:lessonId', conSf.getKnowledgeCheckQues);

/* *******************************Buy Courses************************************* */
router.post('/submit/user/knowledge_check', checkAuth, conSf.submitUsrKnowledgeCheck);

/* ********************** Get the questions for the lesson ************************* */
router.get('/get/user/courses/:userId', checkAuth, conSf.getUserCourses);

/* ********************** Get the questions for the lesson ************************* */
router.get('/get/user/full/courses', checkAuth, conSf.getUserCoursesFull);

/* ********************** Get User Completed Lesson ************************* */
router.get('/get/user/completed/lesson/:courseId', checkAuth, conSf.getUserCompletedLesson);

/* *******************************Buy Courses************************************* */
router.post('/buy/course', checkAuth, conSf.buyCourse);

/* *******************************Buy Courses************************************* */
router.post('/buy/courses', conSf.buyCourses);

/* *******************************Add Subscriber Completed Lesson********************* */
router.post('/add/subsciber/lesson', checkAuth, conSf.addSubscriberLesson);

/* *******************************Get Subscriber Completed Lesson************************* */
router.get('/get/subsciber/result/lesson/:lessonId/:courseId', checkAuth, conSf.getUserKnowledgeCheckResult);

/* *******************************Get Subscriber Completed Lesson************************* */
router.get('/get/no_of_lesson/by/course', checkAuth, conSf.getNoOfLessonsByCourse);


router.get('/test', conSf.test);


module.exports = router;