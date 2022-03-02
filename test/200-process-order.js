var expect = require('chai').expect;
var process = require('../lib/process');

describe('process.order(payload, callback)', function () {
    describe('subtotal1', () => {
        it('calls back with an empty object', function (done) {
            process.order({}, function (err, result) {
                if (err) return done(err);
                expect(result).to.deep.equal(null);
                done();
            });
        });

        it('calls back with prices summed', function (done) {
            process.order(
                { prices: [10], quantities: [1], country: 'FAKE' },
                function (err, result) {
                    if (err) return done(err);
                    expect(result).to.deep.equal(10);
                    done();
                }
            );
        });

        it('calls back with prices summed2', function (done) {
            process.order(
                { prices: [10], quantities: [3], country: 'FAKE' },
                function (err, result) {
                    if (err) return done(err);
                    expect(result).to.deep.equal(10 * 3);
                    done();
                }
            );
        });

        it('calls back with prices summed3', function (done) {
            process.order(
                {
                    prices: [10, 20, 30],
                    quantities: [1, 1, 1],
                    country: 'FAKE',
                },
                function (err, result) {
                    if (err) return done(err);
                    expect(result).to.deep.equal(10 + 20 + 30);
                    done();
                }
            );
        });

        it('calls back with prices summed4', function (done) {
            process.order(
                {
                    prices: [10, 20, 30],
                    quantities: [2, 4, 1],
                    country: 'FAKE',
                },
                function (err, result) {
                    if (err) return done(err);
                    expect(result).to.deep.equal(10 * 2 + 20 * 4 + 30);
                    done();
                }
            );
        });
    });

    describe('subtotal2', () => {
        it('calls back with prices summed', function (done) {
            process.order(
                { prices: [10], quantities: [1], country: 'DE' },
                function (err, result) {
                    if (err) return done(err);
                    expect(result).to.deep.equal(10 + (10 * 20) / 100);
                    done();
                }
            );
        });

        it('calls back with prices summed2', function (done) {
            process.order(
                { prices: [10], quantities: [3], country: 'UK' },
                function (err, result) {
                    if (err) return done(err);
                    const subtotal = 10 * 3;
                    expect(result).to.deep.equal(
                        subtotal + (subtotal * 21) / 100
                    );
                    done();
                }
            );
        });

        it('calls back with prices summed3', function (done) {
            process.order(
                {
                    prices: [10, 20, 30],
                    quantities: [1, 1, 1],
                    country: 'FR',
                },
                function (err, result) {
                    if (err) return done(err);
                    const subtotal = 10 + 20 + 30;
                    expect(result).to.deep.equal(
                        subtotal + (subtotal * 20) / 100
                    );
                    done();
                }
            );
        });

        it('calls back with prices summed4', function (done) {
            process.order(
                {
                    prices: [10, 20, 30],
                    quantities: [2, 4, 1],
                    country: 'IT',
                },
                function (err, result) {
                    const subtotal = 10 * 2 + 20 * 4 + 30;
                    if (err) return done(err);
                    expect(result).to.deep.equal(
                        subtotal + (subtotal * 25) / 100
                    );
                    done();
                }
            );
        });
    });

    describe('subtotal3', () => {});
});
