/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  let _id;
  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        let input = "The gamering";
        chai.request(server)
      .post('/api/books')
      .send({title: input})
      .end(function(err, res){
        _id = res.body._id;
        assert.equal(res.status, 200);
        console.log(res.body);
        assert.equal(res.body.title, input)
        done();
      });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
      .post('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.res.text, "missing required field title");
        done();
      });
      });
      
    });


    suite('GET /api/books => array of books', function(){      
      test('Test GET /api/books',  function(done){
        chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        let data = JSON.parse(res.res.text)
        assert.equal(res.status, 200);
        assert.isArray(data)
        done();
      });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/woohoo')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.res.text, "no book exists")
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/' + _id)
        .end(function(err, res){
          let returJson = JSON.parse(res.res.text);
          assert.equal(res.status, 200);
          console.log(res.body);
          assert.equal(returJson._id, _id)
          assert.equal(returJson.title, "The gamering");
          assert.isArray(returJson.comments);
          done();
        });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        let input = "this is the most book of all time";
        chai.request(server)
      .post('/api/books/' + _id)
      .send({comment: input})
      .end(function(err, res){
        let returJson = JSON.parse(res.res.text);
        assert.equal(returJson._id, _id)
        assert.equal(returJson.title, "The gamering");
       // assert.equal(returJson.comments, [input]);
        done();
      });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
      .post('/api/books/' + _id)
      .end(function(err, res){
        assert.equal(res.res.text, "missing required field comment")
        done();
      });
      });
      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        let input = "this is the most book of all time";
        chai.request(server)
      .post('/api/books/' + "woohoo")
      .send({comment: input})
      .end(function(err, res){
        assert.equal(res.res.text, "no books exists")
      });
        done();
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
      .delete('/api/books/' + _id)
      .end(function(err, res){
        assert.equal(res.res.text, "delete successful")
      });
        done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
      .delete('/api/books/' + "woohoo")
      .end(function(err, res){
        assert.equal(res.res.text, "no books exists")
      });
        done();
      });

    });

  });

});
