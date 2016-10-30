import Ember from 'ember';

export default Ember.Controller.extend({

  numberOfLines: 4,   // The amount of lines currently displayed on screen
  textRows: 18,       // Number of Rows the Terminal Window can hold
  commandHistory:[
    {message :  "Hello, My name is Johnathan Brunelle."},
    {message :  "I am an Electrical Computer Engineering Student in my second"},
    {message :  "year at the University of Western Ontario."},
    {message :  "Enter 'help' to view the commands."}],

  init: function() {

    this.set('textBuffer', '> ');
  },

  /**
   * Ensures that text does not run off the terminal window
   * @param historyList current text displayed
   */
  checkLines: function(historyList){

    if(this.get('numberOfLines') > this.get('textRows')){

      // Shift the queue a certain amount
      let difference = this.get('numberOfLines') - this.get('textRows');

      for(var i = 0; i < difference; i++){
        this.get('commandHistory').set('commandHistory', historyList.shift());
      }

      this.set('numberOfLines', this.get('textRows'));
    }
  },

  /**
   * Process the user input, pointing it to correct function
   * and providing a response
   * @param cmnd user command
   */
  registerCommand : function(cmnd){
    var historyList = this.get("commandHistory");


    // Used for debugging
    switch(cmnd) {
      case "> clear":
            this.set('commandHistory', []);
            this.set('numberOfLines', 0);
            break;

      case "> stabilitycheck":    // Used for Debugging
        console.log("commandHistory: " + this.get('commandHistory').length);
        console.log("numberOfLines:  " + this.get('numberOfLines'));

        this.set("numberOfLines", this.get("numberOfLines") + 2);
        this.checkLines(historyList);
        historyList.pushObject({message:cmnd});
        historyList.pushObject({message:"Stability Checked! View Console!"});
        break;

      default:
        this.set("numberOfLines", this.get("numberOfLines") + 2);
        this.checkLines(historyList);
        historyList.pushObject({message:cmnd});
        historyList.pushObject({message:"jsh: " + cmnd + ": command not found"});
        break;

    }



  },

  actions: {

    /**
     * Handlees input from console command line
     * @param text User Input
     */
    inputLineHandler : function(text){
      this.registerCommand(text);
      this.set('textBuffer', '> ');
    }
  }
});
