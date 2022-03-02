const process = require('./process');

exports.order = function order(req, res, next) {
    // TODO implement from here
    process.order(req.body, (err, total) => {
        res.json({ total });
    });
};

exports.feedback = function feedback(req, res, next) {
    console.info('FEEDBACK:', req.body.type, req.body.content);
    next();
};
