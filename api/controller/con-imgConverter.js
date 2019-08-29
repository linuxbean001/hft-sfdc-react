const textToPicture = require('../converter/converter');

exports.convertTextToImg = (req, res, next) => {
    const text = req.body.text;
    textToPicture.convert({
        text: text,
        size: req.body.size,
        source: {
            width: req.body.width,
            height: req.body.height
        },

    }).then(result => {
        return result.getBase64();
    }).then(str => {
        // console.log(str) // data:image/png;base64,iVBORw0KGgoA...
        res.status(201).json({
            success: true,
            message: 'Image updated',
            body: str
        });

    }).catch(err => {
        res.status(201).json({
            success: false,
            message: 'Image fail',
            body: {}
        });
        console.log(err);

    });
}