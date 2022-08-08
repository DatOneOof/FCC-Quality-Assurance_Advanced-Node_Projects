const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const testStrings = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;
let solver = new Solver();

let input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

let badInput = "..9..5.1.85.4....2432......1...69.83.9.....6.63.71...9......1945....4.37.4.3..6..";

let grid = input.match(/.{1,9}/g);
    grid = grid.map(e => e.split("").map(n => parseInt(n)));

suite('UnitTests', () => {
    test("valid puzzle string of 81 characters", function(){
      testStrings.forEach((e) => {assert.equal(solver.validate(e[0],"auto"), "good")});
    })
    test("puzzle string with invalid characters (not 1-9 or .)", function(){
      assert.equal(solver.validate("..9..5.1.85.4..e.2432...@..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "auto"),"Invalid characters in puzzle");
    })
  test("puzzle string that is not 81 characters in length", function(){
      assert.equal(solver.validate("..9..5.1.85...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "auto"),"Expected puzzle to be 81 characters long");
    })
  test("valid row placement", function(){
      assert.isTrue(solver.checkRowPlacement(grid,0,0,6));
    })
  test("invalid row placement", function(){
      assert.isFalse(solver.checkRowPlacement(grid,0,0,9));
    })
  test("valid column placement", function(){
      assert.isTrue(solver.checkColPlacement(grid,0,0,9));
    })
  test("invalid column placement", function(){
      assert.isFalse(solver.checkColPlacement(grid,0,0,1));
    })
  test("valid region placement", function(){
      assert.isTrue(solver.checkRegionPlacement(grid,0,0,1));
    })
  test("invalid region placement", function(){
      assert.isFalse(solver.checkRegionPlacement(grid,0,0,2));
    })
  test("valid puzzle string pass solver", function(){
      assert.equal(solver.solve(input), "769235418851496372432178956174569283395842761628713549283657194516924837947381625");
    })
  test("invalid puzzle string fails solver", function(){
      assert.isFalse(solver.solve(badInput));
    })
  test("solver returns expected solution for incomplete puzzle", function(){
      testStrings.forEach((e) => {assert.equal(solver.solve(e[0]), e[1])});
    })
});
