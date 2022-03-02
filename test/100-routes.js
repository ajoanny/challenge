var sinon = require('sinon');
var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var supertest = require('supertest');
var Server = require('../server');
var routes = require('../lib/routes');

describe('POST /order', function () {
    var $routes;
    // beforeEach(function () {
    //     sinon.spy(routes, 'order');
    // });
    // afterEach(function () {
    //     routes.order.restore();
    // });

    var supertest = startServer();

    it('calls routes.order(req, res, next) with parsed body', function (done) {
        supertest()
            .post('/order')
            .send({
                prices: [16.54, 13.11],
                quantities: [7, 3],
                country: 'UK',
                reduction: 'PAY THE PRICE',
            })
            .end(function (err, result) {
                if (err) return done(err);
                expect(result.body.total).to.equal(187.68310000000002);
                done();
            });
    });
});

describe('POST /feedback', function () {
    var $routes;
    beforeEach(function () {
        sinon.spy(routes, 'feedback');
    });
    afterEach(function () {
        routes.feedback.restore();
    });

    var supertest = startServer();

    it('calls routes.feedback(req, res, next) with parsed body', function (done) {
        supertest()
            .post('/feedback')
            .send({ my: 'feedback' })
            .end(function (err) {
                if (err) return done(err);
                expect(routes.feedback).to.have.been.calledWith(
                    sinon.match({ body: { my: 'feedback' } })
                );
                done();
            });
    });
});

function startServer() {
    beforeEach(function () {
        previousPort = process.env.PORT;
        process.env.PORT = 21345;
    });
    afterEach(function () {
        process.env.PORT = previousPort;
    });

    beforeEach(function (done) {
        server = new Server();
        server.start(done);
    });

    afterEach(function (done) {
        server.stop(done);
    });

    return function () {
        return supertest('http://localhost:21345');
    };
}
