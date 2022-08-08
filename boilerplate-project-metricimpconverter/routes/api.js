'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app){
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {

      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input)
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      if(initUnit == "l"){
        initUnit = "L";
      };
      if(returnUnit == "l"){
        returnUnit = "L";
      }


    
      if(initUnit === "invalid unit" && initNum === "invalid number"){
        res.send("invalid number and unit");
      }
      else if(initUnit === "invalid unit"){
        res.send("invalid unit");
      }
      else if(initNum === "invalid number"){
        res.send("invalid number");
      }
      else{
        res.json({ initNum: parseFloat(initNum), initUnit: initUnit, returnNum: parseFloat(returnNum),returnUnit: returnUnit, string: returnString })
   
      }
    
     
   });
};
