const query = require('../pg-connect');
const sendMail = require('./common/sendMail');

/* ****************************Get Assesment**************************** */
exports.getAssessment = (req, res, next) => {
  
    const sql = "SELECT * FROM salesforce.Assessments__c WHERE assesment_type__c = " + "'" + req.params.assType + "'";
    query(sql)
        .then(data => {
           
            res.status(200).json({
                message: 'User Assessment',
                success: true,
                body: data.rows
            });

        }).catch(err => {
            res.status(404).json({
                message: 'Backend Error',
                success: false,
                body: err
            });
        });
}

/* ****************************Save User Assesment**************************** */
exports.saveAssResult = (req, res, next) => {
    const sql = "INSERT INTO salesforce.Subscriber_Assessment__c (Subscriber__c, Assessments__c, Name, Assesment_Type__c, Question_1__c, Question_2__c, Question_3__c, Question_4__c, Question_5__c, Question_6__c, Question_7__c, Question_8__c, Question_9__c, Question_10__c, Question_11__c, Question_12__c, Question_13__c, Question_14__c, Question_15__c, Question_16__c, Question_17__c, Question_18__c, Question_19__c, Question_20__c, Question_21__c, Question_22__c, Question_23__c, Question_24__c,Question_25__c, Question_26__c, Question_27__c, Question_28__c, Question_29__c, Question_30__c,Question_31__c, Question_32__c, Question_33__c, Question_34__c, Question_35__c, Question_36__c,Question_37__c, Question_38__c, Question_39__c, Question_40__c, Question_41__c, Question_42__c, Question_43__c, Question_44__c, Question_45__c) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49) RETURNING id";

    const dataArr = _setDataArr(req);

    query(sql, dataArr)
        .then(data => {
           
            res.status(200).json({
                message: 'User Assessment Saved Successfully',
                success: true,
                body: data.rows
            });

        }).catch(err => {
            console.log('xxxxxxx xxxxxxx xxxxxxxx err ', err);
            res.status(404).json({
                message: 'Backend Error',
                success: false,
                body: err
            });
        });

}

/* ****************************Request Assesment**************************** */
exports.requestAssesment = (req, res, next) => {
    let clientEmail = req.body.clientEmail;
    let assType = req.body.assType;
    let mailOptions = {
        from: 'admin@helpfortrauma.com',
        to: clientEmail,
        subject: 'Assessment Request',
        text: req.userData.fName + ' has requested that you take the assessment ' + assType + ' on HelpForTrauma.com. Please click the link to resgister and take the assessment.'
    };

    sendMail.sendEmail(mailOptions)
        .then(info => {
            res.status(200).json({
                message: "Email set successfully",
                success: true,
                body: info
            });
        }).catch(er => {
            res.status(401).json({
                message: "Backend Error",
                success: false,
                body: er
            });
        });
}

/* ****************************Get User Assessment Result**************************** */
exports.getUsrAssResult = (req, res, next) => { 
  
    const usrId = req.userData.sfid;
    const sql = "SELECT * FROM salesforce.Subscriber_Assessment__c WHERE Subscriber__c = " + "'" + usrId + "' ORDER BY CreatedDate ASC";
  
    // const sql = "DELETE FROM salesforce.Subscriber_Assessment__c";

    query(sql)
        .then(data => {
          
            let usrAnsMap = new Map();
            let trsArr = []; let sclArr = []; let desArr = []; let drsArr = []; let aceArr = [];
            data.rows.forEach(val => {
                switch (val.assesment_type__c) {
                    case 'TRS':
                        trsArr.push(val);
                        break;
                    case 'SCL-45':
                        sclArr.push(val);
                        break;
                    case 'DES-II':
                        desArr.push(val);
                        break;
                    case 'DRS':
                        drsArr.push(val);
                        break;
                    case 'ACE':
                        aceArr.push(val);
                        break;
                }
            });
            usrAnsMap.set('TRS', trsArr);
            usrAnsMap.set('SCL-45', sclArr);
            usrAnsMap.set('DES-II', desArr);
            usrAnsMap.set('DRS', drsArr);
            usrAnsMap.set('ACE', aceArr);
           
            res.status(200).json({
                message: 'User Assessment',
                success: true,
                body: JSON.stringify([...usrAnsMap])
            });

        }).catch(err => {
            res.status(404).json({
                message: 'Backend Error',
                success: false,
                body: err
            });
        });
}

exports.getUsrAssResultHome = (req, res, next) => { 
    const usrId = req.userData.sfid;
    const sql = `SELECT * FROM salesforce.Subscriber_Assessment__c WHERE subscriber__c = '${usrId}' ORDER BY Id ASC`;
  
    query(sql)
        .then(data => {
           
            res.status(200).json({
                message: 'all registerd users',
                success: true,
                body: data.rows ||{}
            });

        }).catch(err => {
            console.log(err);
        });

}

exports.getUsrAssResultStatus = (req, res, next) => { 
    const usrId = req.userData.sfid;
    console.log('xxxxxxxxxxxxx xxxxxxxxxxx get all init', usrId);
    const sql = `SELECT * FROM salesforce.dashboard__c WHERE external_id__c = '${usrId}'`;
   // const sql = `DELETE FROM salesforce.dashboard__c`;
    console.log('xxxxxx xxxxxxx xxxxxxxx ', sql);

    query(sql)
        .then(data => {
           
            res.status(200).json({
                message: 'all registerd users status',
                success: true,
                body: data.rows || {}

            });

        }).catch(err => {
            console.log(err);
        });

}
/* *************************** Check If User is allowed for Assessment ************** */
exports.checkIfUsrAllowedForAss = (req, res, next) => {
    let usrId = req.userData.sfid;
    let assType = req.params.ass;
    let assDate = new Date().toISOString().slice(0, 10);
    // const sql = "SELECT * FROM salesforce.Subscriber_Assessment__c WHERE Subscriber__c = " + "'" + usrId + "' AND Assesment_Type__c = " + "'" + assType + "' AND CreatedDate ::date  = " + "'" + assDate + "'";

    const sql = getQueryCheckIfUsrAllowedForAss(assType, usrId, assDate);

    query(sql)
        .then(data => {
           
            if (data.rowCount > 0) {
                res.status(200).json({
                    message: 'Assessment not allowed because assessment already taken',
                    success: true,
                    body: false
                });
            } else {
                res.status(200).json({
                    message: 'Assessment allowed',
                    success: true,
                    body: true
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(404).json({
                message: 'Backend Error',
                success: false,
                body: err
            });
        });
}

/* ****************************Functions**************************** */
function _setDataArr(req) {
    let ansMap = new Map(JSON.parse(req.body.ansMap));
    let keys = [...ansMap.keys()];
    let ans = [];
    keys.forEach((val, index) => {
        ans.push(ansMap.get(val).ans);
    });

    let finalArr = [
        req.userData.sfid,
        req.body.assId,
        req.body.assName,
        req.body.assType,
        ...ans
    ];

    let temp = [];
    for (let i = 1; i <= 49 - finalArr.length; i++) {
        temp.push(null);
    }

    return [...finalArr, ...temp];
}

/** Get Query for check if user is allowed for assessment or not
 *  Fetch according to the type of Assessment
 */
function getQueryCheckIfUsrAllowedForAss(assType, usrId, assDate) {
    let sql;
    switch (assType) {
        case 'ACE':
            sql = "SELECT * FROM salesforce.Subscriber_Assessment__c WHERE Subscriber__c = " + "'" + usrId + "' AND Assesment_Type__c = " + "'" + assType + "'";
            break;
        case 'TRS':
            sql = "SELECT * FROM salesforce.Subscriber_Assessment__c WHERE createddate > current_date - interval '7' day AND Subscriber__c = " + "'" + usrId + "' AND Assesment_Type__c = " + "'" + assType + "'";
            break;

        default:
            sql = "SELECT * FROM salesforce.Subscriber_Assessment__c WHERE Subscriber__c = " + "'" + usrId + "' AND Assesment_Type__c = " + "'" + assType + "' AND CreatedDate ::date  = " + "'" + assDate + "'";

    }

    return sql;
}