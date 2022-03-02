const process = require('./process');

exports.order = function order(req, res, next) {
    // TODO implement from here
    const badRequest = {
        prices: [87.47],
        quantities: { error: 'datacenter unreachable' },
        country: 'DE',
        reduction: 'STANDARD',
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
    next();
};
