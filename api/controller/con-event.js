const query = require('../pg-connect');
const emptyImg = require('../const/empty-img');
const emptyJsun = require('../const/empty-json');
const drawingTitle = require('../const/drawing-title');

/* ****************************Add Event PostGrase**************************** */
exports.addEvent =async (req, res, next) => {

    if (req.userData.id == req.body.usrid) {
        const sql = 'INSERT INTO events (usrid, name, age_year, description, created, age_months, before_birth) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
        try{
            const reqData = _setReqData(req.body);
        const data= await query(sql, reqData);
        console.log('Waiting...',data);
                  if (data.rows[0].id) {
                    console.log('Got ID',data.rows[0].id);
                    drawingTitle.title.forEach((value1) => {
                        let value = value1;
                        console.log('xxxxxxxxx value xxxx', value);
                        
                        setTimeout( ()=>{
                            try{
                                let sql = 'INSERT INTO drawing (eventid, title, data, json) VALUES ($1, $2, $3, $4) RETURNING id';
                                query(sql, [
                                    data.rows[0].id,
                                    value,
                                    emptyImg.img,
                                    emptyJsun.jsun
                                ]);
                                console.log('xxxxxxxxx value', value);
                            }catch (error) {
                                res.status(400).json({
                                    message: 'Backend Error',
                                    success: false,
                             
                                });
                             }
                        },2000);
                       
                    });
                    
                    res.status(201).json({
                                    message: "Event add successfully",
                                    success: true,
                                    body: req.body
                                });
                }
        }catch (error) {
            res.status(400).json({
                message: 'Backend Error',
                success: false,
         
            });
         }
        
        // query(sql, reqData)
        //     .then(data => {

        //         res.status(201).json({
        //             message: "Event add successfully",
        //             success: true,
        //             body: req.body
        //         });

        //         /**
        //          * Adding drawing pages with the add of event for the drawing canvas
        //         */
        //         if (data.rows[0].id) {
        //             drawingTitle.title.forEach((value) => {
        //                 console.log('xxxxxxxxx value', value);
        //                 let sql = 'INSERT INTO drawing (eventid, title, data, json) VALUES ($1, $2, $3, $4) RETURNING id';
        //                 query(sql, [
        //                     data.rows[0].id,
        //                     value,
        //                     emptyImg.img,
        //                     emptyJsun.jsun
        //                 ]).then(resp => {
        //                     // console.log('xxxxxxx xxxxxxxxx xxxxxxxx data ', resp);
        //                 }).catch(err => {
        //                     console.log('xxxxxxx xxxxxxxxx xxxxxxxx data ', err);
        //                 });
        //             });
        //         }

        //     }).catch(err => {
        //         console.log("xxxxxxxxxxxxxx xxxxxxxxxxx error is " + err);
        //     });

    } else {
        res.status(401).json({
            message: "Unauthorised",
            success: false,
            // body: req.body
        });
    }

}

/* ****************************Get Event By Id**************************** */
exports.getEventById = (req, res, next) => {
    if (req.userData.id == req.params.id) {
        const sql = "SELECT * FROM events WHERE usrid = " + "'" + req.userData.id + "'";
        query(sql)
            .then(data => {
                res.status(201).json({
                    message: "Events",
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

/* ****************************Delete Event By Id**************************** */
exports.deleteEventById = (req, res, next) => {
    if (req.userData.id) {
        const sql = "DELETE FROM events WHERE id = " + "'" + req.params.id + "'";
        query(sql)
            .then(data => {

                if (data) {
                    let sql = "DELETE FROM drawing WHERE eventid = " + "'" + req.params.id + "'";
                    query(sql)
                        .then(resp => {
                            res.status(201).json({
                                message: "Deleted Successfully",
                                success: true,
                                body: {}
                            });
                        }).catch(error => {
                            res.status(201).json({
                                message: error,
                                success: false,
                                body: {}
                            });
                        });
                }

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

/* ****************************Edit Event**************************** */
exports.editEvent = (req, res, next) => {
    if (req.userData.id) {
        const sql = "UPDATE events SET name = " + "'" + req.body.name + "'," + " age_year = " + "'" + req.body.year + "'," + " description = " + "'" + req.body.description + "'," + "age_months = " + "'" + req.body.months + "'," + "before_birth = " + "'" + req.body.before + "'" + " WHERE id = " + "'" + req.params.id + "'";

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
/* ***********************Event Status******************* */
exports.addEventStatus = (req, res, next) => {

    if (req.userData.id == req.body.usrid) {

        _checkForAlreadyRegisteredStatus(req.userData.sfid)
            .then(data => {
                if (!data) {

                    const sql = `INSERT INTO salesforce.dashboard__c (external_id__c, add_event_to_the_timeline__c,systemmodstamp) VALUES ('${req.userData.sfid}', ${true},'${new Date().toISOString()}') RETURNING id`;

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
                    const sql = `UPDATE salesforce.dashboard__c SET add_event_to_the_timeline__c = '${true}' WHERE external_id__c = '${req.userData.sfid}'`;

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
/* ****************************Private functions**************************** */
function _setReqData(body) {
    const eventData = [
        body.usrid,
        body.name,
        body.year,
        body.description,
        new Date(),
        body.months,
        body.before
    ];
    return eventData;
}
