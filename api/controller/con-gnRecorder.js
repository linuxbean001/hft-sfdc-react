const query = require('../pg-connect');

/* ****************************Add Update Recording**************************** */
exports.addUpdateRecording = (req, res, next) => {
    console.log('xxxxxx xxxxxxx xxxxxxxxxx req.body', req.body);
    
    if (req.body.id == 0) {
        const sql = 'INSERT INTO recorder (drawingid, recording) VALUES ($1, $2) RETURNING id';
        const postData = reqPostData(req.body);
        query(sql, postData)
            .then(data => {
                if (data.rows[0].id) {
                    res.status(200).json({
                        message: "Recording added successfully",
                        success: "true",
                        body: data
                    });
                }
            }).catch(err => {
                console.log('xxxxxx xxxxxxx  error ', err);

            });
    } else {
        const sql = "UPDATE recorder SET recording = " + "'" + req.body.recording + "'" + "WHERE id = " + "'" + req.body.id + "'";
        query(sql)
            .then(data => {
                console.log(data)
                if (data.rowCount == 1) {
                    res.status(200).json({
                        message: "Recording Updated successfully",
                        success: "true",
                        body: data
                    });
                }
            }).catch(err => {
                console.log('xxxxxx xxxxxxx  error ', err);

            });
    }

}

reqPostData = (body) => {
    const data = [
        body.drawingId,
        body.recording
    ];

    return data;
}

exports.getDrawingWithRecording = (req, res, next) => {
    const sql = "SELECT drawing.id as dId,drawing.title as title, recorder.id as rId, convert_from(data::bytea, 'UTF8') as img, convert_from(recording::bytea, 'UTF8') as recording FROM drawing LEFT OUTER JOIN recorder ON drawing.id = recorder.drawingid WHERE drawing.eventId = " + "'" + req.params.eventId + "'";
    query(sql)
        .then(data => {
            res.status(201).json({
                message: 'Recorder',
                success: true,
                body: data.rows
            });
        }).catch(err => {
            res.status(201).json({
                message: 'Recorder',
                success: false,
                body: {}
            });
            console.log('xxxxx xxxxxxxxx xxxxxxx err is ', err);
        });

}