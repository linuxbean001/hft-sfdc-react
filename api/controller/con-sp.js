const query = require('../pg-connect');

exports.addSP_drawing = (req, res, next) => {
        _checkForAlready(req.userData.sfid)
            .then(data => {
                if (!data) {
                    const sql = `INSERT INTO salesforce.safe_place__c (external_id__c, safe_place_image__c,json__c) VALUES ('${req.userData.sfid}','${req.body.data}','${req.body.jsun}') RETURNING id`;
                    query(sql)
                        .then(data => {
                            console.log('xxx xxx data ', data);
                            res.status(201).json({
                                message: "Insert successfully",
                                success: true,
                                body: "insert"
                            });
                        }).catch(err => {
                            console.log("xxxxxxxxxxxxxx xxxxxxxxxxx error is " + err);
                        });
                } else {
                   
                    const sql = `UPDATE salesforce.safe_place__c SET safe_place_image__c = '${req.body.data}',json__c ='${req.body.jsun}' WHERE external_id__c = '${req.userData.sfid}'`;
                   console.log('safe place', sql);
                    query(sql)
                        .then(data => {
                            res.status(201).json({
                                message: "Updated Successfully",
                                success: true,
                                body: "hello raghav"
                            });
                        }).catch(err => {
                            console.log("xxxxx xxxxxxxxxxxxxxxxx33 " + err);
                        });
                }
            }).catch(err => {
                res.status(400).json({
                    message: 'Backend Error',
                    success: false,
                    body: err
                });
            });

}
function _checkForAlready(sfid) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from salesforce.safe_place__c WHERE external_id__c ='${sfid}' `; 
        console.log(sql);
        query(sql)
            .then(data => {
                console.log('xxx xxxx xxxxx data is ' + data.rowCount);
                if (data.rowCount != 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}
/* ***********************Event Status******************* */

exports.addSP_status = (req, res, next) => {
    if (req.userData.id == req.body.usrid) {
        _checkForAlreadyRegisteredStatus(req.userData.sfid)
            .then(data => {
                if (!data) {
                    const sql = `INSERT INTO salesforce.dashboard__c (external_id__c, create_your_safe_place__c,systemmodstamp) VALUES ('${req.userData.sfid}', ${true},'${new Date().toISOString()}') RETURNING id`;
                    query(sql)
                        .then(data => {
                            res.status(201).json({
                                message: "Insert successfully",
                                success: true,
                                body: "insert"
                            });
                        }).catch(err => {
                            console.log("xxxxxxxxxxxxxx xxxxxxxxxxx error is " + err);
                        });
                } else {
                    const sql = `UPDATE salesforce.dashboard__c SET create_your_safe_place__c = '${true}' WHERE external_id__c = '${req.userData.sfid}'`;
                    query(sql)
                        .then(data => {
                            res.status(201).json({
                                message: "Updated Successfully",
                                success: true,
                                body: "hello raghav"
                            });
                        }).catch(err => {
                            console.log("xxxxx xxxxxxxxxxxxxxxxx 22 " + err);
                        });
                }
            }).catch(err => {
                res.status(400).json({
                    message: 'Backend Error',
                    success: false,
                    body: err
                });
            });

    } else {
        res.status(401).json({
            message: "Unauthorised",
            success: false,
        });
    }

}
function _checkForAlreadyRegisteredStatus(sfid) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from salesforce.dashboard__c WHERE external_id__c ='${sfid}'`; 
        query(sql)
            .then(data => {
                console.log('xxx xxxx xxxxx data is ' + data.rowCount);
                if (data.rowCount != 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}
/* ****************************Get Drawing by id**************************** */
exports.getDrawingByEventId = (req, res, next) => {
    if (req.params.eventId) {
       const sql = `SELECT convert_from(safe_place_image__c::bytea, 'UTF8') as safe_place_image__c, convert_from(json__c::bytea, 'UTF8')as jsun, * FROM salesforce.safe_place__c WHERE external_id__c = '${req.userData.sfid}'`;
        query(sql)
            .then(data => {
                res.status(201).json({
                    message: "SAfe Place",
                    success: true,
                    body: data.rows || {}
                });
            }).catch(err => {
                console.log("xxxxx xxxxxxxxxxxxxxxxx " + err);
            });

    } else {
        res.status(401).json({
            message: "Unauthorised",
            success: false,
        });
    }
}