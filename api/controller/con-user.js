const Register = require('../model/user-info.vo');
const fs = require('fs');
const query = require('../pg-connect');

/* ****************************Delete User by Id**************************** */
exports.deleteUser = (req, res, next) => {
    console.log("xxxxxxxxxxxxxxxxxxx xxxxxxxx delete init " + req.params.id);
    if (req.userData.id && req.params.id == req.userData.id) {
        const sqlUser = "DELETE FROM users WHERE id = " + "'" + req.params.id + "'";
        const sqlAccess = "DELETE FROM access WHERE email = " + "'" + req.userData.email + "'";
        query(sqlUser)
            .then(data => {
                console.log(data);
                query(sqlAccess)
                    .then(result => {
                        res.status(201).json({
                            message: "User deleted successfully",
                            success: true,
                            body: {}
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(201).json({
                            message: "Unauthorised",
                            success: false,
                        });
                    });
            }).catch(err => {

            })
    } else {
        console.log(err);
        res.status(201).json({
            message: "Unauthorised",
            success: false,
        });
    }
}

/* ****************************Get User by Id**************************** */
exports.getUserById = (req, res, next) => {
    console.log("xxxxxxxxxxxxxxxxxxx xxxxxxxx get init " + req.params._id);
    Register.findOne({ _id: req.params._id })
        .then(data => {
            if (!data || !req.userData._id || data._id != req.userData._id) {
                return res.status(404).send({
                    message: "Unauthorized",
                    success: false
                });
            } else {
                res.status(201).json({
                    message: "User got successfully",
                    success: true,
                    body: data
                })
            }
        }).catch(err => {
            console.log("xxxxxxxx xxxxxxx xxxxx error is " + err);
        });
}

/* ****************************Upload User Image**************************** */
exports.uploadUserImage = (req, res, next) => {
    res.send({
        message: 'uploaded succesfully',
        success: false,
        body: {}
    });
}

/* ****************************Download User Image**************************** */
exports.downloadUserImage = (req, res, next) => {
    const path = 'storage/uploads/user-images/';
    let message; let success; let body;
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            if (file == req.userData._id + '.jpeg') {
                message = "successful";
                body = file;
                success = true;

            } else {
                message = "Not found";
                body = {};
                success = false;
            }
        });
        res.status(201).json({
            message: message,
            success: success,
            body: body
        });
    });

}

/* ****************************Private functions**************************** */
