const query = require('../pg-connect');

exports.addDialoge = async (req, res) => {

    var currentDAte = new Date().toISOString();

    if (req.userData.id == req.body.usrid) {
        const sql = `INSERT INTO salesforce.externalized_dialogue__c (name, recordtypeid, systemmodstamp) VALUES ('${req.body.title}','${req.userData.sfid}', '${currentDAte}') RETURNING id`;
        query(sql)
            .then(data => {
                console.log('xxx xxx data ', data);
                res.status(201).json({
                    message: "Insert successfully",
                    success: true,
                    body: req.body
                });

            }).catch(err => {
                console.log("xxxxxxxxxxxxxx xxxxxxxxxxx error is " + err);
            });
    }
}

exports.getDialoge = async (req, res, next) => {

    if (req.userData.sfid) {
        const sql = "SELECT * FROM salesforce.externalized_dialogue__c WHERE recordtypeid = " + "'" + req.userData.sfid + "'";
        query(sql)
            .then(data => {
                res.status(201).json({
                    message: "Chat Dialoge",
                    success: true,
                    body: data.rows
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

exports.editDialoge = async (req, res, next) => {

    if (req.userData.sfid) {
        const sql = `UPDATE salesforce.externalized_dialogue__c SET name= '${req.body.title}' WHERE id= '${req.body.id}'`;
        query(sql)
            .then(data => {
                res.status(201).json({
                    message: "Updated Successfully",
                    success: true,
                    body: {}
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

exports.deleteDialoge = async (req, res, next) => {

    if (req.userData.sfid) {
        const sql = `DELETE FROM salesforce.externalized_dialogue__c WHERE id= '${req.params.id}'`;
        query(sql)
            .then(data => {
                res.status(201).json({
                    message: "Delete Successfully",
                    success: true,
                    body: {}
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
/* ***********************Event Status******************* */
exports.addEdDialoge = (req, res, next) => {
    if (req.userData.id == req.body.usrid) {
        _checkForAlreadyRegisteredStatus(req.userData.sfid)
            .then(data => {
                if (!data) {
                    const sql = `INSERT INTO salesforce.dashboard__c (external_id__c, do_an_externalized_dialogue__c,systemmodstamp) VALUES ('${req.userData.sfid}', ${true},'${new Date().toISOString()}') RETURNING id`;
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
                    const sql = `UPDATE salesforce.dashboard__c SET do_an_externalized_dialogue__c = '${true}' WHERE external_id__c = '${req.userData.sfid}'`;
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