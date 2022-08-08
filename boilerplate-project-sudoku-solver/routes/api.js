'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;

      
      if(solver.validate(puzzleString, coordinate, value) == "Invalid characters in puzzle"){
          res.json({error: 'Invalid characters in puzzle'});
          return;
        }
      if(solver.validate(puzzleString, coordinate, value) == "Expected puzzle to be 81 characters long"){
        res.json({error:"Expected puzzle to be 81 characters long"});
        return;
      }
      if(solver.validate(puzzleString, coordinate, value) == "Required field(s) missing"){
        res.json({error:'Required field(s) missing'});
        return;
      }

      
      let conflict = solver.solve(puzzleString, coordinate, value);
      if(conflict == 'Invalid coordinate'){
        res.json({ error: 'Invalid coordinate'});
        return;
      }
      if(conflict == 'Invalid value'){
        res.json({ error: 'Invalid value'});
        return;
      }
      if(!conflict){
        res.json({valid: true});
      }
      else{
        res.json({valid: false, conflict: conflict});
      }
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
        let puzzleString = req.body.puzzle;
      if(!puzzleString){
        res.json({error:'Required field missing'})
        return;
      }
        if(solver.validate(puzzleString, "auto") == "Invalid characters in puzzle"){
          res.json({error: 'Invalid characters in puzzle'});
          return;
        }
      if(solver.validate(puzzleString, "auto") == "Expected puzzle to be 81 characters long"){
        res.json({error:"Expected puzzle to be 81 characters long"});
        return;
      }
      let result = solver.solve(puzzleString);
      if(!result){
        res.json({error: 'Puzzle cannot be solved'});
        return;
      }
      res.json({solution: result});
        
     });
};
