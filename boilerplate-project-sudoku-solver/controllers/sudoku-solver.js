class SudokuSolver {

  validate(puzzleString, coordinate, value){
    let regex = /([0-9|\.]{81})/
    if(coordinate != "auto")
    {
      if(!coordinate || !value || !puzzleString){return 'Required field(s) missing'}
    }
    if(puzzleString.length != 81){
      return "Expected puzzle to be 81 characters long";
    }
    if(!regex.test(puzzleString)){return "Invalid characters in puzzle"}
    else{return "good"}
    
  }

  checkRowPlacement(grid, row, column, value) {
        if(grid[row].indexOf(value) != -1 && grid[row].indexOf(value) != column){
          return false;
        }
        return true;
  }

  checkColPlacement(grid, row, column, value) {
      for(let i = 0; i < 9; i++){
        if(grid[i][column] == value && grid[i][column] != grid[row][column]){
          return false;
        }
      }
    return true;
  }

  checkRegionPlacement(grid, row, column, value) {
        let startRow = Math.floor(row/3) * 3;
        let startColumn = Math.floor(column/3) * 3;

        for(let i = 0; i < 3; i++){
          for(let j = 0; j < 3; j++){
            if(grid[startRow + i][startColumn + j] == value && ((startRow + i) !=row) && ((startColumn + j) != column)){
                return false;
            }
          }
        }
      return true;
  }

  recursive(grid, startRow, startColumn) {


    
    for(let i = startRow; i < 9; i++){
        for(let j = startColumn; j < 9; j++){
          if(grid[i][j] != 0){continue;}
          let currI = i;
          let currJ = j;
          let finalDigit = false;
          let returRecur;
          for(let n = 1; n <= 9; n++){
         // console.log({row: i, column: j, value: n})
            
            if(this.checkColPlacement(grid, i, j, n) &&           
              this.checkRowPlacement(grid, i, j, n) &&     
              this.checkRegionPlacement(grid, i, j, n)){
              grid[i][j] = n;
              if(grid[i].indexOf(0) == -1){
                if(i != 8){
                  finalDigit = true;
                   returRecur = this.recursive(grid, i + 1, 0)

                }
                else{
                      let gridString = grid.flat().join("");
                      console.log(gridString);
                      return gridString;
                }
              }
              
              if(!finalDigit){returRecur = this.recursive(grid, i, j)}
              if(returRecur){return returRecur}
              
            }
          }
           
            grid[i][j] = 0;
            return false;
          
          
          
        }
      }

  }

  solve(puzzleString, coordinates, value){
    if(value){
      value = parseInt(value);
    }
    
    while(puzzleString.split("").indexOf(".") != -1){
      puzzleString = puzzleString.replace(".", "0");
    }  
    let grid = puzzleString.match(/.{1,9}/g);
    grid = grid.map(e => e.split("").map(n => parseInt(n)));
    if(coordinates){
       let row = this.convertToIndex(coordinates).row;
       let column = this.convertToIndex(coordinates).column;
      if(row == "none" ||column > 8 ||column < 0){return 'Invalid coordinate'}
      if(value < 1 ||value > 9 || !value){return 'Invalid value'}
       let colCheck = this.checkColPlacement(grid, row, column, value);
       let rowCheck = this.checkRowPlacement(grid, row, column, value);
       let regionCheck = this.checkRegionPlacement(grid, row, column, value);
      if(colCheck && rowCheck && regionCheck){
        return false
      }
      if(!colCheck && !rowCheck && !regionCheck){
        return ["column", "row", "region"];
      }
      if(!colCheck && rowCheck && !regionCheck){
        return ["column", "region"];
      }
      if(colCheck && !rowCheck && !regionCheck){
        return ["row", "region"];
      }
      if(!colCheck && !rowCheck && regionCheck){
        return ["column", "row"];
      }  
      if(!colCheck && rowCheck && regionCheck){
        console.log(regionCheck)
        return ["column"];
      }
      if(colCheck && !rowCheck && regionCheck){
        return ["row"];
      }
      if(colCheck && rowCheck && !regionCheck){
        return ["region"];
      }
      
      
      
      
    }
    else{
      return this.recursive(grid, 0, 0);
    }
    
  }

   convertToIndex(caseString){
     let numRegex = /[0-9]+/g
     let charRegex = /^([A-Z])+/g
     if(!charRegex.test(caseString) || !numRegex.test(caseString)){return {row:"none", column: 0}}
    let row = caseString.match(charRegex)[0];
    let column = parseInt(caseString.match(numRegex)[0]) - 1;
    switch(row){
      case "A":
        row = 0;
        break;
      case "B":
        row = 1;
        break;
      case "C":
        row = 2;
        break;
      case "D":
        row = 3;
        break;
      case "E":
        row = 4;
        break;
      case "F":
        row = 5;
        break;
      case "G":
        row = 6;
        break;
      case "H":
        row = 7;
        break;
      case "I":
        row = 8;
        break;
      default:
        row = "none";
        break;
    }
    
    return {row: row, column: column};

  }
}

module.exports = SudokuSolver;

