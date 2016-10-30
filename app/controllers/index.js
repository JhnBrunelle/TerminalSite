import Ember from 'ember';

export default Ember.Controller.extend({

  numberOfLines: 4,
  textRows: 18,
  commandHistory:[
    {message :  "Hello, My name is Johnathan Brunelle"},
    {message :  "I am currently studying Electrical Computer Engineering at the"},
    {message :  "at the University of Western Ontario."},
    {message :  "Enter 'help' to view the commands"}],

  init: function() {
    this.set('textBuffer', '> ');
  },

  /*
   * Function to maintain correct number of lines
   * Always will keep this
   */
  checkLines: function(historyList){

    if(this.get('numberOfLines') > this.get('textRows')){

      // Shift a certain amount
      let difference = this.get('numberOfLines') - this.get('textRows');

      for(var i = 0; i < difference; i++){
        this.get('commandHistory').set('commandHistory', historyList.shift());
      }

      this.set('numberOfLines', this.get('textRows'));
    }
  },

  // Match the Command to a function and perform
  registerCommand : function(cmnd){
    var historyList = this.get("commandHistory");
    this.set("numberOfLines", this.get("numberOfLines") + 2);
    this.checkLines(historyList);
    historyList.pushObject({message:cmnd});
    historyList.pushObject({message:"jsh: " + cmnd + ": command not found"});

    // Used for debugging
    if(cmnd === "> stabilitycheck"){
      console.log("Command History: " + this.get("commandHistory").length);
      console.log("Number Of Lines: " + this.get("numberOfLines"));
    }

  },

  actions: {

    inputLineHandler : function(text){
      var historyList = this.get("commandHistory");
      this.registerCommand(text);
      this.set('textBuffer', '> ');
    }
  }
});
