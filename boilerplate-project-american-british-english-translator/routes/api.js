'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  
  
  app.route('/api/translate')
    .post((req, res) => {
        console.log(req.body);
        let locale = req.body.locale;
        let text = req.body.text
      
        if(text == ""){
          res.json({ error: 'No text to translate'});
          return;
        }
        if(!text || !locale){
          res.json({ error: 'Required field(s) missing' });
          return;
        }
        if(locale == "american-to-british"){
            let translation = translator.americanToBritish(text);
          res.json({text: text ,translation: translation});
          return;
       }
      if(locale == "british-to-american"){
        let translation = translator.britishToAmerican(text);
          res.json({text: text ,translation: translation});
          return;
      }
      
      else{
        res.json({error: "Invalid value for locale field"})
        return;
      }
        
    });
};
