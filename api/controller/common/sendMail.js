const nodemailer = require('nodemailer');

exports.sendEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'oauth2',
                user: 'admin@helpfortrauma.com',
                clientId: '545632808127-rg3q8kdsmj81lfrt1adc9gv7ubjf6e69.apps.googleusercontent.com',
                clientSecret: 'jPTIil7xYNngBHB-h0NejQhH',
                refreshToken: '1/PIbzn-YH7q2YgQRkOFn5aCrvb5neuc3eS11Do-7imto',
            },
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('xxxxxxxxxxxxx xxxxxxx error ' + error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info);
            }
        });
    });
}