const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

let translator = new Translator();

suite('Unit Tests', () => {
    test("Mangoes are my favorite fruit to British English", function(done){
          let input = "Mangoes are my favorite fruit";
          assert.equal(translator.americanToBritish(input),'Mangoes are my <span class="highlight">favourite</span> fruit');
      done();
    })
  test("I ate yogurt for breakfast. to British English", function(done){
          let input = "I ate yogurt for breakfast";
          assert.equal(translator.americanToBritish(input),'I ate <span class="highlight">yoghurt</span> for breakfast');
      done();
    })
  test("We had a party at my friend's condo. to British English", function(done){
          let input = "We had a party at my friend's condo";
          assert.equal(translator.americanToBritish(input),`We had a party at my friend's <span class="highlight">flat</span>`);
      done();
    })
  test("Can you toss this in the trashcan for me? to British English", function(done){
          let input = "Can you toss this in the trashcan for me?";
          assert.equal(translator.americanToBritish(input),'Can you toss this in the <span class="highlight">bin</span> for me?');
done();
      
    })
  test("The parking lot was full. to British English", function(done){
          let input = "The parking lot was full.";
          assert.equal(translator.americanToBritish(input),
                       'The <span class="highlight">car park</span> was full.');
done();
      
    })
  test("Like a high tech Rube Goldberg machine. to British English", function(done){
          let input = "Like a high tech Rube Goldberg machine.";
          assert.equal(translator.americanToBritish(input),'Like a high tech <span class="highlight">Heath Robinson device</span>.');
      done();
    })
  test("To play hooky means to skip class or work. to British English", function(done){
          let input = "To play hooky means to skip class or work.";
          assert.equal(translator.americanToBritish(input),'To <span class="highlight">bunk off</span> means to skip class or work.');
      done();
    })
  test("No Mr. Bond, I expect you to die. to British English", function(done){
          let input = "No Mr. Bond, I expect you to die.";
          assert.equal(translator.americanToBritish(input),'No <span class="highlight">Mr</span> Bond, I expect you to die.');
      done();
    })
  test("Dr. Grosh will see you now. to British English", function(done){
          let input = "Dr. Grosh will see you now.";
          assert.equal(translator.americanToBritish(input),'<span class="highlight">Dr</span> Grosh will see you now.');
      done();
    })
  test("Lunch is at 12:15 today. to British English", function(done){
          let input = "Lunch is at 12:15 today.";
          assert.equal(translator.americanToBritish(input),'Lunch is at <span class="highlight">12.15</span> today.');
      done();
    })
  test("We watched the footie match for a while. to American English", function(done){
          let input = "We watched the footie match for a while.";
          assert.equal(translator.britishToAmerican(input),'We watched the <span class="highlight">soccer</span> match for a while.');
      done();
    })
  test("Paracetamol takes up to an hour to work. to American English", function(done){
          let input = "Paracetamol takes up to an hour to work.";
          assert.equal(translator.britishToAmerican(input),'<span class="highlight">Tylenol</span> takes up to an hour to work.');
      done();
    })
  test("First, caramelise the onions. to American English", function(done){
          let input = "First, caramelise the onions.";
          assert.equal(translator.britishToAmerican(input),'First, <span class="highlight">caramelize</span> the onions.');
      done();
    })
  test("I spent the bank holiday at the funfair. to American English", function(done){
          let input = "I spent the bank holiday at the funfair.";
          assert.equal(translator.britishToAmerican(input),'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.');
      done();
    })
  test("I had a bicky then went to the chippy. to American English", function(done){
          let input = "I had a bicky then went to the chippy.";
          assert.equal(translator.britishToAmerican(input),'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
      done();
    })
  test(`I've just got bits and bobs in my bum bag. to American English
`, function(done){
          let input = "I've just got bits and bobs in my bum bag.";
          assert.equal(translator.britishToAmerican(input),`I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`);
      done();
    })
  test("The car boot sale at Boxted Airfield was called off. to American English", function(done){
          let input = "The car boot sale at Boxted Airfield was called off.";
          assert.equal(translator.britishToAmerican(input),'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.');
      done();
    })
  test("Have you met Mrs Kalyani? to American English", function(done){
          let input = "Have you met Mrs Kalyani?";
          assert.equal(translator.britishToAmerican(input),'Have you met <span class="highlight">Mrs.</span> Kalyani?');
      done();
    })
  test("Prof Joyner of King's College, London. to American English", function(done){
          let input = "Prof Joyner of King's College, London.";
          assert.equal(translator.britishToAmerican(input),`<span class="highlight">Prof.</span> Joyner of King's College, London.`);
      done();
    })
  test("Tea time is usually around 4 or 4.30. to American English", function(done){
          let input = "Tea time is usually around 4 or 4.30.";
          assert.equal(translator.britishToAmerican(input),'Tea time is usually around 4 or <span class="highlight">4:30</span>.');
      done();
    })
  test("Mangoes are my favorite fruit to British English", function(done){
          let input = "Mangoes are my favorite fruit";
          assert.equal(translator.americanToBritish(input),'Mangoes are my <span class="highlight">favourite</span> fruit');
      done();
    })
  test("Mangoes are my favorite fruit to British English", function(done){
          let input = "Mangoes are my favorite fruit";
          assert.equal(translator.americanToBritish(input),'Mangoes are my <span class="highlight">favourite</span> fruit');
      done();
    })
  test("Mangoes are my favorite fruit to British English", function(done){
          let input = "Mangoes are my favorite fruit";
          assert.equal(translator.americanToBritish(input),'Mangoes are my <span class="highlight">favourite</span> fruit');
      done();
    })
  test("Mangoes are my favorite fruit to British English", function(done){
          let input = "Mangoes are my favorite fruit";
          assert.equal(translator.americanToBritish(input),'Mangoes are my <span class="highlight">favourite</span> fruit');
done();
    })
});
