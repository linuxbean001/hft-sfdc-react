const domain = 'http://localhost:3300';
//const domain = 'https://hft-sfdc.herokuapp.com';

exports.url = {

    // User Authentication 
    LOGIN: ` ${domain}/login/authenticate`,
    FORGOT_PASS: `${domain}/login/forget-password`,
    RESET_PASS: `${domain}/login/reset-password`,
    SEND_WELCOME_EMAIL: `${domain}/register/send/welcome/email`, 

    // User Registration
    REGISTER_USR: `${domain}/register/user`,
    GET_SUBSCRIBER_OPTIONS: `${domain}/sf/get/subscriber`,

    // Trauma Courses
    GET_ALL_COURSES: `${domain}/sf/get/course`,
    GET_ALL_LIVE_COURSES: `${domain}/sf/get/live/courses`,
    GET_COURSE_LESSONS: `${domain}/sf/get/lessons/`,
    GET_QUES_FOR_LESSON: `${domain}/sf/get/questions/`,
    GET_USR_COURSES: `${domain}/sf/get/user/courses/`,
    GET_USR_COURSES_FULL: `${domain}/sf/get/user/full/courses`,
    BUY_COURSE: `${domain}/sf/buy/course`,
    BUY_COURSES: `${domain}/sf/buy/courses`,
    SUBMIT_USR_ANS: `${domain}/sf/submit/user/knowledge_check`,
    GET_USR_KC_RESULT: `${domain}/sf/get/subsciber/result/lesson/`,
    GET_USR_COMPLETED_LESSONS: `${domain}/sf/get/user/completed/lesson/`,
    ADD_USR_COMPLETED_LESSONS: `${domain}/sf/add/subsciber/lesson`,
    GET_COURSE_LESSON_COUNT: `${domain}/sf/get/no_of_lesson/by/course`, 

    // Drawing Canvas
    GET_IMG_FROM_TEXT: `${domain}/img/converter`,
    ADD_DRAWING: `${domain}/gn/add`,
    
    GET_DRAWING: `${domain}/gn/drawing/`,
    GET_DRAWING_PDF: `${domain}/gn/pdf/`,
    REMOVE_DRAWING_BY_ID: `${domain}/gn/remove/`,
    UPDATE_DRAWING_TITLE: `${domain}/gn/update/title`,
    ADD_GN_STATUS: `${domain}/gn/status`,
    // Trauma Events
    ADD_EVENT: `${domain}/event/add`,
    UPDATE_EVENT: `${domain}/event/edit/`,
    GET_EVENT_BY_ID: `${domain}/event/get/`,
    DEL_EVENT_BY_ID: `${domain}/event/remove/`,
    GET_ASS: `${domain}/hft/assessment/`,
    SAVE_ASS_RESULT: `${domain}/hft/assessment/save_result`,
    REQUEST_ASS: `${domain}/hft/assessment/request`,
    GET_ASS_RESULT: `${domain}/hft/user/assessment/ass_result`,
    IS_USR_ASS_ALLOWED: `${domain}/hft/check/assessment/user/`,
    GET_ASS_RESULT_HOME: `${domain}/hft/user/assessment/ass_result_home`,
    GET_ASS_RESULT_STATUS: `${domain}/hft/user/assessment/ass_result_status`,
    ADD_EVENT_STATUS: `${domain}/event/status`,
    // Payment Stripe
    GO_TO_STRIPE: `${domain}/register/stripe/payment/checkout`,

    // Recorder
    ADD_RECORDING: `${domain}/recorder/add`,
    GET_RECORDING: `${domain}/recorder/get/`,

    // Parts Map
    ADD_PM: `${domain}/pm/add/image`,
    GET_PM: `${domain}/pm/get/image`,
    GET_FONTS: 'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyD6xYUbJyn6_O5R9RGG-ACZk_XyZtq6rYU',
    ADD_PARTSMAP_STATUS: `${domain}/pm/status`,
    // Grounding 
    ADD_GROUNDING_STATUS: `${domain}/pm/groundingstatus`,
    //Externalized Dialogue
    ADD_CHAT: `${domain}/ed/add/dialogue`,
    EDIT_CHAT: `${domain}/ed/edit/dialogue`,
    DELETE_CHAT: `${domain}/ed/delete/dialogue/`,
    GET_CHAT: `${domain}/ed/get/dialogue`,
    ADD_ED_STATUS: `${domain}/ed/status`,

    //Safe Place
    ADD_SP_STATUS: `${domain}/sp/status`,
    ADD_SAFE_PLACE: `${domain}/sp/add`,
    GET_SAFE_PLACE_DRAWING: `${domain}/sp/drawing/`,
}
