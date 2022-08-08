const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  let _id;
  test("Create an issue with every field", (done) => {
    let input = {issue_title: "test", issue_text: "test", created_by:"test", assigned_to:"test", status_text: "test"}
      chai
      .request(server)
      .post('/api/issues/apitest')
      .send(input)
      .end(function (err, res) {
        let resJson = JSON.parse(res.res.text);
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(resJson.issue_title, input.issue_title)
        assert.equal(resJson.issue_text, input.issue_text)
        assert.equal(resJson.created_by, input.created_by)
        assert.equal(resJson.assigned_to, input.assigned_to)
        assert.equal(resJson.status_text, input.status_text)
        done();
        });
    });
  test("Create an issue with only required fields", (done) => {
    let input = {issue_title: "test", issue_text: "test", created_by:"test"}
      chai
      .request(server)
      .post('/api/issues/apitest')
      .send(input)
      .end(function (err, res) {
        let resJson = JSON.parse(res.res.text);
        _id = resJson._id;
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(resJson.issue_title, input.issue_title)
        assert.equal(resJson.issue_text, input.issue_text)
        assert.equal(resJson.created_by, input.created_by)
        done();
        });
  });
  test("Create an issue with missing required fields", (done) => {
    let input = {issue_title: "test"}
      chai
      .request(server)
      .post('/api/issues/apitest')
      .send(input)
      .end(function (err, res) {
        let resJson = JSON.parse(res.res.text);
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(JSON.stringify(resJson), JSON.stringify({error: "required field(s) missing"}));
        done();
        });
  });
  test("View issues on a project", (done) => {
    chai.request(server)
    .get("/api/issues/apitest")
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.isArray(JSON.parse(res.res.text));
      done();
    })
  })
  test("View issues on a project with one filter", (done) => {
    chai.request(server)
    .get("/api/issues/apitest")
    .query({open: false})
    .end(function(err, res){
      let arr = JSON.parse(res.res.text)
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.isArray(arr);
      arr.forEach((e) => {
        assert.equal(e.open, false);
      })
      done();
    })
  })
  test("View issues on a project with multiple filters", (done) => {
    chai.request(server)
    .get("/api/issues/apitest")
    .query({open: false, created_by:"Alice"})
    .end(function(err, res){
      let arr = JSON.parse(res.res.text)
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.isArray(arr);
      arr.forEach((e) => {
        assert.equal(e.open, false);
        assert.equal(e.created_by, "Alice");
      })
      done();
    })
  })
  test("Update one field on an issue", (done) => {
      chai.request(server)
    .put("/api/issues/apitest")
    .send({open: false, _id: _id})
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.res.text, JSON.stringify({result: 'successfully updated', '_id': _id }))
      done();
    })
  })
  test("Update multiple fields on an issue", (done) => {
      chai.request(server)
    .put("/api/issues/apitest")
    .send({open: false,issue_title: "edited", _id: _id})
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.res.text, JSON.stringify({result: 'successfully updated', '_id': _id }))
      done();
    })
  })
  test("Update an issue with missing _id", (done) => {
      chai.request(server)
    .put("/api/issues/apitest")
    .send({open: false,issue_title: "edited"})
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.res.text, JSON.stringify({error: "missing _id"}))
      done();
    })
  })
  test("Update an issue with no fields to update", (done) => {
      chai.request(server)
    .put("/api/issues/apitest")
    .send({_id:_id})
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.res.text, JSON.stringify({error: 'no update field(s) sent', _id: _id}))
      done();
    })
  })
  test("Update an issue with an invalid _id", (done) => {
      chai.request(server)
    .put("/api/issues/apitest")
    .send({_id:"62c57161bfdbbd38b633bf8z", open:false})
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.res.text, JSON.stringify({ error: 'could not update', '_id': "62c57161bfdbbd38b633bf8z" }))
      done();
    })
  })
  test("Delete an issue:", (done) => {
      chai.request(server)
    .delete("/api/issues/apitest")
    .send({_id:_id})
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.res.text, JSON.stringify({ result: 'successfully deleted', '_id': _id }))
      done();
      
    })
  })
  test("Delete an issue with an invalid _id:", (done) => {
      chai.request(server)
    .delete("/api/issues/apitest")
    .send({_id:"62c57161bfdbbd38b633bf8z"})
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.res.text, JSON.stringify({ error: "could not delete", _id: "62c57161bfdbbd38b633bf8z" }))
      done();
      
    })
  })
  test("Delete an issue with missing _id", (done) => {
      chai.request(server)
    .delete("/api/issues/apitest")
    .send({})
    .end(function(err, res){
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.equal(res.res.text, JSON.stringify({error : "missing _id"}))
      done();
      
    })
  })
});
