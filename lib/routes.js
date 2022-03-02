const process = require('./process');

exports.order = function order(req, res, next) {
    // TODO implement from here
    const badRequest = {
        prices: [65.29, 36.79, 3.34, 30.61],
        quantities: [5, 3, 6, 4],
        country: 'HU',
    };
    const input = req.body;
    if (input.quantities.error) {
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
    console.log(req.body);
    next();
};
