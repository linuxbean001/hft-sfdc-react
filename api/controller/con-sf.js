const query = require('../pg-connect');
const format = require('pg-format');

exports.getSubscriber = async (req, res, next) => {
    const sql = 'SELECT * FROM salesforce.I_am_here_for__c';
    try {
        const data = await query(sql);
        res.status(200).json({
            message: 'I am here for options',
            success: true,
            body: data.rows
        });
    } catch (err) {
        res.status(404).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

/* *******************************Get Courses************************************* */
exports.getCourse = async (req, res) => {
    const sql = 'SELECT * FROM salesforce.Course__c';
    try {
        const data = await query(sql);
        res.status(200).json({
            message: 'All Courses',
            success: true,
            body: data.rows
        });
    } catch (err) {
        res.status(404).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

/* *******************************Get Courses************************************* */
exports.getLessons = async (req, res, next) => {
    const sql = "SELECT *, Course__c FROM salesforce.Lessons__c WHERE Course__c = " + "'" + req.params.courseId + "'";
    try {
        const data = await query(sql);
        res.status(200).json({
            message: 'Lessons',
            success: true,
            body: data.rows
        });
    } catch (err) {
        res.status(404).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

exports.getLiveCourses = async (req, res, next) => {
    const sql = 'SELECT * FROM salesforce.LiveTrainingCourses__c';
    try {
        const result = await query(sql);
        console.log(result);
        res.status(200).json({
            message: 'Live trainning courses',
            success: true,
            body: result.rows
        });
    } catch (err) {
        res.status(200).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }

}

exports.getKnowledgeCheckQues = async (req, res, next) => {
    const sql = "SELECT * FROM salesforce.Knowledge_Check__c WHERE lessons__c = " + "'" + req.params.lessonId + "'";
    try {
        const result = await query(sql);
        res.status(200).json({
            message: 'Knowledge Check questions for lesson are',
            success: true,
            body: result.rows
        });
    } catch (err) {
        res.status(200).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

exports.getUserCourses = async (req, res, next) => {
    const sql = "SELECT Course__c FROM salesforce.Subscriber_Course__c WHERE Subscriber__c = " + "'" + req.params.userId + "'";
    console.log(sql);
    try {
        const courses = await query(sql);
        res.status(200).json({
            message: 'The User Courses are',
            success: true,
            body: courses.rows
        });
    } catch (err) {
        res.status(400).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

exports.getUserCoursesFull = async (req, res) => {
    const sql = "SELECT * FROM salesforce.Subscriber_Course__c INNER JOIN salesforce.Course__c ON salesforce.Subscriber_Course__c.course__c = salesforce.Course__c.sfid WHERE salesforce.Subscriber_Course__c.Subscriber__c = " + "'" + req.userData.sfid + "'";

    try {
        const courses = await query(sql);
        res.status(200).json({
            message: 'The User Courses are',
            success: true,
            body: courses.rows
        });
    } catch (err) {
        res.status(400).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

/* *******************************Buy Courses************************************* */
exports.buyCourse = (req, res, next) => {
    const sql = 'INSERT INTO salesforce.Subscriber_Course__c (Course__c, Name, Subscriber__c, Subscriber__r__UserName__c) VALUES($1,$2,$3,$4) RETURNING id';
    const body = _setBodyForBuyCourse(req);
    query(sql, body)
        .then(data => {
            console.log('xxxxxxx xxxxxxxxxxxxxxx result is ', data);
            res.status(200).json({
                message: 'Subscribed to course successfully',
                success: true,
                body: data.rows
            });
        }).catch(err => {
            res.status(400).json({
                message: 'Backend Error',
                success: false,
                body: err
            });
            console.log('xxxxxxx xxxxxxxxxxxxxxx err is ', err);
        });
}

exports.buyCourses = async (req, res, next) => {
    _setBodyForBuyCourses(req)
        .then(body => {
            const sql = format('INSERT INTO salesforce.Subscriber_Course__c (Course__c, Name, Subscriber__c, Subscriber__r__UserName__c) VALUES %L', body);
            console.log(sql);

            query(sql)
                .then(data => {
                    console.log('xxxxxxx xxxxxxxxxxxxxxx result is ', data);
                    res.status(200).json({
                        message: 'Subscribed to course successfully',
                        success: true,
                        body: data.rows
                    });
                }).catch(err => {
                    res.status(400).json({
                        message: 'Backend Error',
                        success: false,
                        body: err
                    });
                    console.log('xxxxxxx xxxxxxxxxxxxxxx err is ', err);
                });
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxx promise err ', err);

        })

}

/* *******************************Add Subscriber Completed Lesson************************************* */
exports.addSubscriberLesson = async (req, res, next) => {
    const sql = 'INSERT INTO salesforce.Subscriber_Lesson__c (Lessons__c, Name, Subscriber__c, Course__c) VALUES($1,$2,$3,$4) RETURNING id';

    const body = _setBodySubscriberLesson(req);
    try {
        const data = await query(sql, body);
        res.status(200).json({
            message: 'Lesson Mark as complete',
            success: true,
            body: data.rows
        });
    } catch (err) {
        res.status(400).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

exports.getUserCompletedLesson = async (req, res) => {
    let usrId = req.userData.sfid;
    let courseId = req.params.courseId;
    const sql = "SELECT * FROM salesforce.Subscriber_Lesson__c WHERE Subscriber__c = " + "'" + usrId + "' AND Course__c = " + "'" + courseId + "' ORDER BY id DESC";
    try {
        const result = await query(sql);
        res.status(200).json({
            message: 'The User Completed Lessons',
            success: true,
            body: result.rows
        });
    } catch (err) {
        console.log('xxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxx init ', err);
        res.status(400).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

/* *******************************Submit Subscriber Assessment************************* */
exports.submitUsrKnowledgeCheck = async (req, res) => {
    const body = setDataForSubmitUsrAns(req);
    const sql = format('INSERT INTO salesforce.Subscriber_KnowledgeCheck__c (course__c, name, knowledge_check_answer__c, knowledge_check__c, lessons__c, subscriber__c) VALUES %L', body);
    try {
        const result = await query(sql);
        res.status(200).json({
            message: 'User Knowledge Check Submitted Successfully',
            success: true,
            body: result.rows
        });
    } catch (err) {
        console.log('xxxxxxxxxxx xxxxxxxxxxxxxxxxxxx err ', err)
        res.status(400).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

/* *******************************Get Subscriber Completed Lesson************************* */
exports.getUserKnowledgeCheckResult = async (req, res, next) => {
    let lessonId = req.params.lessonId;
    let courseId = req.params.courseId;
    let usrId = req.userData.sfid;
    const sql = "SELECT * FROM salesforce.Subscriber_KnowledgeCheck__c WHERE Subscriber__c = " + "'" + usrId + "' AND course__c = " + "'" + courseId + "' AND lessons__c = " + "'" + lessonId + "'";
    try {
        const result = await query(sql);
        let resultMap = new Map();
        result.rows.forEach(row => {
            resultMap.set(row.knowledge_check__c, {
                selected: row.knowledge_check_answer__c,
                answer: row.knowledge_check_answer__c,
                name: row.name,
                result: true
            });
        });

        res.status(200).json({
            message: 'The User Knowledge Check Result',
            success: true,
            body: JSON.stringify([...resultMap])
        });
    } catch (err) {
        res.status(400).json({
            message: 'Backend Error',
            success: false,
            body: err
        });
    }
}

/* *******************************Get Subscriber Completed Lesson************************* */
function _setBodyForBuyCourse(data) {

    const reqObj = [
        data.body.courseId,
        data.body.courseName,
        data.userData.sfid,
        data.userData.username,
    ]
    console.log('xxxxx xxxxxxxxxxx ', reqObj);
    return reqObj;
}

function _setBodyForBuyCourses(data) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT sfid FROM salesforce.Subscriber__c WHERE id = " + "'" + data.body.usrId + "'";
        query(sql)
            .then(result => {
                const reqObj = [];
                data.body.courses.forEach(row => {
                    let k = [
                        row.sfid,
                        row.name,
                        result.rows[0].sfid,
                        data.body.username,
                    ];
                    reqObj.push(k);
                });
                console.log('xxxxx xxxxxxxxxxx ', reqObj);
                resolve(reqObj);
            }).catch(err => {
                console.log('err is ', err);
            })

    });

}


function setDataForSubmitUsrAns(req) {
    const reqObjs = [];
    req.body.answers.forEach(row => {
        let reqObj = [
            req.body.courseId,
            row.lessonName,
            row.selected,
            row.quesId,
            req.body.lessonId,
            req.userData.sfid
        ];
        reqObjs.push(reqObj);
    });
    return reqObjs;
}


function _setBodySubscriberLesson(data) {
    const reqObj = [
        data.body.lessonId,
        data.body.lessonName,
        data.userData.sfid,
        data.body.courseId
    ]
    console.log('xxxx xxxxxxxxx reqObj ', reqObj);

    return reqObj;
}

exports.getNoOfLessonsByCourse = async (req, res) => {
    console.log(req.userData);

    const sql = 'SELECT count(*) as lessoncount, Course__c FROM salesforce.Lessons__c GROUP  BY Course__c';
    const sql1 = "SELECT count(*) as completed, Course__c from salesforce.Subscriber_Lesson__c  WHERE Subscriber__c = " + "'" + req.userData.sfid + "'" + "GROUP  BY Course__c";
    try {
        const result = await query(sql);
        const result1 = await query(sql1);
        console.log(result);
        console.log(result1);

        let resMap = new Map();
        result.rows.forEach(row => {
            result1.rows.forEach(row1 => {
                if (row.course__c == row1.course__c) {
                    let percent = (row1.completed / row.lessoncount) * 100;
                    console.log('percent is ', row.lessoncount);
                    resMap.set(row.course__c, percent.toFixed(1));
                }
            });
        });
        console.log('xxxxxx xxxxxxxxxx xxxxxxxxxmap is ma ', resMap)
        res.status(201).json({
            message: "Total no of lessons xxxxxxxxxxxxxxxxxxxxxxxx",
            success: true,
            body: JSON.stringify([...resMap])
        })
    } catch (e) {
        console.log(e);
        res.status(401).json({
            message: "Backend Error",
            success: false,
            body: e
        })
    }
}


exports.test = async (req, res) => {
    const sql = 'DELETE FROM salesforce.Parts_Map__c';
    try {
        const result = await query(sql);
        res.status(201).json({
            success: true,
            data: result.rows
        })
    } catch (e) {
        res.status(401).json({
            success: false
        })
    }
}