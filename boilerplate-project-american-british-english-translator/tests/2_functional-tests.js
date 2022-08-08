const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator();

suite('Functional Tests', () => {
      test("Translation with text and locale fields", function(done){
          chai.request(server)
            .post("/api/translate")
            .send({locale: "american-to-british", text: "Mangoes are my favorite fruit"})
            .end((err, res) => {
                assert.equal(translator.americanToBritish("Mangoes are my favorite fruit"), res.body.translation);
              done();
            })
      })
  test("Translation with text and invalid locale fields", function(done){
          chai.request(server)
            .post("/api/translate")
            .send({locale: "american-to-arabic", text: "Mangoes are my favorite fruit"})
            .end((err, res) => {
                assert.equal(res.body.error, "Invalid value for locale field");
              done();
            })
      })
  test("Translation with missing text field", function(done){
          chai.request(server)
            .post("/api/translate")
            .send({locale: "american-to-british"})
            .end((err, res) => {
                assert.equal(res.body.error, 'Required field(s) missing');
              done();
            })
      })
  test("Translation with missing locale fields", function(done){
          chai.request(server)
            .post("/api/translate")
            .send({text: "Mangoes are my favorite fruit"})
            .end((err, res) => {
                assert.equal(res.body.error, 'Required field(s) missing');
              done();
            })
      })
  test("Translation with empty text", function(done){
          chai.request(server)
            .post("/api/translate")
            .send({locale: "american-to-british", text: ""})
            .end((err, res) => {
                assert.equal(res.body.error, 'No text to translate');
              done();
            })
      })
  test("Translation with text that need no translation", function(done){
          chai.request(server)
            .post("/api/translate")
            .send({locale: "british-to-american", text: "Mangoes are my favorite fruit"})
            .end((err, res) => {
                assert.equal("Everything looks good to me!", res.body.translation);
              done();
            })
      })
});
