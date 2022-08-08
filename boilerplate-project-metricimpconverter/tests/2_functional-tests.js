const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('10L', function (done) {
    input = "10L";
    chai
      .request(server)
      .get('/api/convert')
      .query({input: input})
      .end(function (err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.body.initNum, 10);
         assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 2.64172);
       
        assert.equal(res.body.returnUnit, "gal");
         assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
        done();
        });
    });

    test('32g', function (done) {
    input = "32g";
    chai
      .request(server)
      .get('/api/convert')
      .query({input: input})
      .end(function (err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.text, "invalid unit")
        done();
        });
    });
  
    test("3/7.2/4kg", function (done) {
    input = "3/7.2/4kg";
    chai
      .request(server)
      .get('/api/convert')
      .query({input: input})
      .end(function (err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.text, "invalid number");
        done();
        });
    });
    test('3/7.2/4kilomegagram', function (done) {
    input = "3/7.2/4kilomegagram";
    chai
      .request(server)
      .get('/api/convert')
      .query({input: input})
      .end(function (err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.text, "invalid number and unit")
        done();
        });
    });
  
    test('kg', function (done) {
    input = "kg";
    chai
      .request(server)
      .get('/api/convert')
      .query({input: input})
      .end(function (err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.body.initNum, 1);
         assert.equal(res.body.initUnit, "kg");
        assert.equal(res.body.returnNum, 2.20462);
       
        assert.equal(res.body.returnUnit, "lbs");
         assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
        done();
        });
    });
  
});

