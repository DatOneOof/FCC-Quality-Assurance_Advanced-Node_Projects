const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
   test("Whole number input", function(done){
      var input = "12kg";
      assert.equal(convertHandler.getNum(input), 12)
      done();
   })
  test("Decimal number input", function(done){
      var input = "1.2kg";
      assert.equal(convertHandler.getNum(input), 1.2)
      done();
   })
  test("fractional input", function(done){
      var input = "1/2kg";
      assert.equal(convertHandler.getNum(input), 0.5)
      done();
   })
  test("fractional input with a decimal", function(done){
      var input = "2.5/2kg";
      assert.equal(convertHandler.getNum(input), 1.25)
      done();
   })
  test("double fraction input", function(done){
      var input = "2.5//2kg";
      assert.equal(convertHandler.getNum(input), "invalid number")
      done();
   })
  test("default input", function(done){
      var input = "kg";
      assert.equal(convertHandler.getNum(input), 1)
      done();
   })
  test("unit testing", function(done){
      var input = "kg";
      assert.equal(convertHandler.getUnit(input), "kg")
     input = "lbs";
      assert.equal(convertHandler.getUnit(input), "lbs")
     input = "l";
      assert.equal(convertHandler.getUnit(input), "l")
     input = "gal";
      assert.equal(convertHandler.getUnit(input), "gal")
     input = "km";
      assert.equal(convertHandler.getUnit(input), "km")
     input = "mi";
      assert.equal(convertHandler.getUnit(input), "mi")
      done();
   })
  test("return unit testing", function(done){
      var input = "kg";
      assert.equal(convertHandler.getReturnUnit(input), "lbs")
     input = "lbs";
      assert.equal(convertHandler.getReturnUnit(input), "kg")
     input = "l";
      assert.equal(convertHandler.getReturnUnit(input), "gal")
     input = "gal";
      assert.equal(convertHandler.getReturnUnit(input), "l")
     input = "km";
      assert.equal(convertHandler.getReturnUnit(input), "mi")
     input = "mi";
      assert.equal(convertHandler.getReturnUnit(input), "km")
      done();
   })
  test("return unit testing", function(done){
      var input = "m"
      assert.equal(convertHandler.getUnit(input), "invalid unit")
      done();
   })
  test("return spelledOutUnit testing", function(done){
      var input = "kg";
      assert.equal(convertHandler.spellOutUnit(input), "kilograms")
     input = "lbs";
      assert.equal(convertHandler.spellOutUnit(input), "pounds")
     input = "l";
      assert.equal(convertHandler.spellOutUnit(input), "liters")
     input = "gal";
      assert.equal(convertHandler.spellOutUnit(input), "gallons")
     input = "km";
      assert.equal(convertHandler.spellOutUnit(input), "kilometers")
     input = "mi";
      assert.equal(convertHandler.spellOutUnit(input), "miles")
      done();
   })
  test("kg to lbs", function(done){
      var input = "kg";
      assert.equal(convertHandler.convert(1,input), 2.20462)
      done();
   })
  test("lbs to kg", function(done){
      input = "lbs";
      assert.equal(convertHandler.convert(1,input), 0.45359)
      done();
   })
  test("L to gal", function(done){
      input = "l";
      assert.equal(convertHandler.convert(1,input), 0.26417)
      done();
   })
  test("gal to L", function(done){
      input = "gal";
      assert.equal(convertHandler.convert(1,input), 3.78541)
      done();
   })
  test("km to mi", function(done){
      input = "km";
      assert.equal(convertHandler.convert(1,input), 0.62137)
      done();
   })
  test("mi to km", function(done){
      input = "mi";
      assert.equal(convertHandler.convert(1,input), 1.60934)
      done();
   })
  
  
     
});


/*input = "lbs";
      assert.equal(convertHandler.convert(1,input), 0.45359)
     input = "l";
      assert.equal(convertHandler.convert(1,input), 0.26417)
     input = "gal";
      assert.equal(convertHandler.convert(1,input), 3.78541)
     input = "km";
      assert.equal(convertHandler.convert(1,input), 0.62137)
     input = "mi";
      assert.equal(convertHandler.convert(1,input), 1.60934)*/