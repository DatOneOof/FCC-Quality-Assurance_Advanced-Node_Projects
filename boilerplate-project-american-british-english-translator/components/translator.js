const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')
let ameriRegex = /[0-9]*[0-9]:[0-9][0-9]/;
let britiRegex = /[0-9]*[0-9].[0-9][0-9]/;

class Translator {
    britishToAmerican(string){
      let ogStr = string;
      let bannedIndex = []
      string = string.replace(/[\.]$/, " .");
      string = string.split(" ");
      string = string.map((e, i) => {
        let nextWord = string[i + 1];
        let wordAfter = string[i + 2];
        let complexWord = e + " " + nextWord;
        let compPlusWord = (e + " " + nextWord + " " + wordAfter);
        compPlusWord = compPlusWord.toString().toLowerCase();
        let spellCheck = Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] === e);
        let titleCheck = Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] === e.toLowerCase());

         if(bannedIndex.indexOf(i) != -1){return}
        
        if(britishOnly.hasOwnProperty(compPlusWord)){
          console.log("helo");
          bannedIndex.push(i + 1, i + 2);
          let l = britishOnly[compPlusWord];
          return `<span class="highlight">${l}</span>`;
        }
        
        if(britishOnly.hasOwnProperty(complexWord)){
          bannedIndex.push(i + 1);
          let l = britishOnly[complexWord];
          return `<span class="highlight">${l}</span>`;
        }
        
        if(britishOnly.hasOwnProperty(e.toLowerCase())){
          let l = britishOnly[e.toLowerCase()];
          return `<span class="highlight">${l}</span>`;
        }
        if(britiRegex.test(e)){
          console.log(e.match(britiRegex));
          let l = e.match(britiRegex)[0].replace(".", ":");
          return  `<span class="highlight">${l}</span>`
        }

        if(spellCheck){
          let l = spellCheck;
          return  `<span class="highlight">${l}</span>`
        }
        
        if(titleCheck){
          
          let l = titleCheck.split("");
          l[0] = l[0].toUpperCase();
          l = l.join("");
          
          return  `<span class="highlight">${l}</span>`
        }
        else{
          return e
        }
        
      })
      string = string.filter((e) => e != undefined && e != "");
      string = string.join(" ");
      
      string = string.replace(/\s\.$/, ".");
      
      if(string === ogStr){
        return "Everything looks good to me!"
      }
      else{
        return string;
      }
    
  
      
    }
  
    americanToBritish(string){
      let bannedIndex = [];
      let ogStr = string;
      string = string.replace(/[\.]$/, " .");
      string = string.split(" ");
      string = string.map((e, i) => {
        let nextWord = string[i + 1];
        let wordAfter = string[i + 2];
        let complexWord = e + " " + nextWord;
        let compPlusWord = (e + " " + nextWord + " " + wordAfter);
        compPlusWord = compPlusWord.toString().toLowerCase();
        if(bannedIndex.indexOf(i) != -1){return}
        
        if(americanOnly.hasOwnProperty(compPlusWord)){
          console.log("helo");
          bannedIndex.push(i + 1, i + 2);
          let l = americanOnly[compPlusWord];
          return `<span class="highlight">${l}</span>`;
        }
        
        if(americanOnly.hasOwnProperty(complexWord)){
          bannedIndex.push(i + 1);
          let l = americanOnly[complexWord];
          return `<span class="highlight">${l}</span>`;
        }

        if(ameriRegex.test(e)){
          let l = e.match(ameriRegex)[0].replace(":", ".");
          return  `<span class="highlight">${l}</span>`
        }

        if(americanToBritishSpelling.hasOwnProperty(e)){
          let l = americanToBritishSpelling[e];
          
          return  `<span class="highlight">${l}</span>`
        }
        if(americanOnly.hasOwnProperty(e)){
          let l = americanOnly[e];
          return `<span class="highlight">${l}</span>`;
        }
        if(americanToBritishTitles.hasOwnProperty(e.toLowerCase())){
          
          console.log(americanToBritishTitles[e.toLowerCase()]);
          let l = americanToBritishTitles[e.toLowerCase()].split("");
          l[0] = l[0].toUpperCase();
          l = l.join("");
          
          return  `<span class="highlight">${l}</span>`
        }
        else{
          return e
        }
        
      })
      string = string.filter((e) => e != undefined && e != "");
      string = string.join(" ");
      string = string.replace(" .", ".");
      if(string === ogStr){
        return "Everything looks good to me!"
      }
      else{
        return string;
      }
      
    }
  //Object.keys(object).find(key => object[key] === value);
}

module.exports = Translator;