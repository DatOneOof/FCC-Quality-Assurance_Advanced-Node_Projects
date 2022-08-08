/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {
  const mongoose = require("mongoose");

  mongoose.connect(process.env.DB, { useNewUrlParser: true,             
  useUnifiedTopology: true });
  let Schema = mongoose.Schema;
  let bookSchema = new Schema ({
    title: String,
    comments: Array
  });
  
  let bookModel = mongoose.model("Books", bookSchema);
  
  app.route('/api/books')
    .get(function (req, res){
      bookModel.find({}, (err, data) => {
        let newData = data.map((e) => {return {title: e.title, _id: e._id, commentcount: e.comments.length}})
        res.send(newData);
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      let newBook = new bookModel({title: title, comments: []});
      if(!title){
        res.send("missing required field title");
      }
      else{
        newBook.save((err, data) => {
          if(err){console.log(err)}
          res.json({_id: data._id, title: data.title})
        })
      }
      
    })
    
    .delete(function(req, res){
      bookModel.remove({}, (err) => {
        res.send("complete delete successful");
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      bookModel.findById(bookid, function(err,data){
        if(data){
           res.json({_id: data.id, title: data.title, comments: data.comments})
        }
         else{
           res.send("no book exists");
         }
      })
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      console.log(comment);
      if(!comment){
        res.send("missing required field comment");
      }
      else{
        bookModel.findByIdAndUpdate(bookid, {$push: {comments: comment}}, { new: true }, (err, data) => {
          if(data){
            res.json({_id: data.id, title: data.title, comments: data.comments});
          }
          else{
            res.send("no book exists");
          }
          
        })
      }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      if(!bookid){
        res.send("missing id");
      }
      else{
        bookModel.findByIdAndDelete(bookid, (err, data) => {
           if(data){
             console.log(data);
             res.send("delete successful")
           }
          else{
            res.send("no book exists")
          }
        })
      }
    });
  
};
