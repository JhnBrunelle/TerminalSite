import Ember from 'ember';
import cmd from "../utils/command";

export default Ember.Component.extend({
  /**
   * Stores an entire account of whats being shown in the window
   */
  buffer: "Hi my name is John Brunelle, I am an Electrical Engineering and CS student at the" +
          " University of Western Ontaro. Type help to view more commands or use the links at" +
          " the side, to learn more about me! ",

  /**
   * Stores the prompt for the terminal
   */
  prompt: " user@jsh $ ",

  /**
   * Stores amount of lines currently displayed
   */
  lines:4,

  /**
   * Current input text
   */
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


    if(this.get('lines') < 16){
      this.set('lines', this.get('lines') + 1);
      this.set('buffer', this.get('buffer') + '\n' + this.get('prompt').trim() + " " + line.replace(/(\r\n|\n|\r)/gm,""));
    }else{
      this.set('buffer', this.get('buffer') + this.get('prompt').trim() + " " + line + '\n');
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
      const callBack = cmd.pushCommand(this.get('inputText'));

      Ember.run(()=>{
        this.addLineToBuffer(this.get('inputText'));
        if (cmd.lastReturn !== ""){
            this.addLineToBuffer(cmd.lastReturn);
        }
      })
      this.set('inputText', "");
      //this.set('isShowingModal', !this.get('isShowingModal'));
      this.sendAction('toggleModal');
    }
  }
});
