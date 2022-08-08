'use strict';
const mongodb = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let Schema = mongoose.Schema;

let issueSchema = new Schema({
  issue_title: String,
  issue_text: String,
  created_by: String,
  assigned_to: String,
  status_text: String,
  created_on: String,
  updated_on: Date,
  open: Boolean,
  projectName: String
})

let issueModel = mongoose.model("Issues", issueSchema);

module.exports = function (app) {
  

  
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let issue_title = req.query.issue_title;
      let issue_text = req.query.issue_text;
      let created_by = req.query.created_by;
      let assigned_to = req.query.assigned_to;
      let status_text = req.query.status_text;
      let created_on = req.query.created_on;
      let updated_on = req.query.updated_on;
      let open = req.query.open;
      let query = {
        projectName: project
      };

      if (issue_title) {
        query.issue_title = issue_title;
      }
      if (created_by) {
        query.created_by = created_by;
      }
      if (assigned_to) {
        query.assigned_to = assigned_to;
      }
      if (status_text) {
        query.status_text = status_text;
      }
      if (created_on) {
        query.created_on = created_on;
      }
      if (updated_on) {
        query.updated_on = updated_on;
      }
      if (issue_text) {
        query.issue_text = issue_text;
      }
      if (open) {
        query.open = open;
      }
      issueModel.find(query).exec((err, data) => {
        res.send(data);
      })
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let issue_title = req.body.issue_title || "404";
      let issue_text = req.body.issue_text || "404";
      let created_by = req.body.created_by || "404";
      let assigned_to = req.body.assigned_to || "";
      let status_text = req.body.status_text  || "";
      let requiredFields = [issue_title, issue_text, created_by];
      if(requiredFields.indexOf("404") != -1){
        res.json({error: 'required field(s) missing'})
      }
      else{
              let newIssue = new issueModel({issue_title: issue_title, issue_text: issue_text, created_by:created_by,           
              assigned_to:assigned_to, status_text: status_text ,created_on :new Date(), updated_on: new Date(), open: true, projectName: project})
              newIssue.save(function(err, data) {
              if(err){return console.error(err)}
              if(data){
                res.json(data);

              }});
            }
 
      })
    .put(function (req, res){
      let project = req.params.project;
      let issue_title = req.body.issue_title;
      let issue_text = req.body.issue_text;
      let created_by = req.body.created_by;
      let assigned_to = req.body.assigned_to;
      let status_text = req.body.status_text;
      let created_on = req.body.created_on;
      let updated_on = req.body.updated_on;
      let open = req.body.open;
      let _id = req.body._id;
      let updateDate = new Date();
      let query = {
        updated_on: updateDate
      };
      if (open != undefined) {
        query.open = open;
      }
      if (issue_title) {
        query.issue_title = issue_title;
      }
      if (created_by) {
        query.created_by = created_by;
      }
      if (assigned_to) {
        query.assigned_to = assigned_to;
      }
      if (status_text) {
        query.status_text = status_text;
      }
      if (created_on) {
        query.created_on = created_on;
      }
      if (updated_on) {
        query.updated_on = updated_on;
      }
      if (issue_text) {
        query.issue_text = issue_text;
      }
      

      
      if(_id){
           if(Object.keys(query).length == 1){
                  
                  console.log("no update query: ", query)
                  res.json({ error: 'no update field(s) sent', '_id': _id })
            }   
        else{
          issueModel.findByIdAndUpdate(_id,query).exec((err, data) => {
            if (!data){
              query._id = _id;
             // console.log("failed query error: ",err, query)
              res.json({ error: 'could not update', '_id': _id });
            }
            else{
              query._id = _id;
              let returJson = {  result: 'successfully updated', '_id': _id }
                res.json(returJson);
             }
            }
           )
        }
          } 
        
        else{
          res.json({ error: 'missing _id' })
        }
          
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      let _id = req.body._id;
      if(_id){
         issueModel.findByIdAndDelete(_id, (err , data) => {
           if(data){
             res.json({ result: 'successfully deleted', '_id': _id })
           }
           else{
             res.json({error: 'could not delete', '_id': _id })
           }
        })
      }
      else{
        res.json({ error: 'missing _id' });
      }
     
    });
    
};
