const process = require('./process');

let currentRequest;
exports.order = function order(req, res, next) {
    // TODO implement from here
    currentRequest = req.body;
    const input = req.body;
    if (
        !input.quantities ||
        !input.prices ||
        !input.country ||
        !input.reduction
    ) {
        res.statusCode = 400;
        return res.json({});
    }
    if (input.quantities.error) {
        res.statusCode = 400;
        return res.json({});
    }
    if (input.quantities.length !== input.prices.length) {
        res.statusCode = 400;
        return res.json({});
    }

    process.order(input, (err, total) => {
        if (total === null) {
            return res.json({});
        }
        res.json({ total });
    });
};

exports.feedback = function feedback(req, res, next) {
    console.info('FEEDBACK:', req.body.type, req.body.content);
    req.body.type === 'ERROR' && console.log(currentRequest);
    next();
};
