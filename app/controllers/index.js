import Ember from 'ember';

export default Ember.Controller.extend({

  numberOfLines: 4,
  commandHistory:[
    {message : "Hello, My name is Johnathan Brunelle, and welcome to my site."},
    {message :  "I am currently studying Electrical Computer Engineering at the"},
    {message :  "at the university of Western Ontario. Enter command 'help' to"},
    {message :  "view commands"}],

  init: function() {

  },

  // Only maintains 15 history items at a time
  shiftList: function(historyList){
    console.log(historyList.length);
    if(historyList.length === 15){
      this.get('commandHistory').set('commandHistory',historyList.shift());
    }
  },

  // Send text to command
  registerCommand : function(cmnd){
    var historyList = this.get("commandHistory");
    this.shiftList(historyList);
    historyList.pushObject({message:"-sh: " + cmnd + ": command not found"});
  },

  actions: {

    inputLineHandler : function(text){
      console.log(text);
      var historyList = this.get("commandHistory");
      this.shiftList(historyList);
      this.registerCommand(text);
      this.set('textBuffer', '');
    }
  }
});
