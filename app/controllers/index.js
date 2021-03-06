import Ember from 'ember';

export default Ember.Controller.extend({

  numberOfLines: 4,   // The amount of lines currently displayed on screen
  textRows: 18,       // Number of Rows the Terminal Window can hold
  commandHistory: [
    {message: "Hello, My name is Johnathan Brunelle."},
    {message: "I am an Electrical Engineering + CS Student in my second"},
    {message: "year at the University of Western Ontario."},
    {message: "Enter 'help' to view the commands."}],

  init: function () {

    this.set('textBuffer', '');
  },

  /**
   * Ensures that text does not run off the terminal window
   * @param historyList current text displayed
   */
  checkLines: function (historyList) {

    if (this.get('numberOfLines') > this.get('textRows')) {

      // Shift the queue a certain amount
      let difference = this.get('numberOfLines') - this.get('textRows');

      for (var i = 0; i < difference; i++) {
        this.get('commandHistory').set('commandHistory', historyList.shift());
      }

      this.set('numberOfLines', this.get('textRows'));
    }
  },

  openExternalPage: function (page) {
    var pages = {
      github : 'https://github.com/JhnBrunelle',
      linkedin: 'https://www.linkedin.com/in/johnbrunelleece'
    };
    window.open(pages[page]);
  },
  /**
   * Process the user input, pointing it to correct function
   * and providing a response
   * @param cmnd user command
   */
  registerCommand: function (cmnd) {
    var historyList = this.get("commandHistory");


    // Used for debugging
    switch (cmnd) {
      case "help":
      case "ls":
        this.set("numberOfLines", this.get("numberOfLines") + 8);
        this.checkLines(historyList);
        historyList.pushObject({message: cmnd});
        historyList.pushObject({message: "Help Menu"});
        historyList.pushObject({message: "  clear - Clear terminal window"});
        historyList.pushObject({message: "  about - Info about me"});
        historyList.pushObject({message: "  degree - Display Degree Info"});
        historyList.pushObject({message: "  github - Open Github Page"});
        historyList.pushObject({message: "  linkedin - Open Linkedin Page"});
        historyList.pushObject({message: "  contact - Display Contact Info"});
        break;

      case "clear":
        this.set('commandHistory', []);
        this.set('numberOfLines', 0);
        break;

      case "stabilitycheck":    // Used for Debugging
        console.log("commandHistory: " + this.get('commandHistory').length);
        console.log("numberOfLines:  " + this.get('numberOfLines'));

        this.set("numberOfLines", this.get("numberOfLines") + 2);
        this.checkLines(historyList);
        historyList.pushObject({message: cmnd});
        historyList.pushObject({message: "Stability Checked! View Console!"});
        break;

      case "contact":    // Used for Debugging
        console.log("commandHistory: " + this.get('commandHistory').length);
        console.log("numberOfLines:  " + this.get('numberOfLines'));

        this.set("numberOfLines", this.get("numberOfLines") + 2);
        this.checkLines(historyList);
        historyList.pushObject({message: cmnd});
        historyList.pushObject({message: "Email - jhnbrunelle@gmail.com"});
        break;

      case "github":
        this.set("numberOfLines", this.get("numberOfLines") + 2);
        this.checkLines(historyList);
        historyList.pushObject({message: cmnd});
        this.openExternalPage("github");
        historyList.pushObject({message: "Github opened!"});
        break;

      case "linkedin":
        this.set("numberOfLines", this.get("numberOfLines") + 2);
        this.checkLines(historyList);
        historyList.pushObject({message: cmnd});
        this.openExternalPage("linkedin");
        historyList.pushObject({message: "Linkedin opened!"});
        break;

      case "degree":    // States my Degree
        this.set("numberOfLines", this.get("numberOfLines") + 4);
        this.checkLines(historyList);
        historyList.pushObject({message: cmnd});
        historyList.pushObject({message: "University Of Western Ontario"});
        historyList.pushObject({message: "Bachelor of Engineering Science (BESc) in Electrical Engineering"});
        historyList.pushObject({message: "GPA: 3.7, Class of 2019"});
        break;

      case "about":
        this.set("numberOfLines", this.get("numberOfLines") + 6);
        this.checkLines(historyList);
        historyList.pushObject({message: cmnd});
        historyList.pushObject({message: "  I'm an Electrical Computer Engineering student from"});
        historyList.pushObject({message: "  California. I enjoy coding in Javascript, Python, Java  "});
        historyList.pushObject({message: "  and C++."});
        historyList.pushObject({message: "  After University, I hope to either go into FPGA, embedded or"});
        historyList.pushObject({message: "  Software development. "});
        break;

      default:
        this.set("numberOfLines", this.get("numberOfLines") + 2);
        this.checkLines(historyList);
        if(cmnd === ''){
          historyList.pushObject({message: " "});
        }else{
          historyList.pushObject({message: cmnd});
        }
        historyList.pushObject({message: "jsh: " + cmnd + ": command not found"});
        break;
    }


  },

  // Used to validate correct console input
  // Returns true if valid, or false if invalid
  // Invalid - Nothing but spaces ie. Null input
  validateInput(input){
    let parsedInput = input.replace(/\s+/, "");
    return parsedInput !== "";
  },

  actions: {

    /**
     * Handlees input from console command line
     * @param text User Input
     */
    inputLineHandler: function (text) {
      if(this.validateInput(text)){
        this.registerCommand(text);
        this.set('textBuffer', '');
      }
    }
  }
});
