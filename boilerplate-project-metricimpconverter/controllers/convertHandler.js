function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    input = input.toLowerCase()
   // let regex = /[0-9]+.*[0-9]*/g
    let unitRegex  = /[a-z]+/g
    //console.log(input);
    let num = input.replace(unitRegex,"");
    let slashRegex = /\//g;
    if(num == ""){
      return "1";
    }
    if(num.match(slashRegex)){
      if(num.match(slashRegex).length > 1){
         return "invalid number";
      }
      else{
        num = num.split("/")
        result = parseFloat(num[0]) / parseFloat(num[1]);
      }
    }
    else{
      result = num;
    }
  
    return result;
  };
  
  this.getUnit = function(input) {
    let regex = /[a-z]+/;
    input = input.toLowerCase();
    let result = input.match(regex)[0];
    let unitArr = ["mi", "gal", "l","kg","lbs","km"];
    if(unitArr.indexOf(result) == -1){
      return "invalid unit"
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit){
      case "mi":
      result = "km";
      break;
      case "km":
      result = "mi";
      break;
      case "lbs":
      result = "kg";
      break;
      case "kg":
      result = "lbs";
      break;
      case "gal":
      result = "l";
      break;
      case "l":
      result = "gal";
      break;
      default:
      result = "";
      
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case "mi":
      result = "miles";
      break;
      case "km":
      result = "kilometers";
      break;
      case "lbs":
      result = "pounds";
      break;
      case "kg":
      result = "kilograms";
      break;
      case "gal":
      result = "gallons";
      break;
      case "l":
      result = "liters";
      break;
      default:
      result = "";
      
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    initNum = parseFloat(initNum);
    switch(initUnit){
      case "mi":
      result = initNum * miToKm;
      break;
      case "km":
      result = initNum / miToKm;
      break;
      case "lbs":
      result = initNum * lbsToKg;
      break;
      case "kg":
      result = initNum / lbsToKg;
      break;
      case "gal":
      result = initNum * galToL;
      break;
      case "l":
      result = initNum / galToL;
      break;
      default:
      result = 0;
      
    }
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
