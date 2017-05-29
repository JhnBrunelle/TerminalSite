import Ember from 'ember';

export default Ember.Component.extend({
  buffer: "So here's some text!",

  prompt: " user@jsh $ ",
  lines:1,
  inputText: "",

  init: function(){
    this._super(...arguments);

  },

  lineHandler : function(){

  },
  keyDown : function(e){

    /*
     * Safety for prompt, stops user from
     */
    // if(e.keyCode === 8 || e.keyCode === 37){
    //   let toTest = Ember.$('.terminalWindow').val();
    //   const curBuff = toTest.split('\n');
    //   const lastLine = curBuff[curBuff.length -1];
    //
    //   if (lastLine === this.get('prompt')){
    //     e.preventDefault();
    //     e.stopPropagation();
    //   }
    // };
  },

  addLineToBuffer: function(line){


    if(this.get('lines') < 24){
      this.set('lines', this.get('lines') + 1);
      this.set('buffer', this.get('buffer') + '\n' + line);
    }else{
      this.set('buffer', this.get('buffer') + line + '\n');
    }

    // Scroll to Bottom of TextArea
    const textarea = document.getElementById('outputWin');
    textarea.scrollTop = textarea.scrollHeight;
  },

  actions: {
    /**
     * Handlees input from console command line
     * @param text User Input
     */
    onEnter: function () {
      console.log(this.get('inputText'));
      Ember.run(()=>{
        this.addLineToBuffer(this.get('inputText'));
      })
      this.set('inputText', "");
    }
  }
});
