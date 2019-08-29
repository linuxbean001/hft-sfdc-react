const query = require('../pg-connect');

exports.addPartsMap = async (req, res) => {
    try {
        const isPmExists = await checkIfPmExistes(req);
        let sql = 'INSERT INTO salesforce.parts_map__c (name, image__c, Subscriber__c) VALUES ($1, $2, $3)RETURNING id';
        let data = setPartsMapArr(req);
        if (isPmExists) {
            sql = `UPDATE salesforce.parts_map__c SET image__c = '${req.body.pmImage}' WHERE Subscriber__c = '${req.userData.sfid}'`;
            data = [];
        }
        try {
            const result = await query(sql, data);
            res.status(200).json({
                message: "Parts Map Added Successfully",
                success: true,
                body: result.rows
            });
        } catch (err) {
            res.status(401).json({
                message: "Backend Error",
                success: false,
                body: err
            });
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: "Backend Error",
            success: false,
            body: err
        });
    }

}

exports.getUsrPm = async (req, res) => {
    const sql = `SELECT * FROM salesforce.parts_map__c WHERE Subscriber__c = '${req.userData.sfid}'`;
    try {
        const result = await query(sql);
        res.status(200).json({
            message: "Parts Map",
            success: true,
            body: result.rows
        });
    } catch (err) {
        res.status(401).json({
            message: "Backend Error",
            success: false,
            body: err
        });
    }
}

setPartsMapArr = (req) => {
    return [
        req.body.name,
        req.body.pmImage,
        req.userData.sfid
    ];
}

checkIfPmExistes = (req) => {
    return new Promise(async (resolve, reject) => {
        const sql = `SELECT * FROM salesforce.parts_map__c WHERE Subscriber__c = '${req.userData.sfid}'`;
        try {
            const result = await query(sql);
            if (result.rowCount == 0) {
                resolve(false);
            }
            resolve(true);
        } catch (err) {
            reject(err);
        }

    })
}
/* ***********************Parts Map Status******************* */
exports.addPartsMapStatus = (req, res, next) => {

    if (req.userData.id == req.body.usrid) {

        _checkForAlreadyRegisteredStatus(req.userData.sfid)
            .then(data => {
                if (!data) {
                    const sql = `INSERT INTO salesforce.dashboard__c (external_id__c, create_a_parts_map__c,systemmodstamp) VALUES ('${req.userData.sfid}', ${true},'${new Date().toISOString()}') RETURNING id`;

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
                    const sql = `UPDATE salesforce.dashboard__c SET create_a_parts_map__c = '${true}' WHERE external_id__c = '${req.userData.sfid}'`;

                    query(sql)
                        .then(data => {
                            res.status(201).json({
                                message: "Updated Successfully",
                                success: true,
                                body: "hello raghav"
                            });
                        }).catch(err => {
                            console.log("xxxxx xxxxxxxxxxxxxxxxx " + err);
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
/* ***********************Grounding Status******************* */
exports.addGroundingStatus = (req, res, next) => {

    if (req.userData.id == req.body.usrid) {

        _checkForAlreadyRegisteredStatus(req.userData.sfid)
            .then(data => {
                if (!data) {
                    const sql = `INSERT INTO salesforce.dashboard__c (external_id__c, learn_about_grounding_and_practice__c,systemmodstamp) VALUES ('${req.userData.sfid}', ${true},'${new Date().toISOString()}') RETURNING id`;

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
                    const sql = `UPDATE salesforce.dashboard__c SET learn_about_grounding_and_practice__c = '${true}' WHERE external_id__c = '${req.userData.sfid}'`;

                    query(sql)
                        .then(data => {
                            res.status(201).json({
                                message: "Updated Successfully",
                                success: true,
                                body: "hello raghav"
                            });
                        }).catch(err => {
                            console.log("xxxxx xxxxxxxxxxxxxxxxx " + err);
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
            // body: req.body
        });
    }

}
function _checkForAlreadyRegisteredStatus(sfid) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from salesforce.dashboard__c WHERE external_id__c ='${sfid}' `;
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