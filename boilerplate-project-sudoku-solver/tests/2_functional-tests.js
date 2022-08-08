const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const strings = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;
chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('valid puzzle string: POST request to /api/solve', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/solve')
              .send({puzzle: e[0]})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal(e[1], returJson.solution);
           });
      })
    
     done();
  });
    test('missing puzzle string: POST request to /api/solve', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/solve')
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal('Required field missing', returJson.error);
           });
      })
    
     done();
  });
    test('invalid characters: POST request to /api/solve', function(done){
      let badInput = "..9..5.1.85.4....2432...e..1...69.83.9.....6.63.71...9......1945....4.37.4.3..6..";

      strings.forEach((e) => {
           chai.request(server)
              .post('/api/solve')
              .send({puzzle: badInput})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal('Invalid characters in puzzle', returJson.error);
           });
      })
    
     done();
  });
   test('incorrect length: POST request to /api/solve', function(done){
      let badInput = "..9..5.1.85.4....2432....1...69.83.9.....6.63.71...9......1945....4.37.4.3..6..";

      strings.forEach((e) => {
           chai.request(server)
              .post('/api/solve')
              .send({puzzle: badInput})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal('Expected puzzle to be 81 characters long', returJson.error);
           });
      })
    +
     done();
  });
  test('cannot be solved: POST request to /api/solve', function(done){
      let badInput = "..9..5.1.85.4....2432......1...69.83.9.....6.63.71...9......1945....4.37.4.3..6..";

      strings.forEach((e) => {
           chai.request(server)
              .post('/api/solve')
              .send({puzzle: badInput})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal("Puzzle cannot be solved", returJson.error);
           });
      })
    +
     done();
  });
  test('placement with all fields: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .send({coordinate: "B1",value: 8, puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.isTrue(returJson.valid);
           });
      })
    
     done();
  });
  test('placement with single placement conflict: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .send({coordinate: "A1",value: 8, puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal(JSON.stringify(["column"]), JSON.stringify(returJson.conflict));
           });
      })
    
     done();
  });
  test('placement with multiple placement conflict: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .send({coordinate: "B1",value: 2, puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal(JSON.stringify(["row","region"]), JSON.stringify(returJson.conflict));
           });
      })
    
     done();
  });
  test('placement with all placement conflict: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .send({coordinate: "A1",value: 5, puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal(JSON.stringify(["column", "row","region"]), JSON.stringify(returJson.conflict));
           });
      })
    
     done();
  });
    test('placement with all placement conflict: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal('Required field(s) missing', returJson.error);
           });
      })
    
     done();
  });
    test('placement with invalid characters: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .send({coordinate: "A1",value: 5, puzzle: "..9..5.1.85.4....2432......1...69.83.9...e.6.62.71...9......1945....4.37.4.3..6.."})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal('Invalid characters in puzzle', returJson.error);
           });
      })
    
     done();
  });
  test('placement with incorrect length: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .send({coordinate: "A1",value: 5, puzzle: "..9..5.1.85.4....2432......1...69.83.9....6.62.71...9......1945....4.37.4.3..6.."})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal('Expected puzzle to be 81 characters long', returJson.error);
           });
      })
    
     done();
  });
  test('placement with invalid placement coordinate: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .send({coordinate: "XZ1",value: 5, puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal('Invalid coordinate', returJson.error);
           });
      })
    
     done();
  });
  test('placement with incorrect length: POST request to /api/check', function(done){
      strings.forEach((e) => {
           chai.request(server)
              .post('/api/check')
              .send({coordinate: "A1",value: 53, puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
              .end(function(err, res){
              let returJson = JSON.parse(res.res.text);
              assert.equal('Invalid value', returJson.error);
           });
      })
    
     done();
  });
});

