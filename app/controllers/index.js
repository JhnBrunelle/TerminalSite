import Ember from 'ember';

export default Ember.Controller.extend({

  numberOfLines: 15,
  commandHistory:[
    {message : "Hello"},
    {message :  "This"},
    {message :  "Type"}],

  shiftList: function(historyList){
    if(historyList.length === 15){
      this.get('commandHistory').set('commandHistory',historyList.shift());
    }
  },

  actions: {
    addItem: function() {
      console.log(this.get("commandHistory"));
      var historyList = this.get("commandHistory");
      historyList.pushObject({message:"hello"});
    },

    inputLineHandler : function(text){
      console.log(text);
      var historyList = this.get("commandHistory");
      this.shiftList(historyList);
      historyList.pushObject({message:text});
      this.set('textBuffer', '');
    }
  }
});
